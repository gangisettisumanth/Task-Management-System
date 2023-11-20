const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taskmanagement',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error: ' + err.stack);
        return;
    }
    console.log('Connected to database as ID ' + db.threadId);
});

app.post('/register', (req, res) => {
    const { employeeId, employeename, email, password, confirmPassword } = req.body;

    db.query(
        'INSERT INTO employee (employeeId, employeename, email, password, confirmPassword) VALUES (?, ?, ?, ?, ?)',
        [employeeId, employeename, email, password, confirmPassword],
        (err, result) => {
            if (err) {
                console.error('Database error:', err);
                res.status(500).json({ message: 'Error registering user' });
            } else {
                res.status(201).json({ message: 'User registered successfully' });
            }
        }
    );
});


app.post('/login', (req, res) => {
    const { employeeId, password } = req.body;

    db.query('SELECT * FROM employee WHERE employeeId = ? AND password = ?', [employeeId, password], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ message: 'Error logging in' });
        } else {
            if (results.length > 0) {
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        }
    });
});



app.post('/assigntask', (req, res) => {
    const {
        taskId,
        employeeId,
        employeeEmail,
        taskName,
        taskStatus,
        startDate,
        endDate,
        description,
    } = req.body;

    db.query(
        'INSERT INTO assigntask (taskId, employeeId, employeeEmail, taskName, taskStatus, startDate, endDate, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
            taskId,
            employeeId,
            employeeEmail,
            taskName,
            taskStatus,
            startDate,
            endDate,
            description,
        ],
        (err, result) => {
            if (err) {
                console.error('Database error:', err);
                res.status(500).json({ message: 'Error assigning task' });
            } else {
                console.log('Task added to the database:', result);
                res.status(201).json({ message: 'Task assigned successfully' });
            }
        }
    );
});


app.get('/assigntask', (req, res) => {
    // Assuming you have a MySQL database connection named 'db'
    db.query('SELECT * FROM assigntask', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ message: 'Error fetching tasks' });
        } else {
            res.status(200).json(results);
        }
    });
});


app.patch('/assigntask/:employeeId', (req, res) => {
    const { employeeId } = req.params;
    const updatedData = req.body;

    db.query('UPDATE assigntask SET ? WHERE employeeId = ?', [updatedData, employeeId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ message: 'Error updating task' });
        } else {
            if (result.affectedRows > 0) {
                // Task updated successfully
                res.status(200).json({ message: 'Task updated successfully' });
            } else {
                // Task with the given employeeId not found
                res.status(404).json({ message: 'Task not found' });
            }
        }
    });
});





app.delete('/assigntask/:employeeId', (req, res) => {
    const { employeeId } = req.params;

    db.query('DELETE FROM assigntask WHERE employeeId = ?', [employeeId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ message: 'Error deleting task' });
        } else {
            if (result.affectedRows > 0) {
                // Task deleted successfully
                res.status(200).json({ message: 'Task deleted successfully' });
            } else {
                // Task with the given employeeId not found
                res.status(404).json({ message: 'Task not found' });
            }
        }
    });
});


app.get('/employeedata', (req, res) => {
  console.log('Request to /employeedata received');  // Add this line
  // Assuming you have a MySQL database connection named 'db'
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Error fetching employees' });
        } else {
        res.status(200).json(results);
        }
    });
    });




app.get('/employee', (req, res) => {
    console.log('Request to /employee count received');

    db.query('SELECT COUNT(*) as count FROM employee', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ message: 'Error fetching employees', error: err.message });
        } else {
            res.status(200).json({ count: results[0].count });
        }
    });
});


app.get('/taskstatus', (req, res) => {
    console.log('Request to /task status received');

    db.query('SELECT taskStatus, COUNT(*) as count FROM assigntask GROUP BY taskStatus', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ message: 'Error fetching task status', error: err.message });
        } else {
            const taskStatusCounts = results.reduce((acc, row) => {
                acc[row.taskStatus] = row.count;
                return acc;
            }, {});

            res.status(200).json(taskStatusCounts);
        }
    });
});



// workbench


app.get('/assigntask/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId;

    // Check if employeeId is undefined or null
    if (!employeeId) {
        return res.status(400).json({ error: 'Employee ID is required' });
    }

    // Replace this query with your actual query
    const query = `SELECT * FROM assigntask WHERE employeeId = ?`;

    db.query(query, [employeeId], (err, results) => {
        if (err) {
            console.error('Error fetching tasks:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});


// Update task status
app.patch('/assigntask/:employeeId/:taskId', (req, res) => {
    const employeeId = req.params.employeeId;
    const taskId = req.params.taskId;

    const { taskStatus } = req.body;
    console.log('Received taskStatus:', taskStatus);

    // Logging employeeId and taskId for debugging
    console.log('Received employeeId:', employeeId);
    console.log('Received taskId:', taskId);

    // Replace this query with your actual update query
    const updateQuery = `UPDATE assigntask SET taskStatus = ? WHERE employeeId = ? AND taskId = ?`;
    console.log('SQL Query:', updateQuery);

    db.query(updateQuery, [taskStatus, employeeId, taskId], (err, results) => {
        if (err) {
            console.error('Error updating task status:', err);
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        } else {
            if (results.affectedRows > 0) {
                res.json({ message: 'Task status updated successfully' });
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        }
    });
});











app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});





















