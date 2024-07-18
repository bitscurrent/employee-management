import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

const secretKey = process.env.JWT_SECRET_KEY;

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    const decoded = jwt.verify(token, secretKey as any);

    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default verifyJWT;
