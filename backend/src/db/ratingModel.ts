import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface IRating extends Document {
  user: Types.ObjectId;
  book: Types.ObjectId;
  rating: number;
  review: string;
}

const RatingSchema = new Schema<IRating>(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users" },
    book: { type: Schema.Types.ObjectId, ref: "Book" },
    rating: { type: Number },
    review: { type: String },
  },
  {
    timestamps: true,
  }
);

const Rating: Model<IRating> =
  mongoose.models.Rating || mongoose.model<IRating>("Rating", RatingSchema);

export default Rating;
