import { validationResult } from "express-validator";
import User from "../db/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpUser = async (request, response) => {
  // check validation error
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ success: false, data: errors.array() });
  }

  const isExisting = await findUserByEmail(request.body.email);
  if (isExisting) {
    return response
      .status(400)
      .send({ success: false, message: "Email already exist" });
  }

  // hash password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user interface and collect data
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
        fullName: request.body.fullName,
      });

      // save the user
      user
        .save()
        // return success msg if user was saved
        .then((result) => {
          response.status(201).send({
            status: true,
            message: "User Created Successfully",
            data: result,
          });
        })
        // catch err if failed
        .catch((error) => {
          response.status(500).send({
            success: false,
            message: "Error creating user",
            data: error,
          });
        });
    })
    // catch err if pwd was not hashed successfully
    .catch((e) => {
      response.status(500).send({
        success: false,
        message: "Password not hashed successfully",
        data: e,
      });
    });
};

export const signIn = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ success: false, data: errors.array() });
  }

  // check if email exist
  User.findOne({ email: request.body.email })
    .then((user) => {
      // compare password enterd
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          //check if password match
          if (!passwordCheck)
            return response.status(401).send({
              success: false,
              message: "Incorrect password",
            });

          // create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              email: user.email,
            },
            "RANDOM-TOKEN"
          );

          response.status(200).send({
            message: "Login successful",
            user,
            token,
          });
        })
        .catch((e) => {
          response.status(400).send({
            success: false,
            message: "Password does not match",
            data: e,
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        success: false,
        message: "Email does not exist",
        data: e,
      });
    });
};

/***************
 * HELPERS
 **************/
const findUserByEmail = async (email: string) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};
