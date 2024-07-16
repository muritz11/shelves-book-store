import { Router } from "express";
import { body } from "express-validator";
import auth from "../middleware/auth";
import {
  fetchUsers,
  updateProfile,
  deleteUser,
  fetchMe,
} from "../controllers/usersController";

const router = Router();

// fetch profile
router.get("/me", auth, fetchMe);


// get all users
router.get("/users", auth, fetchUsers);

/**********************
* endpoint request: 
{
    "userId": String
}
**********************/
router.delete(
  "/del-user",
  body("userId").not().isEmpty().withMessage("user id is required"),
  auth,
  deleteUser
);

/**********************
* route url: baseUrl/user/update-profile
* endpoint request: 
{
    "fullName": String,
    "coverUrl": String,
}
**********************/
router.post(
  "/update-profile",
  body("fullName").not().isEmpty().withMessage("full name is required"),
  auth,
  updateProfile
);

export default router;
