import { Box, TextField, Container, Typography, Button, Paper, InputAdornment, Link } from '@mui/material';
import { Email, Lock, AccountCircle } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from '../../store/slice/user/user.thunk';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector((state)=> state.userReducer)

    const [signupData, setSignupData] = useState({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: ""
    })

    useEffect(() => {
      if(isAuthenticated) navigate('/')
    }, [isAuthenticated])


  const handleInputChange = (e) => {
    setSignupData ((prev) =>({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  const handleSignup = async () => {
    if(signupData.password !== signupData.confirmPassword){
      return toast.error("Confirm Password do not match")
    }
    const response = await dispatch(registerUserThunk(signupData))
    if(response?.payload?.success){
      navigate("/");
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
          Please Signup In
        </Typography>

        <TextField
          name= "fullName"
          onChange={handleInputChange}
          fullWidth
          placeholder="Full Name"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />

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

        {/* Password Field with Icon */}
        <TextField
          name='confirmPassword'
          onChange={handleInputChange}
          fullWidth
          placeholder="Confirm Password"
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

        <Box
          display="flex"
          alignItems="center"
          gap={2}
          sx={{
            border: '1px solid #c4c4c4',
            borderRadius: '4px',
            padding: '10.5px 14px',
            width: '100%',
          }}
        >
          
          <FormLabel id="gender-label" sx={{ fontWeight: 550, mr: 2 }}>
            Gender
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="gender-label"
            name="gender"
            onChange={handleInputChange}
          >
            <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
            <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
          </RadioGroup>
        </Box>

        {/* Login Button */}
        <Button
          fullWidth
          onClick={handleSignup}
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 1 }}
        >
          Sign Up
        </Button>

        {/* Forgot Password */}
        <Box sx={{ mt: 2 }}>
            <Typography>Already have an account? &nbsp;
          <Link href="/Login" variant="body2" underline="hover">
            Log In
          </Link> 
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
