import { Express, Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../database";
import generateJWT from "../utils/jwt.util";

// Register logic
const registerUser = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  // // Express validations
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  // // Validate request body
  // if (!email || !username || !password) {
  //   return res.status(400).json("All fields are required");
  // }

  try {
    // Adding transaction query
    await pool.query("BEGIN");
    // pool;

    // First check if user already exists
    const checkUserQuery =
      "SELECT  email, username FROM users WHERE email = $1 OR username = $2";
    const result = await pool.query(checkUserQuery, [email, username]);

    if (result.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10

    // Insert new user into the database
    const insertUserQuery = `
        INSERT INTO users (email, username, password)
        VALUES ($1, $2, $3)
        RETURNING password, email, username
      `;
    const newUser = await pool.query(insertUserQuery, [
      email,

      username,

      hashedPassword,
    ]);

    if (newUser.rowCount === 0) {
      await pool.query("ROLLBACK");
      return res.status(500).send("User registration failed");
    }
    // Commit if user is created
    await pool.query("COMMIT");

    res.status(201).json({
      message: "User registered successfully",
      user: newUser.rows[0], // just for debugging
    });
  } catch (error) {
    // Rollback if promise is rejected
    await pool.query("ROLLBACK");
    console.error("Error creating user:", error); // Log the error for debugging
    res.status(500).json("Error creating user");
  }
};

// Login logic
const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  try {
    // Check if user exists in the database
    pool;
    const userData = await pool.query(
      "SELECT username, password, email  FROM users WHERE username = $1",
      [username]
    );
    if (userData.rows.length === 0) {
      // User not found
      return res.status(404).send("User not found");
    }
    const user = userData.rows[0];

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Incorrect password
      return res.status(401).send("Incorrect password");
    }
    // Generate JWT token
    const token = generateJWT(user);

    // Set token in cookie
    res.cookie("token", token, { httpOnly: true, secure: true });

    // If everything is correct, return the user details
    res.status(200).json({
      message: `Hello, your email is ${user.email} and your username is ${user.username}`,
    });
  } catch (error) {
    console.error("Error logging in:", error); // Log the error for debugging
    res.status(500).json("Error logging in");
  }
};

export { registerUser, loginUser };
