import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { AddCircle as AddCircleIcon } from '@mui/icons-material';
import axios from 'axios';

const AssignTask = () => {
    const [formData, setFormData] = useState({
        taskId:'',
        employeeId: '',
        employeeEmail: '',
        taskName: '',
        taskStatus: '',
        startDate: '',
        endDate: '',
        description: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
    try {
            // Make an API request to store the data in the backend
            await axios.post('http://localhost:3002/assigntask', formData);

            // Reset the form data after successful submission
            setFormData({
                taskId: '',
                employeeId: '',
                employeeEmail: '',
                taskName: '',
                taskStatus: '',
                startDate: '',
                endDate: '',
                description: '',
            });

            console.log('Task added successfully');
        } catch (error) {
            console.error('Error during task addition:', error.message);
        }
        
        // For simplicity, we're just logging the form data
        console.log('Form Data Submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
            Assign Task
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                fullWidth
                id="taskId"
                name="taskId"
                label="Task ID"
                value={formData.taskId}
                onChange={handleChange}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                fullWidth
                id="employeeId"
                name="employeeId"
                label="Employee ID"
                value={formData.employeeId}
                onChange={handleChange}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                fullWidth
                id="employeeEmail"
                name="employeeEmail"
                label="Employee Email"
                value={formData.employeeEmail}
                onChange={handleChange}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                fullWidth
                id="taskStatus"
                name="taskStatus"
                label="Task Status"
                value={formData.taskStatus}
                onChange={handleChange}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                required
                fullWidth
                id="taskName"
                name="taskName"
                label="Task Name"
                value={formData.taskName}
                onChange={handleChange}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                fullWidth
                id="startDate"
                name="startDate"
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                InputLabelProps={{
                shrink: true,
                }}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                fullWidth
                id="endDate"
                name="endDate"
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                InputLabelProps={{
                shrink: true,
                }}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                required
                fullWidth
                multiline
                rows={4}
                id="description"
                name="description"
                label="Task Description"
                value={formData.description}
                onChange={handleChange}
            />
            </Grid>
            <Grid item xs={12}>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
            >
                Add Task
            </Button>
            </Grid>
        </Grid>
        </form>
    );
};

export default AssignTask;
