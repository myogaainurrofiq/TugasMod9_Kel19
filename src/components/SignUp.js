// components/SignUp.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3001/users/signup', {
        username,
        name,
        password,
      });
      console.log('Signup successful:', response.data); // Log success response
      setError(null);
    } catch (error) {
      console.error('Signup error:', error); // Log the error for debugging
      setError('Error during signup. Please try again.'); // Set error message
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
      <p>
        Already have an account? <Link to="/login">Log in here</Link>.
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignUp;
