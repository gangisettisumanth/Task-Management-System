// ManagerPage.js
import React, { useContext, useState } from 'react';
import {
    TextField,
    Button,
    Paper,
    Typography,
    makeStyles,
    } from '@material-ui/core';
    import { UilUser, UilSignInAlt } from '@iconscout/react-unicons';
    import { Managerinfo } from '../App';
    


    const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
    },
    }));

    function ManagerPage() {
    const classes = useStyles();
    const { managerLogin } = useContext(Managerinfo);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleLogin = () => {
        const isValid = validateForm();
        if (isValid) {
        
        if (formData.username === 'manager' && formData.password === 'password') {
            setIsSubmitted(true);
            managerLogin(); // Use context to handle login state and redirect
        } else {
            alert('Login failed. Check your credentials.');
        }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const validateForm = () => {
        const errors = {};
        if (formData.username.trim() === '') {
        errors.username = 'Username is required';
        }
        if (formData.password.trim() === '') {
        errors.password = 'Password is required';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <Paper elevation={3}>
        <div>
            <Typography variant="h5">
            <UilUser size="30" /> Manager Login
            </Typography>
            <form className={classes.form}>
            <TextField
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                InputProps={{
                startAdornment: <UilUser size="20" />,
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
                startAdornment: <UilSignInAlt size="20" />,
                }}
            />
            <Button onClick={handleLogin} variant="contained" color="primary">
                <UilSignInAlt size="20" /> Login
            </Button>
            </form>
        </div>
        {isSubmitted && <div>Login successful!</div>}
        </Paper>
    );
}

export default ManagerPage;
















