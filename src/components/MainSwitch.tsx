import { Box, Button } from '@material-ui/core';
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { useAuth } from '../useAuth';
import { ProvidePortfolios } from '../usePortfolios';
import PortfoliosView from './PortfoliosView';
import PortfolioView from './PortfolioView';
import PrivateRoute from './PrivateRoute';
import SignIn from './SignIn';

function MainSwitch() {
  const auth = useAuth();

  const isLoggedIn = auth?.user ?? false;

  return (
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
          {isLoggedIn
            ? (
              <Button onClick={(_e) => auth?.signOut()}>
                Sign Out
              </Button>
            ) : (
              <Link to="/sign-in">
                Go to Sign In
              </Link>
            )}
        </Box>
      </Route>
    </Switch>
  );
}

export default MainSwitch;
