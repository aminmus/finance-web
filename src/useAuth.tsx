import React, {
  useState, useContext, createContext, useEffect,
} from 'react';
import {
  useMutation, gql, useLazyQuery,
} from '@apollo/client';

const authContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(authContext);

type ProvideAuthProps = {
  children: React.ReactNode;
};

const SIGN_IN = gql`
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

const MY_USER = gql`
query {
    myUser {
      id
      email
      name
    }
  }
`;

// TODO: Fix so that user auth updates if detecting good auth token without redirecting
// (PrivateRoute redirects to sign in)

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authenticate, {
    data, loading, error, called,
  }] = useMutation(SIGN_IN);
  // const [useMyUser, myUser] = useQuery(MY_USER);
  const [getMyUser, myUserResponse] = useLazyQuery(MY_USER, {
    onCompleted: (resData) => {
      console.log('onCompleted getMyUser: ', resData);
      setUser(resData.myUser);
    },
  });

  useEffect(() => {
    if ((called && loading) || (myUserResponse.called && myUserResponse.loading)) {
      setIsLoading(true);
    } else if ((called && !loading) || (myUserResponse.called && !loading)) {
      setIsLoading(false);
    }
  }, [loading, myUserResponse.loading, called, myUserResponse.called]);

  useEffect(() => {
    // setIsLoading(true);
    if (localStorage.getItem('accessToken')) {
      getMyUser();
    }
  }, []);

  // useEffect(() => {
  //   console.log('useMyUser response: ', myUserResponse);
  //   if (myUserResponse.error) console.error(myUserResponse.error);
  //   if (myUserResponse.data) setUser(myUserResponse.data);
  //   setIsLoading(myUserResponse.loading);
  // }, [myUserResponse.loading, myUserResponse.data]);

  useEffect(() => {
    console.log('user update: ', user);
  }, [user]);

  // Wrap any auth methods we want to use making sure ...
  // ... to save the user to state.
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authenticate({ variables: { email, password } });
      setUser(response.data.login.user);
      localStorage.setItem('accessToken', response.data.login.token);
      console.log('set user');
      return response.data.login.user;
    } catch (err) {
      console.error('error caught in submitSignIn: ', err);
      throw err;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
  };

  // const checkAuth = () => {
  //   if (user) {
  //     return true;
  //     // getMyUser();
  //   }

  //   // if (myUserResponse.called && !myUserResponse.loading) {
  //   //   return false;
  //   // }
  //   getMyUser();

  //   // return false;
  // };

  // const signup = (email, password) => firebase
  //   .auth()
  //   .createUserWithEmailAndPassword(email, password)
  //   .then((response) => {
  //     setUser(response.user);
  //     return response.user;
  //   });
  // const sendPasswordResetEmail = (email) => firebase
  //   .auth()
  //   .sendPasswordResetEmail(email)
  //   .then(() => true);

  // const confirmPasswordReset = (code, password) => firebase
  //   .auth()
  //   .confirmPasswordReset(code, password)
  //   .then(() => true);

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  /*
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
*/

  // Return the user object and auth methods
  return {
    user,
    signIn,
    // isLoading: loading,
    signOut,
    isLoading,
    // signUp,
    // sendPasswordResetEmail,
    // confirmPasswordReset,
  };
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }: ProvideAuthProps) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

interface AuthContextType {
  user: object | null;
  signIn: Function;
  signOut: Function;
  isLoading: Boolean;
}
