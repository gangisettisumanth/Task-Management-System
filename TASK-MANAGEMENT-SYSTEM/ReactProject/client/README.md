
#Task Management System

1. Introduction
The Task Management System is a web-based application designed to streamline and enhance task assignment and tracking within an organization. The system includes features such as employee registration, login functionality for both employees and managers, a dashboard for managers, task assignment, task listing, and employee data management. The application is built using Node.js, Express.js, MySQL database, and incorporates various libraries and frameworks such as Material-UI, Framer Motion, and React Router DOM.

2. Features
2.1 Employee Registration
Employees can register by providing necessary details like name, email, and password.
Registration data is securely stored in the MySQL database.
2.2 Employee Login
Registered employees can log in using their credentials.
Authentication is implemented to ensure secure access to the system.
2.3 Manager Login
Managers have a dedicated login page to access the system.
Manager authentication is implemented to restrict unauthorized access.
2.4 Manager Dashboard
Upon successful login, managers are directed to the dashboard.
The dashboard displays the count of employees from the database.
Circular progress bars show the status of tasks assigned to employees.
2.5 Assign Task Page
Managers can use the Assign Task page to add tasks for employees.
Task details, such as description and due date, can be specified.
2.6 Task List Page
The Task List page allows managers to update and delete tasks.
Tasks are displayed in a user-friendly interface, making it easy to manage.
2.7 Employee Data Page
This page displays information about all employees in the database.
Managers can easily view and manage employee data.
2.8 Workbench Page
Upon employee login, they are directed to the Workbench page.
Employee credentials are dynamically passed to the routing system.
The Workbench page displays assigned tasks, and employees can edit the status of their tasks.
3. Technologies Used
Frontend:

React.js with Material-UI for a responsive and intuitive user interface.
Framer Motion for smooth animations.
Backend:

Node.js and Express.js for server-side development.
MySQL database for storing and retrieving data.
Third-Party Libraries:

"body-parser" for parsing HTTP request bodies.
"cors" for handling Cross-Origin Resource Sharing.
"axios" for making HTTP requests.
"@iconscout/react-unicons", "@material-ui/core", "@material-ui/icons", "@mui/icons-material", and "@mui/material" for UI components.
"@babel/plugin-proposal-private-property-in-object" for handling private properties.
"react-router-dom" for client-side routing.
4. Conclusion
The Task Management System offers a comprehensive solution for efficient task management within an organization. By combining the power of React.js, Material-UI, and Node.js, the system provides a user-friendly interface for both employees and managers. The integration of Framer Motion ensures a visually appealing and smooth user experience. The project successfully demonstrates the use of modern technologies to create a robust and scalable task management application.




