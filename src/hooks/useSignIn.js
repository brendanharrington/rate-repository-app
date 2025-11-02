import { useMutation } from '@apollo/client/react';
import { useApolloClient } from '@apollo/client/react';

import { AUTHENTICATE_USER } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE_USER);

  const signIn = async ({ username, password }) => {
    const response = await mutate({ variables: {
        credentials: { username, password },
      },
    });

    await authStorage.setAccessToken(response.data.authenticate.accessToken);
    apolloClient.resetStore();

    return response;
  };

  return [signIn, result];
};

export default useSignIn;