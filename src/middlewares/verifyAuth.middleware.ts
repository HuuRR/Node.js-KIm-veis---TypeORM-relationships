import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/appError";

const verifyAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("Invalid Token", 401);
  }

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        throw new AppError("Invalid Token", 401);
      }

      req.user = {
        isAdm: decoded.isAdm,
        id: decoded.sub,
      };

      next();
    }
  );
};

export default verifyAuthMiddleware;
