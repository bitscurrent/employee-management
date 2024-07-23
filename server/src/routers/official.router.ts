import express, { Express, Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.middleware";
import { updateEmployeeDetails } from "../controllers/official.controllers";
import { verifyManagerRole } from "../middlewares/verifyManagerRole";

const router = Router();

/**
 * @swagger
 * /api/v1/officials/update-employee-details:
 *   post:
 *     summary: Update employee details
 *     description: Allows managers to update employee details. 
 *     Please Note: First user has to be logged in, only managers assigned to that particular employee can only update the details.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Employee Management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: string
 *                 example: "1234"
 *               salary:
 *                 type: number
 *                 example: 70000
 *             
 *     responses:
 *       200:
 *         description: Employee details updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router
  .route("/update-employee-details")
  .post(verifyJWT, verifyManagerRole, updateEmployeeDetails);

export default router;
