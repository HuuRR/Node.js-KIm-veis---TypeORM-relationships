import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError } from "../errors/appError";
import { IUserRequest } from "../interfaces/users";
import createUserService from "../services/user/createUser.service";
import listUsersService from "../services/user/listUsers.service";
import softDeleteUserService from "../services/user/softDeleteUser.service";

const createUserController = async (req: Request, res: Response) => {
  const { email, isAdm, name, password }: IUserRequest = req.body;
  const user = await createUserService({ email, isAdm, name, password });
  return res.status(201).json(instanceToPlain(user));
};

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();
  return res.json(instanceToPlain(users));
};

const softDeleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError("Invalid User", 404);
  }

  const deleted = await softDeleteUserService(id);

  return res.status(204).json({ message: "user deleted" });
};

export { createUserController, listUsersController, softDeleteUserController };
