import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import { AppError } from "../../errors/appError";
import * as bcrypt from "bcrypt";

const createUserService = async ({
  email,
  isAdm,
  name,
  password,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const emailAlreadyRegistered = users.find((user) => user.email === email);

  if (emailAlreadyRegistered) {
    throw new AppError("Email already registered", 400);
  }

  const user = userRepository.create({
    name,
    email,
    isAdm,
    password: await bcrypt.hash(password, 10),
  });

  await userRepository.save(user);

  return user;
};

export default createUserService;
