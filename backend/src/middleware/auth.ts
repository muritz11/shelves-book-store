import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
    request.user = decodedToken;

    // Open the way for the next endpoint
    next();
  } catch (error) {
    response.status(401).json({
      success: false,
      message: "Unauthorized request",
    });
  }
};

export default authMiddleware;
