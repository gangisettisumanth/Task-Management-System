import React, { useContext, useState } from 'react';
import {
    TextField,
    Button,
    Paper,
    Typography,
    makeStyles,
} from '@material-ui/core';
import {  UilLock } from '@iconscout/react-unicons';
import { Employeeinfo } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
    },
}));

function Login() {
    const classes = useStyles();
    const { employeeLogin } = useContext(Employeeinfo);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        employeeId: '',
        password: '',
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
        if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };


        const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            axios.post(`http://localhost:3002/login`, formData)
            .then((response) => {
                if (response.data.message === 'Login successful') {
                setIsSubmitted(true);
                employeeLogin();
                setFormData({
                    employeeId: '',
                    password: '',
                });
                // Pass the employeeId as a prop to Workbench
                navigate(`/workbench/${String(formData.employeeId)}`);

                

                
                } else {
                console.error('Login failed:', response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error during login:', error.message);
            });
        }
        };



    return (
        <Paper elevation={3}>
            <Typography variant="h5">Login</Typography>
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
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </form>
            {isSubmitted && <div>Login successful!</div>}
        </Paper>
    );
}

export default Login;


