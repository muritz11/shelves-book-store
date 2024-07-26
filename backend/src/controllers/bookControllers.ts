import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Book from "../db/bookModel";

export const fetchBooks = async (request: Request, response: Response) => {
  const { page = 1, limit = 10, filter, genre, userId } = request.query;

  // Initialize the query object
  const query: any = {};

  // Apply filter based on query parameters
  if (filter === "featured") {
    query.isFeatured = true;
  } else if (filter === "liked" && userId) {
    query.likes = { $elemMatch: { $eq: userId } };
  } else if (filter === "genre" && genre) {
    query.genre = genre;
  }

  const booksAggregation = [
    { $match: query },
    {
      $lookup: {
        from: "ratings",
        localField: "_id",
        foreignField: "book",
        as: "ratings",
      },
    },
    {
      $addFields: {
        averageRating: { $avg: "$ratings.rating" },
      },
    },
    {
      $sort:
        filter === "topRated"
          ? { averageRating: -1, createdAt: -1 }
          : { createdAt: -1 },
    },
    { $skip: (Number(page) - 1) * Number(limit) },
    { $limit: Number(limit) },
  ];

  // @ts-ignore
  const books = await Book.aggregate(booksAggregation).exec();
  // books = await Book.find(query)
  //   .populate("author")
  //   .populate("rating")
  //   .limit(Number(limit) * 1)
  //   .skip((Number(page) - 1) * Number(limit))
  //   .sort({ createdAt: -1 });

  const count = await Book.countDocuments(query);

  response.send({
    success: true,
    data: books,
    total: count,
    currentPage: page,
  });
};;

export const fetchBooksById = async (request: Request, response: Response) => {
  const { bookId } = request.params;
  try {
    const book = await Book.findById(bookId).populate("author");

    if (!book) {
      return response
        .status(404)
        .send({ success: false, message: "Book not found" });
    }

    const authorsBooks = await Book.find({ author: book.author._id });

    response.send({
      success: true,
      data: { ...book.toObject(), authorsBooks },
    });
  } catch (error) {
    response.status(500).send({
      success: false,
      error,
    });
  }
};

export const fetchGenres = async (request: Request, response: Response) => {
  try {
    const uniqueGenres = await Book.distinct("genre");

    response.send({
      success: true,
      data: uniqueGenres,
    });
  } catch (error) {
    response.status(500).send({ success: false, message: error.message });
  }
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

export const toggleLikeBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.body;
    // @ts-ignore
    const userId = req.user._id;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }

    const liked = book.likes.includes(userId);

    if (liked) {
      // @ts-ignore
      book.likes.pull(userId);
    } else {
      book.likes.push(userId);
    }

    await book.save();

    res.status(200).send({
      success: true,
      message: liked
        ? "Book removed from favorites"
        : "Book added to favorites",
      data: book,
    });
  } catch (error) {
    console.error("Error toggling like on book:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while liking/unliking the book",
      error: error,
    });
  }
};
