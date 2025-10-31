import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {

  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return data;
};

export default useRepositories;