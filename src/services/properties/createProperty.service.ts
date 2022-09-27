import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Property } from "../../entities/property.entity";
import { Adress } from "../../entities/address.entity";
import { Category } from "../../entities/category.entity";
import { IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async ({
  value,
  size,
  categoryId,
  address: { number, city, district, state, zipCode },
}: IPropertyRequest) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const adressRepository = AppDataSource.getRepository(Adress);
  const propertyRepository = AppDataSource.getRepository(Property);

  const adress = await adressRepository.find();

  const adressExistsNumb = adress.find((adr) => adr.number === number);
  const adressExistsZip = adress.find((adr) => adr.zipCode === zipCode);

  if (adressExistsZip && adressExistsNumb) {
    throw new AppError("Adress in use", 400);
  }

  if (state.length > 2) {
    throw new AppError("invalid state", 400);
  }

  if (zipCode.length > 8) {
    throw new AppError("invalid zipcode", 400);
  }

  const newAdress = adressRepository.create({
    district,
    city,
    number,
    state,
    zipCode,
  });

  await adressRepository.save(newAdress);

  const category = await categoryRepository.findOneBy({ id: categoryId });

  if (!category) {
    throw new AppError("category not found", 404);
  }

  const property = propertyRepository.create({
    size,
    value,
    address: newAdress,
    category: {
      id: category?.id,
      name: category?.name,
    },
  });

  await propertyRepository.save(property);

  return property;
};

export default createPropertyService;
