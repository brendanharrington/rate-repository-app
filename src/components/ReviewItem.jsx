import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    gap: 10,
  },
  rating: {
    height: 60,
    width: 60,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 30,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: theme.fonts,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
  },
  review: {
    flex: 1,
    flexDirection: 'column',
  },
  username: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    flexShrink: 1,
  },
  date: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.normal,
    color: theme.colors.textSecondary,
    marginBottom: 6,
  },
  ratingContainer: {
    height: 60,
    width: 60,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 20,
    fontFamily: theme.fonts,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
  },
  text: {
    fontSize: theme.fontSizes.body,
    marginTop: 6,
    flexShrink: 1,
  }
});

const formatDate = date => {
  if (!date) return '';
  return format(new Date(date), 'dd.MM.yyy');
};

const ReviewItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>

      <View style={styles.review}>
        <Text style={styles.username} numberOfLines={1} ellipsizeMode='tail'>{item.user.username}</Text>
        <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
        <Text style={styles.text} numberOfLines={3} ellipsizeMode='tail'>{item.text}</Text>
      </View>

    </View>
  );
};

export default ReviewItem;