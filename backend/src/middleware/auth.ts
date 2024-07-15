import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Users from "../db/userModel";

// Interface to extend the Express Request object with user property
interface CustomRequest extends Request {
  user?: string | object;
}

// Create an auth function to protect endpoints from unauthorized users
const authMiddleware = async (
  request: CustomRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return response.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM-TOKEN");
    const user = await Users.findOne({
      // @ts-ignore
      _id: decodedToken?.userId,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    request.user = user;
    next();
  } catch (error) {
    response.status(401).json({
      success: false,
      message: "Unauthorized request",
    });
  }
};

export default authMiddleware;
