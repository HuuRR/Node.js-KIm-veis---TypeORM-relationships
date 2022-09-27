import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";

const softDeleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user?.isActive) {
    throw new AppError("Inactive User", 400);
  } else {
    await userRepository.update(user.id, { isActive: false });
  }

  return true;
};

export default softDeleteUserService;
