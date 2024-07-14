import { Router } from "express";
import { body } from "express-validator";
import {
  deleteAuthorById,
  fetchAuthors,
  newAuthor,
  updateAuthorById,
} from "../controllers/authorController";
import auth from "../middleware/auth";

const router = Router();

/**********************
 * fetch all authors
 **********************/
router.get("/", auth, fetchAuthors);

/**********************
 * create new author
 * req body: 
  {
    "name": String,
    "bio": String,
    "coverUrl"?: String,
  }
**********************/
router.post(
  "/",
  body("*").trim().escape(),
  body("name").not().isEmpty().withMessage("Name is required"),
  body("bio").not().isEmpty().withMessage("Bio is required"),
  auth,
  newAuthor
);

/**********************
 * update author
 * req body: 
 {
    "name": String,
    "bio": String,
    "coverUrl"?: String,
 }
 *req param: { authorId }
**********************/
router.put(
  "/:authorId",
  body("*").trim().escape(),
  body("name").not().isEmpty().withMessage("Name is required"),
  body("bio").not().isEmpty().withMessage("Bio is required"),
  auth,
  updateAuthorById
);

/**********************
 * delete author
 * req params: { authorId }
 **********************/
router.delete("/:authorId", auth, deleteAuthorById);

export default router;
