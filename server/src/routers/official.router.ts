import express, { Express, Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.middleware";
import { updateEmployeeDetails } from "../controllers/official.controllers";
import { verifyManagerRole } from "../middlewares/verifyManagerRole";

const router = Router();

router
  .route("/update-employee-details")
  .post(verifyJWT, verifyManagerRole, updateEmployeeDetails);

export default router;
