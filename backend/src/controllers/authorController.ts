import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Author from "../db/authorModel";

// fetch authors
export const fetchAuthors = async (request: Request, response: Response) => {
  const { page = 1, limit = 10 } = request.query;

  const authors = await Author.find()
    .limit(Number(limit) * 1)
    .skip((Number(page) - 1) * Number(limit))
    .sort({ createdAt: -1 });

  const count = await Author.countDocuments();

  response.send({
    success: true,
    data: authors,
    total: count,
    currentPage: page,
  });
};

export const newAuthor = async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(400).json({ errors: errors.array() });

  const { name, bio, coverUrl } = request.body;

  const author = new Author({
    name,
    bio,
    coverUrl: coverUrl || undefined,
  });

  author
    .save()
    .then((result) => {
      response.status(201).send({
        success: true,
        message: "Author added successfully",
        data: result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        success: true,
        message: "Error adding author",
        data: error,
      });
    });
};

export const updateAuthorById = async (
  request: Request,
  response: Response
) => {
  const { authorId } = request.params;
  const newData = request.body;

  try {
    const author = await Author.updateOne(
      { _id: authorId },
      {
        $set: newData,
      }
    );

    response.status(200).send({
      success: true,
      message: "Success",
      data: author,
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

export const deleteAuthorById = async (
  request: Request,
  response: Response
) => {
  const { authorId } = request.params;

  try {
    const author = await Author.deleteOne({ _id: authorId });

    response.status(200).send({
      success: true,
      message: "Success",
      data: author,
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
