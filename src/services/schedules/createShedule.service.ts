import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Schedule } from "../../entities/schedule.entity";
import { User } from "../../entities/user.entity";
import { Property } from "../../entities/property.entity";
import { IScheduleRequest } from "../../interfaces/schedules";
import { format } from "date-fns";

const createScheduleService = async ({
  date,
  hour,
  propertyId,
  userId,
}: IScheduleRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const propertyRepository = AppDataSource.getRepository(Property);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("user not found", 404);
  }

  const property = await propertyRepository.findOneBy({ id: propertyId });

  if (!property) {
    throw new AppError("property not found", 404);
  }

  const scheduleExists = await scheduleRepository.find({
    relations: { property: true },
    where: {
      date,
      hour,
    },
  });

  if (scheduleExists.length > 0) {
    throw new AppError("schedule already exists", 400);
  }

  const eFormat = new Date(date + " " + hour);

  if (
    Number(format(eFormat, "ee")) === 1 ||
    Number(format(eFormat, "ee")) === 7
  ) {
    throw new AppError("only available from monday to friday", 400);
  }

  if (Number(format(eFormat, "H")) < 8 || Number(format(eFormat, "H")) > 17) {
    throw new AppError("only available from 8:00 to 17:00", 400);
  }

  const newSchedule = scheduleRepository.create({
    user,
    date,
    hour,
    property,
  });

  await scheduleRepository.save(newSchedule);

  return newSchedule;
};

export default createScheduleService;
