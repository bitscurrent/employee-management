import { Request, Response } from "express";
import { pool } from "../database";

const employeeDetails = async (req: Request, res: Response): Promise<void> => {
  try {
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

const employeeHighestSalary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const query = `
  SELECT DISTINCT ON (companies.id) employees.name AS employee_name, employees.salary, companies.name AS company_name
  FROM employees
  JOIN companies ON employees.company_id = companies.id
  ORDER BY companies.id, employees.salary DESC;
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

const averageSalary = async (req: Request, res: Response): Promise<void> => {
  try {
    // "SELECT COUNT(salary) AS numberOfSalaries, SUM(salary) AS totalSalaries FROM employees";

    // const query =
    //   "SELECT SUM(salary) AS totalSalaries, COUNT(salary) AS numberOfSalaries FROM employees";

    // const result = await pool.query(query);

    // if (result.rows.length > 0) {
    //   const { numberOfSalaries, totalSalaries } = result.rows[0];
    //   const average =
    //     numberOfSalaries > 0 ? totalSalaries + numberOfSalaries : "hello hell";

    // const query = "SELECT AVG(salary) AS average from employees";

    const query = `
      SELECT 
  companies.name AS company_name,
  AVG(employees.salary) AS average_salary
FROM 
  employees
JOIN 
  companies ON employees.company_id = companies.id
GROUP BY 
  companies.name
ORDER BY 
  companies.name ASC;

    `;

    const result = await pool.query(query);

    if (result.rows.length > 0) {
      // const { numberOfSalaries, totalSalaries } = result.rows[0];

      res.status(200).json({ average_salary: result.rows });
    } else {
      res.status(404).json({ message: "No employees found" });
    }
  } catch (error) {
    console.error("Error retrieving average salary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { employeeDetails, employeeHighestSalary, averageSalary };
