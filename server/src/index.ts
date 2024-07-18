import express, { Express, Request, Response } from "express";
import { configDotenv } from "dotenv";
import { app } from "./app";
import { connectDB } from "./database";

configDotenv();

const port = process.env.PORT || 5500;

connectDB();

// Testing
app.get("/test", (req: Request, res: Response) => {
  res.send("A good Employyee is backbone of industry 🤗🤗");
});

app.post("/api/v1/users/logout", (req: Request, res: Response) => {
  res.clearCookie("token"); // Clear the token cookie
  res.status(200).json({ message: "Logged out successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
