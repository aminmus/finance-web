import React, { SyntheticEvent, useState } from 'react';
import { TextField, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../graphql-strings/auth';
import { useAuth } from '../contexts/useAuth';

const useStyles = makeStyles((theme) => ({
  flexbox: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}));

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUp] = useMutation(SIGN_UP);
  const history = useHistory();
  const auth = useAuth();
  const classes = useStyles();

  const submitSignUp = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await signUp({ variables: { data: { name, email, password } } });
      await auth?.signIn(email, password);
      history.replace('/');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error caught in submitSignUp: ', err);
    }
  };

  return (
    <form onSubmit={submitSignUp}>
      <Box display="flex" className={classes.flexbox}>
        <>
          <TextField
            required
            id="name"
            label="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
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
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Sign up</Button>
        </>
      </Box>
    </form>
  );
}

export default SignUp;
