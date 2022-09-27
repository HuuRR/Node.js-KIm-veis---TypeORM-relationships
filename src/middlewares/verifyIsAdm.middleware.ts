import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";

const VerifyIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user;

  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const verify = users.find((user) => user.id === id);

  if (!verify?.isAdm) {
    throw new AppError("Unauthorized", 403);
  } else {
    next();
  }
};

export default VerifyIsAdmMiddleware;
