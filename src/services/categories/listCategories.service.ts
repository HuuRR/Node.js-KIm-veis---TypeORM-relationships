import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/appError";

const listCategoriesService = async () => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const categories = await categoryRepository.find();

  if (!categories) {
    throw new AppError("no categories found", 404);
  }

  return categories;
};

export default listCategoriesService;
