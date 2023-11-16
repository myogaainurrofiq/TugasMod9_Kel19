import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';

const AddUser = () => {
  const [newUser, setNewUser] = useState({
    username: '',
    name: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleAddUser = async () => {
    try {
      await api.post('/users', newUser);
      navigate('/user-management');
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
      <h2>Add User</h2>
      <label>
        Username:
        <input type="text" name="username" value={newUser.username} onChange={handleInputChange} />
      </label>
      <label>
        Name:
        <input type="text" name="name" value={newUser.name} onChange={handleInputChange} />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default AddUser;
