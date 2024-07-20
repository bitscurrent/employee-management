import { Request, Response } from "express";
import { pool } from "../database";

const updateEmployeeDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { salary, employeeId } = req.body;

    const query = `
        UPDATE employees
        SET salary = $1
        WHERE id = $2
        RETURNING *;
      `;

    const result = await pool.query(query, [salary, employeeId]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "No employee found with the given ID" });
    }
  } catch (error) {
    console.error("Error updating employee details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { updateEmployeeDetails };
