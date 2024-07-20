import { Request, Response, NextFunction } from "express";
import { pool } from "../database";

// Define an interface for the User object
interface User {
  id: string;
  username: string;
  role: string;
}

// Extend the Express Request interface to include the user property
interface CustomRequest extends Request {
  user?: User;
}

const verifyManagerRole = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const user: User | undefined = req.user;

  // for debugging
  // console.log(user);

  if (!user) {
    return res.status(403).json({ message: "User not authenticated" });
  }

  const username = user.username;

  try {
    const userQuery = `SELECT role, id FROM users WHERE username = $1`;
    const userResult = await pool.query(userQuery, [username]);

    if (userResult.rows.length > 0) {
      const userRole = userResult.rows[0].role;
      const userId = userResult.rows[0].id;

      if (userRole !== "manager") {
        return res
          .status(403)
          .json({ message: "Access forbidden: Managers only" });
      }

      // In Body we expect employeeid to be entered by managers to update the employee
      const { employeeId } = req.body;
      if (!employeeId) {
        return res.status(400).json({ message: "Employee ID is required" });
      }

      const employeeQuery = `SELECT manager_id FROM employees WHERE id = $1`;
      const employeeResult = await pool.query(employeeQuery, [employeeId]);

      if (employeeResult.rows.length > 0) {
        const managerId = employeeResult.rows[0].manager_id;
        // Only managers assigned to that particular employee should be able to update the details.
        if (managerId === userId) {
          next();
        } else {
          return res.status(403).json({
            message: "Access forbidden: Not authorized to update this employee",
          });
        }
      } else {
        return res
          .status(404)
          .json({ message: "No employee found with the given ID" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "No user found with the given username" });
    }
  } catch (error) {
    console.error("Database query error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { verifyManagerRole };
