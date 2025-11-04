import { View, StyleSheet, FlatList, Linking, Pressable } from 'react-native';

import Text from './Text';
import ReviewItem from './ReviewItem';
import RepositoryInfo from './RepositoryInfo';

import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  button: {
    textAlign: 'center',
    color: theme.colors.appBarText,
    backgroundColor: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 12,
  },
  headerContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flex: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewList = ({ reviews, repository, onEndReach, loadingMore }) => {
  // Accept either the GraphQL connection shape { edges: [...] } or
  // an already-mapped array of review nodes for flexibility.
  const reviewNodes = Array.isArray(reviews)
    ? reviews
    : reviews && reviews.edges
      ? reviews.edges.map(edge => edge.node)
      : [];

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <RepositoryInfo item={repository} />
      <Pressable onPress={() => repository?.url && Linking.openURL(repository.url)}>
        <Text style={styles.button}>Open in GitHub</Text>
      </Pressable>
    </View>
  );
  
  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem {...{ item }} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={renderHeader}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loadingMore ? <Text>Loading more...</Text> : null}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ReviewList;