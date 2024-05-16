import { Response } from "express";

function errorHandler(err: unknown, res: Response) {
  try {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  } catch (error) {
    console.log(error);
  }
}

export default errorHandler;
