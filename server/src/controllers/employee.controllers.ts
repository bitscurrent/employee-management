import { Request, Response } from "express";
import { pool } from "../database";

const employeeDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    // const query = `
    //   SELECT *
    //   FROM employees
    //   JOIN companies ON employees.company_id = companies.id
    //   ORDER BY companies.name ASC;
    // `;

    const query = `SELECT employees.name AS employee_name, employees.post, employees.salary,
       companies.name AS company_name, companies.address
FROM employees
JOIN companies ON employees.company_id = companies.id
ORDER BY companies.name ASC;
`;

    const result = await pool.query(query);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: "No employees found" });
    }
  } catch (error) {
    console.error("Error retrieving employee list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { employeeDetails };
