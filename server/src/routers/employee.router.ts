import express, { Express, Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.middleware";
import {
  averageSalary,
  employeeDetails,
  employeeHighestSalary,
} from "../controllers/employee.controllers";

const router = Router();

/**
 * @swagger
 * /api/v1/employees/list:
 *   post:
 *     summary: Retrieve employee details
 *     description: Get the details of employees
 *     responses:
 *       200:
 *         description: A list of employee details
 *         content:
 *           application/json:
 *             schema:
 *              
 *     security:
 *       - bearerAuth: []
 */
router.route("/list").post(verifyJWT, employeeDetails);

/**
 * @swagger
 * /api/v1/employees/highest-pay:
 *   post:
 *     summary: Retrieve highest paid employee
 *     description: Get the details of the highest paid employee
 *     responses:
 *       200:
 *         description: Details of the highest paid employee
 *         content:
 *           application/json:
 *             schema:
 *                   description: The employee's salary
 *     security:
 *       - bearerAuth: []
 */
router.route("/highest-pay").post(verifyJWT, employeeHighestSalary);

/**
 * @swagger
 * /api/v1/employees/average-salary:
 *   post:
 *     summary: Retrieve average salary
 *     description: Get the average salary of all employees
 *     responses:
 *       200:
 *         description: The average salary of employees
 *         content:
 *           application/json:
 *             schema:
 *     security:
 *       - bearerAuth: []
 */
router.route("/average-salary").post(verifyJWT, averageSalary);

export default router;
