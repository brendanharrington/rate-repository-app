import { View, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@apollo/client/react';

import theme from '../theme';
import { ME } from '../graphql/queries';
import UserReview from './UserReview';

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

const UserReviews = () => {
  const userQuery = useQuery(ME, {
    variables: {
      includeReviews: true
    },
    fetchPolicy: 'cache-and-network',
  });
  const currentUser = userQuery?.data?.me;
  const reviewNodes = currentUser?.reviews?.edges?.map(edge => edge.node) ?? [];
  
  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <UserReview {...{ item }} />}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default UserReviews;