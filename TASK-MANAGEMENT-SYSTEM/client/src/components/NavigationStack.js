import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
} from '@material-ui/core';
import { UilSignInAlt } from '@iconscout/react-unicons';

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: theme.palette.primary.main,
    },
    button: {
        margin: theme.spacing(5),
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    toolbar: {
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column', 
            alignItems: 'center', 
        },
    },
}));

function Navigation() {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6">Task Management System</Typography>
                <Link to="/" className={classes.link}>
                    <Button variant="contained" color="secondary" className={classes.button}>
                        Register Page
                    </Button>
                </Link>
                <Link to="/login" className={classes.link}>
                    <Button variant="contained" color="secondary" className={classes.button}>
                        <UilSignInAlt size="20" /> Login Page
                    </Button>
                </Link>
                <Link to="/manager" className={classes.link}>
                    <Button variant="contained" color="secondary" className={classes.button}>
                        Manager Page
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default Navigation;




