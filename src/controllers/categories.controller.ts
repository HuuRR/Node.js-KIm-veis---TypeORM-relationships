import { Request, Response } from "express";
import createCategoryService from "../services/categories/createCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listPropertiesByCategoryService from "../services/categories/listPropertiesByCategory.service";

const createCategoryController = async (req: Request, res: Response) => {
  const { name } = req.body;
  const newCategory = await createCategoryService({ name });

  return res.status(201).json(newCategory);
};

const listCategoriesController = async (req: Request, res: Response) => {
  const categories = await listCategoriesService();

  return res.json(categories);
};

const listPropertiesByCategoryController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const propertiesByCategory = await listPropertiesByCategoryService(id);

  return res.json(propertiesByCategory);
};

export {
  createCategoryController,
  listCategoriesController,
  listPropertiesByCategoryController,
};
