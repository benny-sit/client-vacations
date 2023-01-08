import React, { useState, useEffect} from 'react'
import { AuthAxios } from '../services/api'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {selectCurrentToken, setCredentials} from '../features/auth/authSlice'
import { Box, CircularProgress, Link as LinkMui} from '@mui/material' 
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { Link, useNavigate } from 'react-router-dom'


const initialState = {value: '', isError: false}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [username, setUsername] = useState(initialState);
  const [password, setPassword] = useState(initialState);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  

  function handleSubmit(e: any) {
    e.preventDefault();

    if(username.value === '' || password.value === '') {
      if (username.value === '') {
        setUsername(prev => { return {...prev, isError: true}; });
      }
      if (password.value === '') {
        setPassword(prev => { return {...prev, isError: true};});
      }
      return
    }
    setIsLoading(true);
    setUsername(prev => { return {...prev, isError: false}; });
    setPassword(prev => { return {...prev, isError: false};});


    AuthAxios.post('users/login', { username: username.value, password: password.value })
     .then((response) => {
        // set up the data  
        dispatch(setCredentials(response.data));
        setError('');
        navigate('/dash', {replace: true});
     })
     .catch((error) => {
      setError(error.response.data.error);
     })
     .finally(() => {
      setIsLoading(false);
     })
  }

  return (
    <Box  
      sx={{
        display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    minWidth: '250px',
    backgroundColor: '#F6FBF1'
      }}
    > 
      <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '375px',
            mx: 2,
          }}
        >
            <img src='/vacationsLogo.png' width={64}/>
          <Typography component="h1" variant="h5" sx={{
            marginTop: 2
          }}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username.value}
              onChange={(e) => setUsername({...username, value: e.target.value})}
              error={username.isError}
              helperText={username.isError && "required"}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password.value}
              onChange={(e) => setPassword({...password, value: e.target.value})}
              error={password.isError}
              helperText={password.isError && "required"}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Box sx={{color: 'red'}}>
              {error !== '' && error}
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress /> : "Sign in"}
            </Button>
            <Grid container>
              <Grid item xs>
                <LinkMui variant="body2">
                  Forgot password?
                </LinkMui>
              </Grid>
              <Grid item>
                <LinkMui variant="body2">
                  <Link to='/register'>
                  {"Don't have an account? Sign Up"}
                  </Link>
                </LinkMui>
              </Grid>
            </Grid>
          </Box>
        </Box>
    </Box>
  )
}

export default Login