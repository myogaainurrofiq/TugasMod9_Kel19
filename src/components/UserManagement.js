import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../Services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = true; 
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchUsers();
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await api.post('/users', newUser);
      setNewUser({ username: '' }); 
      fetchUsers();
    } catch (error) {
      console.error('Error adding user', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>User Management</h2>
      <Link to="/add-user">Add User</Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}{' '}
            <button onClick={() => handleDelete(user.id)}>Delete</button>{' '}
            <Link to={`/edit/${user.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
