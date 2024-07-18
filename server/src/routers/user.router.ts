import express, { Express, Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller";

const router = Router();

// router.route("/register").post((req, res) => {
//   res.send("HIHIHI");
// });

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;
