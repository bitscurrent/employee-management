import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

const connectDB = async (): Promise<void> => {
  pool.on("connect", () => {
    console.log("Connected to the database");
  });

  pool.on("error", (err: Error) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
  });

  try {
    await pool.connect();
    console.log("Database connection established successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(-1);
  }
};

export { pool, connectDB };
