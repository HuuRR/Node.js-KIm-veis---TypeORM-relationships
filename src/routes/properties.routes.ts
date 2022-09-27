import { Router } from "express";
import {
  createPropertyController,
  listPropertiesController,
} from "../controllers/properties.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import VerifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const propertiesRoutes = Router();

propertiesRoutes.post(
  "",
  verifyAuthMiddleware,
  VerifyIsAdmMiddleware,
  createPropertyController
);
propertiesRoutes.get("", listPropertiesController);

export default propertiesRoutes;
