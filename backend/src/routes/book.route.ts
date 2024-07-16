import { Router } from "express";
import { body } from "express-validator";
import {
  deleteBookById,
  fetchBooks,
  fetchBooksById,
  fetchGenres,
  newBook,
  toggleLikeBook,
  updateBookById,
} from "../controllers/bookControllers";
import auth from "../middleware/auth";

const router = Router();

/**********************
 * fetch all books
 * query: { page?: number, limit?: number, filter: "featured" | "topRated" | "liked", userId?: string }
 **********************/
router.get("/", fetchBooks);

/**********************
 * fetch all books
 **********************/
router.get("/genres", fetchGenres);

/**********************
 * like book
 * req body: 
  { bookId: string }
**********************/
router.post(
  "/toggle-like",
  body("*").trim(),
  body("bookId").not().isEmpty().withMessage("book Id is required"),
  auth,
  toggleLikeBook
);

/**********************
 * fetch book by id
 **********************/
router.get("/:bookId", fetchBooksById);

/**********************
 * create new book
 * req body: 
  { title: string, genre: string, author: ObjectId, synopsis: string, coverUrl: string, numOfChapter: number, isFeatured: boolean }
**********************/
router.post(
  "/",
  body("*").trim(),
  body("title").not().isEmpty().withMessage("title is required"),
  body("genre").not().isEmpty().withMessage("genre is required"),
  body("author").not().isEmpty().withMessage("author is required"),
  body("synopsis").not().isEmpty().withMessage("synopsis is required"),
  body("numOfChapter")
    .not()
    .isEmpty()
    .withMessage("number of chapters is required"),
  auth,
  newBook
);

/**********************
 * update book
 * req body: 
  { title: string, genre: string, author: ObjectId, synopsis: string, coverUrl: string, numOfChapter: number, isFeatured: boolean }
 *req param: { authorId }
**********************/
router.put(
  "/:bookId",
  body("*").trim(),
  body("title").not().isEmpty().withMessage("title is required"),
  body("genre").not().isEmpty().withMessage("genre is required"),
  body("author").not().isEmpty().withMessage("author is required"),
  body("synopsis").not().isEmpty().withMessage("synopsis is required"),
  body("numOfChapter")
    .not()
    .isEmpty()
    .withMessage("number of chapters is required"),
  auth,
  updateBookById
);

/**********************
 * delete book
 * req params: { authorId }
 **********************/
router.delete("/:bookId", auth, deleteBookById);

export default router;
