// RouteStack.js
    import React, { useContext } from 'react';
    import { Routes, Route } from 'react-router-dom';
    import Register from './components/Register';
    import Login from './components/Login';
    import ManagerPage from './components/ManagerPage';
    import Dashboard from './components/Dashboard/Dashboard';
    import { Employeeinfo, Managerinfo } from './App';
    import Workbench from "./components/WorkBench";

    function RouteStack() {
    const { managerLoggedIn } = useContext(Managerinfo);
    const { employeeLoggedIn } = useContext(Employeeinfo);
    

    return (
        <Routes>

        <Route path="/" element={<Register />} />

        {managerLoggedIn && (
            <Route path="/dashboard" element={<Dashboard />} />
        )}

        {!managerLoggedIn && (
            <Route path="/manager" element={<ManagerPage />} />
        )}

        {!employeeLoggedIn && (
            <Route path="/login" element={<Login />} />
        )}

        {employeeLoggedIn && (
            <Route path="/workbench/:employeeId" element={<Workbench/>}/>
        )}

        {/* Add other routes as needed */}
        </Routes>
    );
    }

    export default RouteStack;













































































































// // RouteStack.js
// import React, { useContext } from 'react';
// import { Routes, Route} from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import ManagerPage from './components/ManagerPage';
// import Dashboard from './components/Dashboard/Dashboard';

// import { Employeeinfo, Managerinfo } from './App';
// import Workbench from './components/WorkBench';

// function RouteStack() {
//     const { managerLoggedIn } = useContext(Managerinfo);
//     const { employeeLoggedIn } = useContext(Employeeinfo); 

//     return (
//         <Routes>

//         <Route path="/register" element={<Register />} />
//         {employeeLoggedIn ? (
//             <>
//             <Route path="/workbench" element={<Workbench/>}>
//             </Route>
//             </>
//         ) : (
//             <Route path="/login" element={<Login />} />
//         )}
//         {managerLoggedIn ? (
//             <>
//             <Route path="/dashboard" element={<Dashboard />}>
//             </Route>
//             </>
//         ) : (
//             <Route path="/manager" element={<ManagerPage />} />
//         )}

//         </Routes>
//     );
//     }

// export default RouteStack;




