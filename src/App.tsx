import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Route, RouteProps, Switch, Redirect,
} from 'react-router-dom';
import _logo from './logo.svg';
import Login from './components/Login';
import './App.css';
import { ProvideAuth, useAuth } from './useAuth';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({
  children,
  // isLoggedIn,
  ...routeOptions
}: PrivateRouteProps) {
  const auth = useAuth();
  return (
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

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const history = useHistory();

  // function logout() {
  //   localStorage.removeItem('accessToken');
  //   setIsLoggedIn(false);
  //   history.push('/');
  // }

  return (
    <>
      <CssBaseline />
      <div className="App">
        <ProvideAuth>
          <Switch>
            <PrivateRoute path="/protected">
              <p> Yoo we logged in</p>
            </PrivateRoute>
            <Route path="/sign-in">
              <Login />
              {/* <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> */}
            </Route>
            <Route path="/">
              <p>Main path</p>
            </Route>
          </Switch>

        </ProvideAuth>
      </div>
    </>
  );
}

export default App;
