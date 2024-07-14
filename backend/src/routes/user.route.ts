import { Router } from "express";
import { body } from "express-validator";
import auth from "../middleware/auth";
import {
  fetchUsers,
  updateProfile,
  deleteUser,
} from "../controllers/usersController";

const router = Router();

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
    "email": String,
    "fullName": String,
    "phone": String,
    "profilePictureUrl": String | opt,
    "profilePicturePID": String | opt,
}
**********************/
router.post(
  "/update-profile",
  body("email").not().isEmpty().withMessage("email id is required"),
  body("fullName").not().isEmpty().withMessage("full name is required"),
  body("phone")
    .not()
    .isEmpty()
    .withMessage("phone is required")
    .isLength({ min: 11 })
    .withMessage("Phone must be up to 11 characters"),
  auth,
  updateProfile
);

export default router;
