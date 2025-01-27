﻿


## Employee Management System
### Application Architecture
The Employee Management System is built using the following architecture:

1. Backend: Node.js with Express.js framework.
2. Database: PostgreSQL.
3. Authentication: JWT (JSON Web Tokens) for secure login.

### Installation
To set up the application locally, follow these steps:

1. Clone the Repository:

```bash
git clone https://github.com/butscurrent/employee-management.git
cd server
```
2. Install Dependencies:
   
```bash
npm install
```

3. Set Up Environment Variables:
Create a .env file in the root directory and add your environment variables. Example:


PORT = 5000

```bash
PORT=5000

JWT_SECRET_KEY=your-secret-key



DB_USER=your-user
DB_HOST=your-host-name
DB_DATABASE=your-db-name
DB_PASSWORD=your-password
DB_PORT=5432
```

4. Start the Server:

```bash
npm start
```
The server will be running on http://localhost:5000.

### Usage
How to Use This App?

1. Register a User:

A user has to be registered using the route:

```bash

POST http://localhost:5000/api/v1/users/register
```

2. Login:

The user then has to log in using the route:

```bash

POST http://localhost:5000/api/v1/users/login
```

3. Logout:

The user can also logout using the route:

```bash
POST http://localhost:5000/api/v1/users/logout
```
4. Access Employee List:

The employee list can be accessed using the route:

```bash
POST http://localhost:5000/api/v1/employees/list
```

5. Highest Paid Employee:

The highest-paid employee from each company can be accessed from:

```bash
POST http://localhost:5000/api/v1/employees/highest-pay
```
6. Average Salary:

The average salary of each company can be accessed by:

```bash
POST http://localhost:5000/api/v1/employees/average-salary
```


