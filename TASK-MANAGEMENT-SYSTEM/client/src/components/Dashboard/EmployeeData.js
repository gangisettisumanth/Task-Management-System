import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import axios from 'axios';

const EmployeeData = () => {
    const [employees, setEmployees] = useState([]);

    
    useEffect(() => {
    axios.get('http://localhost:3002/employeedata')
        .then((response) => {
        setEmployees(response.data);
        })
        .catch((error) => {
        console.error('Error fetching employees:', error);
        });
    }, []);



    return (
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                
            </TableRow>
            </TableHead>
            <TableBody>
            {employees.map((employee) => (
                <TableRow key={employee.employeeId}>
                <TableCell>{employee.employeeId}</TableCell>
                <TableCell>{employee.employeename}</TableCell>
                <TableCell>{employee.email}</TableCell>
                
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
};

export default EmployeeData;
