import { Router } from "express";
import { upload, uploadFile } from "../controllers/fileController";
import auth from "../middleware/auth";

const router = Router();

/**********************
 * upload file
 * req body: file
 **********************/
router.post("/upload", auth, upload.single("file"), uploadFile);

export default router;
