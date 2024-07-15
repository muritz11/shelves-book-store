import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Book from "../db/bookModel";

export const fetchBooks = async (request: Request, response: Response) => {
  const { page = 1, limit = 10, filter, userId } = request.query;

  // Initialize the query object
  const query: any = {};

  // Apply filter based on query parameters
  if (filter === "featured") {
    query.isFeatured = true;
  } else if (filter === "topRated") {
    query.rating = { $exists: true, $ne: [] };
  } else if (filter === "liked" && userId) {
    query.likes = { $elemMatch: { $eq: userId } };
  }

  const books = await Book.find(query)
    .populate("author")
    .limit(Number(limit) * 1)
    .skip((Number(page) - 1) * Number(limit))
    .sort({ createdAt: -1 });

  // If filtering by top rated, sort by average rating
  if (filter === "topRated") {
    books.sort((a, b) => {
      const avgRatingA =
        a.rating.reduce((sum, r) => sum + r.rating, 0) / a.rating.length || 0;
      const avgRatingB =
        b.rating.reduce((sum, r) => sum + r.rating, 0) / b.rating.length || 0;
      return avgRatingB - avgRatingA;
    });
  }

  const count = await Book.countDocuments(query);

  response.send({
    success: true,
    data: books,
    total: count,
    currentPage: page,
  });
};

export const fetchBooksById = async (request: Request, response: Response) => {
  const { bookId } = request.params;
  const book = await Book.findById(bookId).populate("author");

  const authorsBiblio = await Book.find({ author: book.author._id });

  response.send({
    success: true,
    data: { ...book, authorsBiblio },
  });
};

export const newBook = async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(400).json({ errors: errors.array() });

  const {
    title,
    genre,
    author,
    synopsis,
    coverUrl,
    numOfChapter,
    releaseDate,
    isFeatured,
  } = request.body;

  const book = new Book({
    title,
    genre: genre?.toLowerCase(),
    author,
    synopsis,
    coverUrl: coverUrl || undefined,
    releaseDate: releaseDate || undefined,
    numOfChapter,
    isFeatured: isFeatured || undefined,
  });

  book
    .save()
    .then((result) => {
      response.status(201).send({
        success: true,
        message: "Book added successfully",
        data: result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        success: true,
        message: "Error adding book",
        data: error,
      });
    });
};

export const updateBookById = async (request: Request, response: Response) => {
  const { bookId } = request.params;
  const newData = request.body;

  try {
    const book = await Book.updateOne(
      { _id: bookId },
      {
        $set: newData,
      }
    );

    response.status(200).send({
      success: true,
      message: "Success",
      data: book,
    });
  } catch (error) {
    console.log("an error occurred", error);
    response.status(500).send({
      success: false,
      message: "An error occurred",
      data: error,
    });
  }
};

export const deleteBookById = async (request: Request, response: Response) => {
  const { bookId } = request.params;

  try {
    const book = await Book.deleteOne({ _id: bookId });

    response.status(200).send({
      success: true,
      message: "Success",
      data: book,
    });
  } catch (error) {
    console.log("an error occurred", error);
    response.status(500).send({
      success: false,
      message: "An error occurred",
      data: error,
    });
  }
};
