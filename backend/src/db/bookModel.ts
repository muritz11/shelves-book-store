import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface IBook extends Document {
  title: string;
  genre: string;
  author: Types.ObjectId;
  synopsis: string;
  coverUrl?: string;
  releaseDate?: string;
  numOfChapter: number;
  likes?: Types.ObjectId[];
  readers?: Types.ObjectId[];
  isFeatured?: boolean;
}

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Authors", required: true },
    synopsis: { type: String, required: true },
    coverUrl: { type: String },
    releaseDate: { type: String },
    numOfChapter: { type: Number, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    readers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Books: Model<IBook> =
  mongoose.models.Books || mongoose.model<IBook>("Books", BookSchema);

export default Books;
