import { Router } from "express";
import { body } from "express-validator";
import { signUpUser, signIn } from "../controllers/authController";

const router = Router();

// url: baseUrl/auth/register
// endpoint request: email, password, fullName
router.post(
  "/register",
  body("*").trim().escape(),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be up to 8 characters"),
  body("fullName").not().isEmpty().withMessage("Full name is required"),
  signUpUser
);

// url: baseUrl/auth/verify
// endpoint req body: email, otp
// router.post('/verify', body('*').escape().trim(), verifyEmail)

// url: baseUrl/auth/login
// endpoint request body: email, password
router.post(
  "/login",
  body("*").escape().trim(),
  body("email").not().isEmpty().withMessage("Please enter email"),
  body("password").not().isEmpty().withMessage("Please enter password"),
  signIn
);

export default router;
