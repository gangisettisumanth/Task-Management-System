import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
} from '@material-ui/core';
import axios from 'axios';

const Workbench = () => {
    const { employeeId } = useParams();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true); 
    const selectRefs = useRef({});

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                if (employeeId) {
                    const response = await axios.get(`http://localhost:3002/assigntask/${employeeId}`);
                    setTasks(response.data);
                } else {
                    console.error('Employee ID is undefined');
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [employeeId]);

    const handleStatusChange = (taskId, newStatus) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.taskId === taskId ? { ...task, taskStatus: newStatus } : task
            )
        );

        // Now you can use the newStatus directly to make API calls or perform other actions
        updateTaskStatus(taskId, newStatus);
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        console.log('Updating task status:', taskId, newStatus);
        try {
            await axios.patch(`http://localhost:3002/assigntask/${employeeId}/${taskId}`, {
                taskStatus: newStatus,
            });
            console.log(
                'Axios Request:',
                `http://localhost:3002/assigntask/${employeeId}/${taskId}`,
                { taskStatus: newStatus }
            );
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const handleSignOut = () => {
        setIsUserLoggedIn(false);
        navigate('/login');
        
    };

    return (
        <div>
            {!isUserLoggedIn && (
                <div>
                    <h2>Login Page</h2>
                </div>
            )}

            {isUserLoggedIn && (
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        <h2>Workbench</h2>
                        <Button variant="contained" color="secondary" onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    </div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Task ID</TableCell>
                                    <TableCell>Task Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks.map((task) => (
                                    <TableRow key={task.taskId}>
                                        <TableCell>{task.taskId}</TableCell>
                                        <TableCell>{task.taskName}</TableCell>
                                        <TableCell>{task.description}</TableCell>
                                        <TableCell>
                                            <FormControl>
                                                <InputLabel>Status</InputLabel>
                                                <Select
                                                    ref={(el) => (selectRefs.current[task.taskId] = el)}
                                                    value={task.taskStatus || ''}
                                                    onChange={(e) => handleStatusChange(task.taskId, e.target.value)}
                                                >
                                                    <MenuItem value="notStarted">Not Started</MenuItem>
                                                    <MenuItem value="working">In Progress</MenuItem>
                                                    <MenuItem value="completed">Completed</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    );
};

export default Workbench;













