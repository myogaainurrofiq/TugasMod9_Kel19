// components/EditUser.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Services/api';

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    name: '', // Add additional fields as needed (e.g., name, password)
    password: '',
  });

  useEffect(() => {
    // Fetch user data by userId
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditUser = async () => {
    try {
      // Send updated user data to the server
      await api.put(`/users/${userId}`, userData);
      // Redirect back to the user management page after editing
      // You may replace this with your preferred navigation method
      navigate('/user-management');
    } catch (error) {
      console.error('Error editing user', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Edit User</h2>
      <label>
        Username:
        <input type="text" name="username" value={userData.username} onChange={handleInputChange} />
      </label>
      <label>
        Name:
        <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
        />
      </label>
      {/* Add additional fields for editing user information */}
      <button onClick={handleEditUser}>Save Changes</button>
    </div>
  );
};

export default EditUser;
