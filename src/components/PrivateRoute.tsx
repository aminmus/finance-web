import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../useAuth';

/**
 * A wrapper for <Route> that redirects to the sign in
 * screen if you're not yet authenticated.
 */
function PrivateRoute({
  children,
  // isLoggedIn,
  ...routeOptions
}: PrivateRouteProps) {
  const auth = useAuth();
  console.log('auth: ', auth);
  return (auth && auth.isLoading) ? <p>loading</p> : (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...routeOptions}
      render={({ location }) => (auth?.user ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/sign-in',
            state: { from: location },
          }}
        />
      ))}
    />
  );
}

type PrivateRouteProps = {
  children: React.ReactNode;
  // isLoggedIn: boolean;
  path: string;
  routeOptions?: RouteProps;
};

PrivateRoute.defaultProps = {
  routeOptions: {},
};

export default PrivateRoute;
