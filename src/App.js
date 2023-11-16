// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserManagement from './components/UserManagement';
import EditUser from './components/EditUser';
import AddUser from './components/AddUser';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  const checkAuthentication = () => {
    setIsAuthenticated(true); 
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user-management" />} />
        <Route
          path="/login"
          element={<Login checkAuthentication={checkAuthentication} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/user-management"
          element={isAuthenticated ? <UserManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:userId"
          element={isAuthenticated ? <EditUser /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-user"
          element={isAuthenticated ? <AddUser /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
