import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import _logo from './logo.svg';
import Authentication from './components/authentication';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <Authentication />

        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit
            {' '}
            <code>src/App.tsx</code>
            {' '}
            and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    </>
  );
}

export default App;
