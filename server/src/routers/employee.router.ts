import express, { Express, Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.middleware";
import {
  employeeDetails,
  employeeHighestSalary,
} from "../controllers/employee.controllers";

const router = Router();

// router.route("/list").post((req, res) => {
//   res.send("HIHIHI");
// });

router.route("/list").post(verifyJWT, employeeDetails);
router.route("/highest-pay").post(verifyJWT, employeeHighestSalary);

export default router;
