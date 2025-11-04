import { View, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client/react';

import ReviewList from './ReviewList';
import Text from './Text';

import { GET_REVIEWS_BY_ID } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const RepositoryView = () => {
  const { id } = useParams();

  const { data, loading, fetchMore } = useQuery(GET_REVIEWS_BY_ID, {
    variables: { repositoryId: id, first: 3 },
    fetchPolicy: 'cache-and-network',
  });

  const [loadingMore, setLoadingMore] = useState(false);
  const fetchingMoreRef = useRef(false);

  const handleFetchMore = async () => {
    const repository = data?.repository;
    const pageInfo = repository?.reviews?.pageInfo;
    if (!pageInfo?.hasNextPage || fetchingMoreRef.current) return;

    try {
      fetchingMoreRef.current = true;
      setLoadingMore(true);
      await fetchMore({
        variables: {
          repositoryId: id,
          after: pageInfo.endCursor,
          first: 3,
        },
      });
    } catch (e) {
      console.error('Failed to fetch more reviews', e);
    } finally {
      fetchingMoreRef.current = false;
      setLoadingMore(false);
    }
  };

  if (loading) return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );

  const repository = data?.repository;
  const reviewsConnection = repository?.reviews;

  return (
    <View testID='repositoryView' style={styles.container}>
      <ReviewList reviews={reviewsConnection} repository={repository} onEndReach={handleFetchMore} loadingMore={loadingMore} />
    </View>
  );
};

export default RepositoryView;