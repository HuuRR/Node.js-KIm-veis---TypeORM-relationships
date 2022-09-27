import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleErrorMiddleware } from "./middlewares/handleError.middleware";
import userRouter from "./routes/user.routes";
import schedulesRoutes from "./routes/schedules.routes";
import loginRoutes from "./routes/login.routes";
import categoriesRoutes from "./routes/categories.routes";
import propertiesRoutes from "./routes/properties.routes";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/schedules", schedulesRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoriesRoutes);
app.use("/properties", propertiesRoutes);

app.use(handleErrorMiddleware);

export default app;
