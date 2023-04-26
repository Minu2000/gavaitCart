import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    fontFamily: 'Roboto, sans-serif',
    fontSize: '16px',
    '& label': {
      fontSize: '18px',
    },
    '& .MuiInputBase-root': {
      fontSize: '18px',
    },
    '& .MuiButton-contained': {
      fontSize: '18px',
      fontWeight: 'bold',
    },
  },
  link: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
}));

function Login({ setAuth }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email:'',
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:5000//api/v1/login', formData)
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem('access_token', response.data.access_token);
          setAuth(true);
          toast.success('Logged in successfully');
          console.log('Navigating to viewcart page...');
          navigate('/wishlist');
        } else {
          toast.error('Invalid username or password');
        }
      })
      .catch((error) => {
        const message = error.response.data.message;
        toast.error(message);
      });
  };

  return (
    <form className={classes.form} onSubmit={handleFormSubmit}>
       <TextField
        className={classes.input}
        name="email"
        label="Email"
        variant="outlined"
        value={formData.email}
        onChange={handleInputChange}
      />
      <TextField
        className={classes.input}
        name="username"
        label="Username"
        variant="outlined"
        value={formData.username}
        onChange={handleInputChange}
      />
      <TextField
        className={classes.input}
        name="password"
        label="Password"
        variant="outlined"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="submit"
      >
        Login
      </Button>
      <Typography
        variant="body1"
        className={classes.link}
        onClick={() => navigate('/register')}
      >
        Don't have an account? Register here
      </Typography>
      <ToastContainer />
    </form>
  );
}

export default Login;
