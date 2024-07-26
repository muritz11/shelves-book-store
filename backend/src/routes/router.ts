import { Router, Request, Response, NextFunction } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import authorRouter from "./author.route";
import bookRouter from "./book.route";
import fileRouter from "./file.route";
import ratingRouter from "./rating.route";
import { search } from "../controllers/searchController";
import auth from "../middleware/auth";

const router = Router();

router.get("/", (request: Request, response: Response, next: NextFunction) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/authors", authorRouter);
router.use("/books", bookRouter);
router.use("/file", fileRouter);
router.use("/rating", ratingRouter);

router.get("/search", auth, search);

export default router;
