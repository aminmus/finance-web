import React, { SyntheticEvent, useState } from 'react';
import { TextField, Button } from '@material-ui/core';

function Authentication(_props: {}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function submitLogin(event: SyntheticEvent) {
    event.preventDefault();
  }

  return (
    <form onSubmit={submitLogin}>
      <TextField
        required
        id="email"
        label="email"
        name="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        required
        id="password"
        label="password"
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">
        Sign in
      </Button>
    </form>
  );
}

export default Authentication;
