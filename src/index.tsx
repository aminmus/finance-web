import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';

import './index.css';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_req, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('accessToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
