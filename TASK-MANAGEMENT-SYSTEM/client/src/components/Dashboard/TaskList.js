import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [updatedTaskId, setUpdatedTaskId] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        taskId: '',
        employeeId: '',
        employeeEmail: '',
        taskName: '',
        taskStatus: '',
        startDate: '',
        endDate: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3002/assigntask');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                if (error.response) {
                    console.error('Axios error details:', error.response);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleUpdateClick = (taskId) => {
        setUpdatedTaskId(taskId);

        // Find the task based on taskId
        const existingTask = tasks.find((task) => task.taskId === taskId);

        // Check if existingTask is not undefined or null
        if (existingTask) {
            // Use Object.keys only if existingTask is defined
            Object.keys(existingTask).forEach((key) => {
                setUpdatedData((prevData) => ({
                    ...prevData,
                    [key]: existingTask[key],
                }));
            });
        } else {
            console.error(`Task with taskId ${taskId} not found.`);
        }
    };

    const handleUpdateSubmit = () => {
        // Ensure that employeeId is defined
        if (!updatedData.employeeId) {
            console.error('Employee ID is undefined.');
            return;
        }

        // Extract only the relevant data for the request payload
        const { taskId, employeeId, employeeEmail, taskName, taskStatus, startDate, endDate, description } = updatedData;
        const requestData = {
            taskId,
            employeeId,
            employeeEmail,
            taskName,
            taskStatus,
            startDate,
            endDate,
            description,
        };

        axios.patch(`http://localhost:3002/assigntask/${taskId}`, requestData)
            .then((response) => {
                
                setTasks((prevTasks) =>
                    prevTasks.map((prevTask) =>
                        prevTask.employeeId === employeeId ? { ...prevTask, ...response.data } : prevTask
                    )
                );
                console.log('Update Task with Employee ID:', employeeId);
                setUpdatedTaskId(null);
                setUpdatedData({
                    taskId: '',
                    employeeId: '',
                    employeeEmail: '',
                    taskName: '',
                    taskStatus: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                });
            })
            .catch((error) => {
                console.error('Error updating task:', error);

                if (axios.isAxiosError(error)) {
                    console.error('Axios error details:', error.response);
                    
                } else {
                    console.error('Non-Axios error:', error);
                   
                }
            });
    };

    const handleDelete = (taskId) => {
        axios.delete(`http://localhost:3002/assigntask/${taskId}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log('Delete Task with Task ID:', taskId);
                    setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
                } else {
                    console.error('Error deleting task. Unexpected response:', response);
                    // Display a user-friendly error message to the user using a notification library or other means
                }
            })
            .catch((error) => {
                console.error('Error deleting task:', error);

                if (axios.isAxiosError(error)) {
                    console.error('Axios error details:', error.response);
                    // Display a user-friendly error message to the user using a notification library or other means
                } else {
                    console.error('Non-Axios error:', error);
                    // Display a user-friendly error message to the user using a notification library or other means
                }
            });
    };

    const handleInputChange = (field, value) => {
        setUpdatedData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
        <div>
            <h2>Task List</h2>
            {loading && <CircularProgress />}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task ID</TableCell>
                            <TableCell>Employee ID</TableCell>
                            <TableCell>Task Name</TableCell>
                            <TableCell>Task Status</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.taskId}>
                                <TableCell>{task.taskId}</TableCell>
                                <TableCell>{task.employeeId}</TableCell>
                                <TableCell>{task.taskName}</TableCell>
                                <TableCell>{task.taskStatus}</TableCell>
                                <TableCell>{new Date(task.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</TableCell>
                                <TableCell>{new Date(task.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>
                                    {updatedTaskId === task.taskId ? (
                                        <>
                                            {Object.keys(updatedData).map((key) => (
                                                <TextField
                                                    key={key}
                                                    label={`New ${key}`}
                                                    variant="outlined"
                                                    value={updatedData[key]}
                                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                                    style={{ margin: '4px' }}
                                                />
                                            ))}
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleUpdateSubmit}
                                                style={{ margin: '4px' }}
                                            >
                                                Submit Update
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleUpdateClick(task.taskId)}
                                                style={{ margin: '4px' }}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleDelete(task.taskId)}
                                                style={{ margin: '4px' }}
                                            >
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TaskList;





