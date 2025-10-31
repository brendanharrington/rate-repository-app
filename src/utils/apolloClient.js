import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Constants from 'expo-constants';

const { uri } = Constants.expoConfig.extra;

const createApolloClient = () => {
  const link = new HttpLink({ uri });

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
