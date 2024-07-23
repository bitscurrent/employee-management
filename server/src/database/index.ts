import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER, // The only 'USER' keyword in linux os created problem, so I added DB_USER instead.
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

// console.log(process.env.USER, process.env.PASSWORD); 

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
