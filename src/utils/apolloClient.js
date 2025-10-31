import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const createApolloClient = () => {
  const link = new HttpLink({
    uri: 'http://192.168.4.206:4000/graphql',
  });

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
