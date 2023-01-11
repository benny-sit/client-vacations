import { Alert, Box, Button, Checkbox, CircularProgress, FormControlLabel, Grid, LinearProgress, Link as LinkMui , TextField, Typography } from '@mui/material'
import { KeyObject } from 'crypto'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { setCredentials } from '../features/auth/authSlice'
import { AuthAxios } from '../services/api'

const valuesInitial = {
  username: '',
  password: '',
  confPassword: '',
  email: '',
  firstName: '',
  lastName: '',
}


let validInitial = {
  username: {
    helperText: 'at least 6 characters long, Only numbers and letters are allowed',
    isError: false,
  },
  password: {
    helperText: 'at least 8 characters long, at least one character and one number',
    isError: false,
  },
  confPassword: {
    helperText: 'Passwords do not match',
    isError: false,
  },
  email: {
    helperText: 'Not a valid email address',
    isError: false,
  },
  firstName: {
    helperText: 'at least 2 characters',
    isError: false,
  },
  lastName: {
    helperText: 'at least 2 characters',
    isError: false,
  },
}

export default function Register() {
  const [formValues, setFormValues] = useState(valuesInitial);
  const [validState, setValidState] = useState(validInitial);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function validateForm() {
    let valid = true;
    let validCopy = {...validInitial} as any;

    const validate = {
      username: /^([a-zA-Z0-9]{6,})$/.test(formValues.username),
      password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(formValues.password),
      confPassword: formValues.confPassword === formValues.password ,
      email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(formValues.email),
      firstName: /^([a-zA-Z]{2,})$/.test(formValues.firstName),
      lastName: /^([a-zA-Z]{2,})$/.test(formValues.lastName),
    } as any;

    for(let key in validCopy) {
      validCopy[key].isError = !validate[key];
      valid = valid && validate[key];
    }

    setValidState(validCopy);

    return valid
  }
 
  function handleSubmit(e: any) {
    e.preventDefault();
    const valid = validateForm();
    if (!valid) return;
    setLoading(true);

    AuthAxios.post('/users/register', {
      username: formValues.username,
      password: formValues.password,
      userDetails: {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email
      }
    })
    .then((res) => {
      dispatch(setCredentials(res.data))
      setError('');
      navigate('/dash', { replace: true });
    })
    .catch((err) => {
        setError(err.response.data.error)
    })
    .finally(() => {
      setLoading(false);
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
    backgroundColor: '#F6FBF1',
      }}
    > 
      <Box
          sx={{
            mt: 2,
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%'}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFormValues({...formValues, firstName: e.target.value})}
                  error={validState.firstName.isError}
                  helperText={validState.firstName.isError && validState.firstName.helperText}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setFormValues({...formValues, lastName: e.target.value})}
                  error={validState.lastName.isError}
                  helperText={validState.lastName.isError && validState.lastName.helperText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={(e) => setFormValues({...formValues, username: e.target.value})}
                  error={validState.username.isError}
                  helperText={validState.username.isError && validState.username.helperText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setFormValues({...formValues, email: e.target.value})}
                  error={validState.email.isError}
                  helperText={validState.email.isError && validState.email.helperText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setFormValues({...formValues, password: e.target.value})}
                  error={validState.password.isError}
                  helperText={validState.password.isError && validState.password.helperText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confPassword"
                  label="Confirm Password"
                  type="password"
                  id="confPassword"
                  onChange={(e) => setFormValues({...formValues, confPassword: e.target.value})}
                  error={validState.confPassword.isError}
                  helperText={validState.confPassword.isError && validState.confPassword.helperText}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            { error != '' && 
            <Alert severity='error' sx={{
              mt: 1
            }}>
               {error}
            </Alert>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress /> :"Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <LinkMui variant="body2">
                  <Link to='/'>
                  Already have an account? Sign in
                  </Link>
                </LinkMui>
              </Grid>
            </Grid>
          </Box>
        </Box>
    </Box>
  )
}
