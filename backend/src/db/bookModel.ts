import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface IPicture {
  secure_url?: string;
  publicId?: string;
}
interface IBook extends Document {
  title: string;
  genre: string;
  author: Types.ObjectId;
  synopsis: string;
  coverUrl: IPicture;
  numOfChapter: number;
  likes?: Types.ObjectId[];
  readers?: Types.ObjectId[];
  rating?: {
    user: Types.ObjectId;
    rating: number;
  }[];
  isFeatured?: boolean;
}

const PictureSchema = new Schema<IPicture>({
  secure_url: { type: String },
  publicId: { type: String },
});

const RatingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
});

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    synopsis: { type: String, required: true },
    coverUrl: { type: PictureSchema, required: true },
    numOfChapter: { type: Number, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    readers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    rating: [RatingSchema],
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Books: Model<IBook> =
  mongoose.models.Books || mongoose.model<IBook>("Books", BookSchema);

export default Books;
