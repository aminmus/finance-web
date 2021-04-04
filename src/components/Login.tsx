import React, { SyntheticEvent, useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useQuery, useMutation, gql } from '@apollo/client';

const LOG_IN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

function Login(_props: {}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation(LOG_IN);

  useEffect(() => {
    console.log('data: ', data);
    localStorage.setItem('accessToken', data?.login?.token);
    setIsLoggedIn(true);
  }, [data]);
  useEffect(() => {
    console.log('loading: ', loading);
  }, [loading]);
  useEffect(() => {
    console.error('error: ', error);
  }, [error]);

  async function submitLogin(event: SyntheticEvent) {
    event.preventDefault();
    try {
      await login({ variables: { email, password } });
    } catch (err) {
      console.error('error caught in submitLogin: ', err);
    }
  }

  function logout() {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  }

  return isLoggedIn ? (
    <>
      <h1>logged in</h1>
      <button onClick={logout} type="button">
        Logout
      </button>
    </>
  ) : (
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

export default Login;
