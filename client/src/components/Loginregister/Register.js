import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

function Register() {
  const [ email ,setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const response = await fetch('http://localhost:5000/api/v1/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      // Store user_id in local storage
      localStorage.setItem('user_id', data.user_id);
  
      navigate('/login');
    } else {
      setError(data.message);
    }
  };
  
  return (
    <div>
      <h1>Register</h1>
      {error && <div>{error}</div>}
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
      <div style={{ marginTop: '1rem' }}>
        Already signed up? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default Register;
