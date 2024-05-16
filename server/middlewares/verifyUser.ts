// import jwt from 'jsonwebtoken';
import JwtAuthService from "../config/jwtAuthService";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../enums/HttpStatus.enum";
const JWT_SECRET = process.env.JWT_SECRET as string;
const jwtAuthService = new JwtAuthService(JWT_SECRET);

declare global {
  namespace Express {
    interface Request {
      user?: string; // Adjust the type according to your decoded token structure
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(`cookies ${req.cookies}`)
  const token = req.cookies.access_token;
  if (!token) {
    return res
      .status(HttpStatus.Unauthorized)
      .json({ message: "You are not authenticated!" });
  }
  try {
    const decodedToken = jwtAuthService.varifyToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res
      .status(HttpStatus.Unauthorized)
      .json({ message: "Invalid token!" });
  }
};
