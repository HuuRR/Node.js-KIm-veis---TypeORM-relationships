import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Property } from "../../entities/property.entity";
import { IPropertyRequest } from "../../interfaces/properties";

const listPropertiesService = async () => {
  const propertyRepository = AppDataSource.getRepository(Property);

  const properties = await propertyRepository.find();

  if (!properties) {
    throw new AppError("No one properties available", 404);
  }

  return properties;
};

export default listPropertiesService;
