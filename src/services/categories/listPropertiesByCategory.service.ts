import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Category } from "../../entities/category.entity";
import { Property } from "../../entities/property.entity";

const listPropertiesByCategoryService = async (idCategory: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const propertiesRepository = AppDataSource.getRepository(Property);

  const propertiesByCategory = await categoryRepository.findOne({
    where: {
      id: idCategory,
    },
    relations: {
      properties: true,
    },
  });

  if (!propertiesByCategory) {
    throw new AppError("category not found", 404);
  }

  return propertiesByCategory;
};

export default listPropertiesByCategoryService;
