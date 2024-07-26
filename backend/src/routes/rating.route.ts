import { Router } from "express";
import { body } from "express-validator";
import {
  addRating,
  deleteRateById,
  fetchRatingByBookId,
} from "../controllers/ratingConroller";
import auth from "../middleware/auth";

const router = Router();

/**********************
 * fetch all ratings by bookId
 **********************/
router.get("/:bookId", auth, fetchRatingByBookId);

/**********************
 * create new rating
 * req body: 
  { rate: number, review?: string }
 * req param: 
    { bookId: string }
**********************/
router.post(
  "/:bookId",
  body("*").trim(),
  body("rating").not().isEmpty().withMessage("rating is required"),
  auth,
  addRating
);

/**********************
 * delete book
 * req params: { rateId }
 **********************/
router.delete("/:rateId", auth, deleteRateById);

export default router;
