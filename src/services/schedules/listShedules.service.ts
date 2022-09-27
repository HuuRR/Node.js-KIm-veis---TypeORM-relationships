import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Schedule } from "../../entities/schedule.entity";
import { Property } from "../../entities/property.entity";

const listSchedulesService = async (idProperty: string) => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const propertyRepository = AppDataSource.getRepository(Property);

  const schedules = await propertyRepository.findOne({
    where: {
      id: idProperty,
    },
    relations: {
      schedules: true,
    },
  });

  if (!schedules) {
    throw new AppError("property not found", 404);
  }

  return schedules;
};

export default listSchedulesService;
