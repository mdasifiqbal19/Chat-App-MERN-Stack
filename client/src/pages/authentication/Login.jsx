import { Box, TextField, Container, Typography, Button, Paper, InputAdornment, Link } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import {toast} from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '../../store/slice/user/user.thunk';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector((state)=> state.userReducer)

    const [loginData, setLoginData] =  useState({
        username : "",
        password : "",
    })

    useEffect(() => {
      if(isAuthenticated) navigate('/')
    }, [isAuthenticated]);

    const handleInputChange = (e) => {
        setLoginData((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }));
    };

    const handleLogin = async () => {
      const response = await dispatch(loginUserThunk(loginData))
      if (response?.payload?.success){
        navigate('/');
      }
    }

    return (
    <Container maxWidth="sm">
      <Paper
        elevation={6}
        sx={{
          marginTop: 10,
          padding: 4,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          backgroundColor: 'background.paper'
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
          Log In
        </Typography>

        {/* Email Field with Icon */}
        <TextField
          name="username"
          onChange={handleInputChange}
          fullWidth
          placeholder="Username"
          variant="outlined"
          required
          autoComplete="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />

        {/* Password Field with Icon */}
        <TextField
          name='password'
          onChange={handleInputChange}
          fullWidth
          placeholder="Password"
          type="password"
          variant="outlined"
          required
          autoComplete="current-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />

        {/* Login Button */}
        <Button
          fullWidth
          onClick={handleLogin}
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 1 }}
        >
          Log In
        </Button>

        {/* Forgot Password */}
        <Box sx={{ mt: 2 }}>
            <Typography>Don't have an accout? &nbsp;
          <Link href="/Signup" variant="body2" underline="hover">
            Signup
          </Link> 
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
