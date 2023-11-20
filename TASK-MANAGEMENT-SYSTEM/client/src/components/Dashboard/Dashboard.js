import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { Container, Typography, Paper } from '@mui/material';
import AssignTask from './AssignTask';
import TaskList from './TaskList';
import EmployeeData from './EmployeeData';
import './SidebarStyle.css';
import EmployeeBoard from './EmployeeBoard';

const theme = createTheme();

const Dashboard = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const navigate = useNavigate();

    const SidebarData = [
        {
            icon: DashboardIcon,
            heading: 'Dashboard',
            
        },
        {
            icon: AssignmentIcon,
            heading: 'Assign Task',
            
        },
        {
            icon: ListAltIcon,
            heading: 'Task List',
            
        },
        {
            icon: GroupIcon,
            heading: 'Employee Data',
            
        },
    ];

    const handleSignout = () => {
        setIsAuthenticated(false);
    };

    const handleMenuClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    const renderComponent = () => {
        switch (selectedMenuItem) {
            case 'Dashboard':
                return <EmployeeBoard />;
            case 'Assign Task':
                return <AssignTask />;
            case 'Task List':
                return <TaskList />;
            case 'Employee Data':
                return <EmployeeData />;
            default:
                return null;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div style={{ display: 'flex' }}>
                {/* Sidebar component */}
                <motion.div className="sidebar">
                    <div className="logo">
                        <DashboardIcon style={{ color: 'red', fontSize: 'xx-large' }} />
                        <span style={{ color: 'hotpink' }}>
                            Sky<span style={{ color: 'green' }}>W</span>ay
                        </span>
                    </div>
                    <div className="menu">
                        {SidebarData.map((item, index) => (
                            <Link
                                to={item.path}
                                style={{ textDecoration: 'none' }}
                                key={index}
                                onClick={() => handleMenuClick(item.heading)}
                            >
                                <div
                                    className={selectedMenuItem === item.heading ? 'menuItem active' : 'menuItem'}
                                >
                                    <item.icon />
                                    <span>{item.heading}</span>
                                </div>
                            </Link>
                        ))}
                        <div className="menuItem">
                            {isAuthenticated ? (
                                <LogoutIcon onClick={handleSignout} />
                            ) : (
                                navigate('/')
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Mainboard component */}
                <Container>
                    <Typography variant="h4" component="h1" mt={4} mb={2}>
                        {selectedMenuItem}
                    </Typography>
                    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                        {/* Render content based on the selectedMenuItem */}
                        {renderComponent()}
                    </Paper>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default Dashboard;




