import express, { Router, Request, Response } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller";
import verifyJWT from "../middlewares/verifyJWT.middleware";

const router = Router();

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user in the Employee Management system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: dilip
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.route("/register").post(registerUser);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user in the Employee Management system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: dilip
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.route("/login").post(loginUser);

/**
 * @swagger
 * /api/v1/users/logout:
 *   post:
 *     summary: Logout a user
 *     description: Logout a user from the Employee Management system
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
