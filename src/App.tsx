import React from 'react';
import './App.css';
import Layout from './components/Layout';
import { ProvideAuth } from './useAuth';
import MainSwitch from './components/MainSwitch';

function App() {
  return (
    <div className="App">
      <ProvideAuth>
        <Layout>
          <MainSwitch />
        </Layout>
      </ProvideAuth>
    </div>
  );
}

export default App;
