import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables = {}) => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  // Return a stable shape: { loading, error, repositories }
  return {
    loading,
    error,
    repositories: data?.repositories,
  };
};

export default useRepositories;