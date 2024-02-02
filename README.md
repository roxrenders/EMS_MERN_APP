# EMS (Employees Management System ) App. 

This is a full-stack website built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to sign up and sign in as an employee or as a manager (admin).


## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **Employee Browsing**: Users can browse through a list of employees.
- **Employee Search**: Users can search for employees from specific location..
- ** Sorting **: Users can sort employees by their names.
- ** Edit Users details**: Only Managers (Admin) can edit employees details from AllUsers page.
- **Add Departments **: Only Managers (Admin) can create department and add or remove employees in those departments.


## Technologies Used

- **Frontend**: React.js, useContext hook (for state management), React Router (for routing), Bootstrap (for UI components)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Altas (with Mongoose )
- **Authentication**: JSON Web Tokens (JWT)


## Installation

1.	Clone the repository:

2.	For Front- End (React app with Vite)
•	Cd frontend
•	npm install
•	npm run dev

3.	For Backend (node JS  and Express Js )
•	Cd backend
•	Npm run build
•	Npm start

    
## Environment Variables

.Env – 
•	PORT=9000
•	DATABASE = your mongo db url
•	JWT_SECRETKEY =your_jwt_secret


