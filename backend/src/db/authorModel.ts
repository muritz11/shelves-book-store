import mongoose, { Schema, Document, Model } from "mongoose";

interface IAuthor extends Document {
  name: string;
  bio: string;
  coverUrl?: string;
}

const AuthorSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    coverUrl: String,
  },
  {
    timestamps: true,
  }
);

const Authors: Model<IAuthor> =
  mongoose.models.Authors || mongoose.model<IAuthor>("Authors", AuthorSchema);

export default Authors;
