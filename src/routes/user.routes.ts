import { Router } from "express";
import {
  createUserController,
  listUsersController,
  softDeleteUserController,
} from "../controllers/user.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import VerifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get(
  "",
  verifyAuthMiddleware,
  VerifyIsAdmMiddleware,
  listUsersController
);
userRouter.delete(
  "/:id",
  verifyAuthMiddleware,
  VerifyIsAdmMiddleware,
  softDeleteUserController
);

export default userRouter;
