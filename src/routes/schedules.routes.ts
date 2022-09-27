import { Router } from "express";
import {
  createScheduleController,
  listSchedulesController,
} from "../controllers/schedules.coltroller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import VerifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const schedulesRoutes = Router();

schedulesRoutes.post("", verifyAuthMiddleware, createScheduleController);
schedulesRoutes.get(
  "/properties/:id",
  verifyAuthMiddleware,
  VerifyIsAdmMiddleware,
  listSchedulesController
);

export default schedulesRoutes;
