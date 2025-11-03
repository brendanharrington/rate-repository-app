import { View, StyleSheet } from 'react-native';
import { useLocation } from 'react-router-native';
import { useQuery } from '@apollo/client/react';

import ReviewList from './ReviewList';

import { GET_REVIEWS } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const RepositoryView = () => {
  const location = useLocation();
  const { item } = location.state;
  const { id } = item;

  const { data, loading } = useQuery(GET_REVIEWS, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return 'Loading...';

  const { reviews } = data.repository;

  return (
    <View testID='repositoryView' style={styles.container}>
      <ReviewList reviews={reviews} repository={item} />
    </View>
  );
};

export default RepositoryView;