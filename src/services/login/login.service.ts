import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserLogin } from "../../interfaces/users";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const registered = users.find((user) => user.email === email);

  if (!registered) {
    throw new AppError("invalid email or password", 403);
  }

  if (!registered.isActive) {
    throw new AppError("Invalid User", 401);
  }

  if (!(await bcrypt.compare(password, registered.password))) {
    throw new AppError("invalid email or password", 403);
  }

  const token = jwt.sign(
    {
      isAdm: registered.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
      subject: registered.id,
      expiresIn: "24h",
    }
  );

  return token;
};

export default loginService;
