import { Request, Response } from "express";
import Books from "../db/bookModel";
import Author from "../db/authorModel";

export const search = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).send({
        success: false,
        message: "Query parameter is required",
      });
    }

    const books = await Books.find({
      title: { $regex: query, $options: "i" },
    });
    const authors = await Author.find({
      name: { $regex: query, $options: "i" },
    });

    const authorsWithBooks = await Promise.all(
      authors.map(async (author) => {
        const books = await Books.find({ author: author._id });
        return { ...author.toObject(), books };
      })
    );

    res.status(200).send({
      success: true,
      data: {
        books,
        authors: authorsWithBooks,
      },
    });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred during the search",
      error: error.message,
    });
  }
};
