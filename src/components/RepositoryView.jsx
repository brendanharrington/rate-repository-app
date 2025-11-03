import { View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client/react';

import ReviewList from './ReviewList';

import { GET_REVIEWS_BY_ID } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const RepositoryView = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(GET_REVIEWS_BY_ID, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return 'Loading...';

  const repository = data?.repository;
  const reviews = repository?.reviews?.edges?.map(edge => edge.node) ?? [];

  return (
    <View testID='repositoryView' style={styles.container}>
      <ReviewList reviews={reviews} repository={repository} />
    </View>
  );
};

export default RepositoryView;