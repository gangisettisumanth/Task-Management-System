import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress, Grow } from '@material-ui/core';
import { UilUser } from '@iconscout/react-unicons';
import Axios from 'axios';

const EmployeeBoard = () => {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [taskStatus, setTaskStatus] = useState({ notStarted: 0, working: 0, completed: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const employeeCountResponse = await Axios.get('http://localhost:3002/employee');
                if (employeeCountResponse.status !== 200) {
                    throw new Error('Error fetching employee count');
                }
                setEmployeeCount(employeeCountResponse.data.count);

                
                const taskStatusResponse = await Axios.get('http://localhost:3002/taskstatus');
                if (taskStatusResponse.status !== 200) {
                    throw new Error('Error fetching task status');
                }
                const taskStatusData = taskStatusResponse.data;
                setTaskStatus({
                    notStarted: taskStatusData.notStarted,
                    working: taskStatusData.working,
                    completed: taskStatusData.completed,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Grow in>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Employee Count</Typography>
                        <Typography variant="h3">{employeeCount}</Typography>
                        <UilUser size="40" />
                    </CardContent>
                </Card>
            </Grow>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                <CircularProgressWithLabel
                    value={(taskStatus.notStarted / employeeCount) * 100}
                    label="Not Started"
                />
                <CircularProgressWithLabel
                    value={(taskStatus.working / employeeCount) * 100}
                    label="Working"
                />
                <CircularProgressWithLabel
                    value={(taskStatus.completed / employeeCount) * 100}
                    label="Completed"
                />
            </div>
        </div>
    );
};

const CircularProgressWithLabel = ({ value, label }) => (
    <Grow in>
        <div style={{ textAlign: 'center', position: 'relative' }}>
            <CircularProgress variant="determinate" value={value} size={100} thickness={4} />
            <Typography
                variant="body2"
                color="textSecondary"
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
                {Math.round(value)}%
                <br />
                {label}
            </Typography>
        </div>
    </Grow>
);

export default EmployeeBoard;






