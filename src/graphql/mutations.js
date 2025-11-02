import { gql } from '@apollo/client';

export const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;
