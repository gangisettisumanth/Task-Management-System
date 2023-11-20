import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import RouteStack from "./Routes";
import Navigation from './components/NavigationStack';

export const Managerinfo = createContext();
export const Employeeinfo = createContext();

function App() {
  const [managerLoggedIn, setManagerLoggedIn] = useState(false);
  const [employeeLoggedIn, setEmployeeLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const managerLogin = () => {
    setManagerLoggedIn(true);
    setEmployeeLoggedIn(false);
    
    navigate('/dashboard');
  };

  const employeeLogin = () => {
    setManagerLoggedIn(false);
    setEmployeeLoggedIn(true);
    
    navigate('/workbench/:employeeId');
  };

  

  useEffect(() => {
    setManagerLoggedIn(location.pathname.startsWith('/dashboard'));
    setEmployeeLoggedIn(location.pathname.startsWith('/workbench'));
}, [location]);


  return (
    <Managerinfo.Provider value={{ managerLoggedIn, managerLogin }}>
      <Employeeinfo.Provider value={{ employeeLoggedIn, employeeLogin }}>
        {/* Conditionally render Navigation based on managerLoggedIn or employeeLoggedIn */}
        {managerLoggedIn || employeeLoggedIn ? null : <Navigation />}
        <RouteStack />
      </Employeeinfo.Provider>
    </Managerinfo.Provider>
  );
}

export default App;











