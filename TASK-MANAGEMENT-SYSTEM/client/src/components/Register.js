import React, { useState } from 'react';
import {
    TextField,
    Button,
    Paper,
    Typography,
    makeStyles,
    } from '@material-ui/core';
    import { UilUser, UilEnvelope, UilLock } from '@iconscout/react-unicons';
    import axios from 'axios';
    

    const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
    },
    }));

    function Register() {
    const classes = useStyles();

    const [formData, setFormData] = useState({
        employeeId: '',
        employeename: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.employeeId.trim()) {
        errors.employeeId = 'Employee ID is required';
        }

        if (!formData.employeename.trim()) {
        errors.employeename = 'Employee Name is required';
        }

        if (!formData.email.trim()) {
        errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid';
        }

        if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
        axios
            .post('http://localhost:3002/register', formData)
            .then(() => {
            setIsSubmitted(true);
            setFormData({
                employeeId: '',
                employeename: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
            })
            .catch((error) => {
            console.error('Registration failed:', error.message);
            });
        }
    };

    return (
        <Paper elevation={3}>
        <Typography variant="h5">Register</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
            name="employeeId"
            label="Employee ID"
            variant="outlined"
            fullWidth
            value={formData.employeeId}
            onChange={handleChange}
            error={!!errors.employeeId}
            helperText={errors.employeeId}
            />
            <TextField
            name="employeename"
            label="Employee Name"
            variant="outlined"
            fullWidth
            value={formData.employeename}
            onChange={handleChange}
            error={!!errors.employeename}
            helperText={errors.employeename}
            InputProps={{
                startAdornment: <UilUser size="20" />,
            }}
            />
            <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
                startAdornment: <UilEnvelope size="20" />,
            }}
            />
            <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
                startAdornment: <UilLock size="20" />,
            }}
            />
            <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
                startAdornment: <UilLock size="20" />,
            }}
            />
            <Button type="submit" variant="contained" color="primary">
            Register
            </Button>
        </form>
        {isSubmitted && <div>Registration successful!</div>}
        </Paper>
    );
}

export default Register;


