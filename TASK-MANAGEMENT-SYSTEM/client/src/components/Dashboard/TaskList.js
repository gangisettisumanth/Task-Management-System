import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, TextField } from '@mui/material';
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3002/assigntask');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                if (error.response) {
                    console.error('Axios error details:', error.response);
                }
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

        axios.patch(`http://localhost:3002/assigntask/${employeeId}`, requestData)
            .then((response) => {
                // Assuming the response.data contains the updated task data from the server
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
                }
            });
    };

    const handleDelete = (employeeId) => {
        axios.delete(`http://localhost:3002/assigntask/${employeeId}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log('Delete Task with Employee ID:', employeeId);
                    setTasks((prevTasks) => prevTasks.filter((task) => task.employeeId !== employeeId));
                } else {
                    console.error('Error deleting task. Unexpected response:', response);
                }
            })
            .catch((error) => {
                console.error('Error deleting task:', error);

                if (axios.isAxiosError(error)) {
                    console.error('Axios error details:', error.response);
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
                                    {updatedTaskId === task.employeeId ? (
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
                                                onClick={() => handleUpdateClick(task.employeeId)}
                                                style={{ margin: '4px' }}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleDelete(task.employeeId)}
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




