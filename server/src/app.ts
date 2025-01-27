import express, { Express } from "express";
import cookieParser from "cookie-parser";
import  { swaggerSpec, swagggerUi }  from "./utils/swagger.util";


const app: Express = express();

// Middlewares
app.use(express.json({ limit: "16kb" })); // To receive json data from body
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // To receive data from URL
app.use(cookieParser());

// swagger
app.use('/api-docs', swagggerUi.serve, swagggerUi.setup(swaggerSpec));

// Routes import
import userRouter from "./routers/user.router";
import employeeRouter from "./routers/employee.router";
import officialRouter from "./routers/official.router";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/officials", officialRouter);

// http://localhost:8000/api/v1/users/register
export { app };
