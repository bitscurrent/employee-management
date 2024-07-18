import express, { Express, Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller";
import verifyJWT from "../middlewares/verifyJWT.middleware";

const router = Router();

// router.route("/register").post((req, res) => {
//   res.send("HIHIHI");
// });

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
