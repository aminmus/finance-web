import React, {
  useState, useContext, createContext,
} from 'react';
import { useMutation, gql } from '@apollo/client';

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

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [authenticate, { data, loading, error }] = useMutation(SIGN_IN);

  // Wrap any auth methods we want to use making sure ...
  // ... to save the user to state.
  const signIn = async (email: string, password: string) => {
    try {
      const response = await authenticate({ variables: { email, password } });
      setUser(response.data.login.user);
      localStorage.setItem('accessToken', response.data.login.token);
      return response.data.login.user;
    } catch (err) {
      console.error('error caught in submitLogin: ', err);
      throw err;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
  };

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
    signOut,
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
}
