import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Category } from "../../entities/category.entity";
import { ICategoryRequest } from "../../interfaces/categories";

const createCategoryService = async ({ name }: ICategoryRequest) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const categories = await categoryRepository.find();

  const categoryAlreadyExists = categories.find((cat) => cat.name === name);

  if (categoryAlreadyExists) {
    throw new AppError("category already exists", 400);
  }

  const category = categoryRepository.create({
    name,
  });

  await categoryRepository.save(category);

  return category;
};

export default createCategoryService;
