import express, { Express, Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.middleware";
import {
  averageSalary,
  employeeDetails,
  employeeHighestSalary,
} from "../controllers/employee.controllers";

const router = Router();

// router.route("/list").post((req, res) => {
//   res.send("HIHIHI");
// });

router.route("/list").post(verifyJWT, employeeDetails);
router.route("/highest-pay").post(verifyJWT, employeeHighestSalary);
router.route("/average-salary").post(verifyJWT, averageSalary);

export default router;
