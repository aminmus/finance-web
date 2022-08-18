import React from 'react';
import { Box } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './components/SignIn';
import PortfoliosView from './components/PortfoliosView';
import { ProvideAuth } from './useAuth';
import { ProvidePortfolios } from './usePortfolios';
import PortfolioView from './components/PortfolioView';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const history = useHistory();

  // function logout() {
  //   localStorage.removeItem('accessToken');
  //   setIsLoggedIn(false);
  //   history.push('/');
  // }

  return (
    <div className="App">
      <ProvideAuth>
        <Layout>
          <Switch>
            <PrivateRoute path="/portfolios/:portfolioId">
              <ProvidePortfolios>
                <PortfolioView />
              </ProvidePortfolios>
            </PrivateRoute>
            <PrivateRoute routeOptions={{ exact: true }} path="/portfolios">
              <ProvidePortfolios>
                <PortfoliosView />
              </ProvidePortfolios>
            </PrivateRoute>
            <PrivateRoute path="/protected">
              <p> Yoo we logged in</p>
            </PrivateRoute>
            <Route path="/sign-in">
              <SignIn />
              {/* <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> */}
            </Route>
            <Route path="/">
              <Box display="flex">
                <p>Main path</p>
              </Box>
            </Route>
          </Switch>
        </Layout>
      </ProvideAuth>
    </div>
  );
}

export default App;
