import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  listPropertiesByCategoryController,
} from "../controllers/categories.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import VerifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const categoriesRoutes = Router();

categoriesRoutes.post(
  "",
  verifyAuthMiddleware,
  VerifyIsAdmMiddleware,
  createCategoryController
);
categoriesRoutes.get("", listCategoriesController);
categoriesRoutes.get("/:id/properties", listPropertiesByCategoryController);

export default categoriesRoutes;
