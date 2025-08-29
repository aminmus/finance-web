import React, { SyntheticEvent, useState } from 'react';
import { TextField, Button, Box } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../contexts/useAuth';

const useStyles = makeStyles((theme) => ({
  flexbox: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}));

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const { from } = location.state as LocationState || { from: { pathname: '/' } };

  const classes = useStyles();

  async function submitSignIn(event: SyntheticEvent) {
    event.preventDefault();
    try {
      await auth?.signIn(email, password);
      history.replace(from);
    } catch (err) {
      console.error('error caught in submitSignIn: ', err);
    }
  }

  return (
    <form onSubmit={submitSignIn}>
      <Box display="flex" className={classes.flexbox}>
        <>
          <TextField
            required
            id="email"
            label="email"
            name="email"
            type="email"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            id="password"
            label="password"
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Sign in</Button>
          <Link to="/sign-up">Need an account? Sign up</Link>
        </>
      </Box>
    </form>
  );
}

type LocationState = {
  from: Location;
};

export default SignIn;
