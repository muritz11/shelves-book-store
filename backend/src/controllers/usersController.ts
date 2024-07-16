import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../db/userModel";

export const fetchMe = async (request: Request, response: Response) => {
  // @ts-ignore
  if (!request.user) {
    return response.status(401).json({
      success: false,
      message: "Unauthorized request",
    });
  }

  response.send({
    success: true,
    // @ts-ignore
    data: request.user,
  });
};

export const fetchUsers = async (request, response) => {
  // const users = await User.find({ userType: "user" }).populate("orders");
  const users = await User.find();

  response.send({
    success: true,
    message: "Success",
    data: users,
  });
};

export const updateProfile = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ success: false, data: errors.array() });
  }

  const { body } = request;

  // const emailExist = await User.findOne({ email: body.email });
  const curUser = await User.findById(request.user._id);
  // if (emailExist) {
  //   if (emailExist._id != request.user.userId) {
  //     return response.status(400).send({
  //       success: false,
  //       message: "Email already exist",
  //     });
  //   }
  // }

  curUser.fullName = body?.fullName;
  curUser.coverUrl = body?.coverUrl;

  curUser
    .save()
    .then((result) => {
      response.send({
        success: true,
        message: "profile updated",
        data: result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        success: false,
        message: "Error updating profile",
        data: error,
      });
    });
};
