import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Rating from "../db/ratingModel";

export const fetchRatingByBookId = async (
  request: Request,
  response: Response
) => {
  const { bookId } = request.params;

  if (!bookId)
    return response
      .status(400)
      .send({ success: false, message: "provide book ID" });
  try {
    const bookRatings = await Rating.find({ book: bookId }).populate("user");

    response.send({
      success: true,
      data: bookRatings,
    });
  } catch (error) {
    response.status(500).send({
      success: false,
      error,
    });
  }
};

export const addRating = (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(400).json({ errors: errors.array() });

  const { bookId } = request.params;
  const { rating, review } = request.body;

  // @ts-ignore
  const userId = request.user._id;

  const bookRating = new Rating({
    rating,
    review,
    book: bookId,
    user: userId,
  });

  bookRating
    .save()
    .then((result) => {
      response.status(201).send({
        success: true,
        message: "Rating added successfully",
        data: result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        success: true,
        message: "Error adding rating",
        data: error,
      });
    });
};

export const deleteRateById = async (request: Request, response: Response) => {
  const { rateId } = request.params;

  try {
    const deletRate = await Rating.deleteOne({ _id: rateId });

    response.status(200).send({
      success: true,
      message: "Success",
      data: deletRate,
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
