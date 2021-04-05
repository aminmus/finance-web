import React, { SyntheticEvent, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../useAuth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const { from } = location.state as LocationState || { from: { pathname: '/' } };

  async function submitLogin(event: SyntheticEvent) {
    event.preventDefault();
    try {
      await auth?.signIn(email, password);
      history.replace(from);
    } catch (err) {
      console.error('error caught in submitLogin: ', err);
    }
  }

  return (
    <form onSubmit={submitLogin}>
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
    </form>
  );
}

type LocationState = {
  from: Location;
};

export default Login;
