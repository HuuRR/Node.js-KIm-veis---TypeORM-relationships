import { Request, Response } from "express";
import createScheduleService from "../services/schedules/createShedule.service";
import listSchedulesService from "../services/schedules/listShedules.service";

const createScheduleController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { propertyId, date, hour } = req.body;
  const userId = id;

  const schedule = await createScheduleService({
    userId,
    date,
    hour,
    propertyId,
  });

  return res.status(201).json({ message: "schedule created" });
};

const listSchedulesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const schedules = await listSchedulesService(id);

  return res.json(schedules);
};

export { createScheduleController, listSchedulesController };
