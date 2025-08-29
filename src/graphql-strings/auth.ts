import { gql } from '@apollo/client';

export const SIGN_IN = gql`
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

export const MY_USER = gql`
query myUser {
    myUser {
      id
      email
      name
    }
  }
`;

export const SIGN_UP = gql`
mutation createOneUser($data: UserCreateInput!) {
  createOneUser(data: $data) {
    id
    email
    name
  }
}
`;
