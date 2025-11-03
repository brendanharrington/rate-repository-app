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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: theme.fonts,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
  },
  review: {
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  date: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.normal,
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  text: {
    fontSize: theme.fontSizes.body,
  }
});

const formatDate = date => {
  if (!date) return '';
  return format(new Date(date), 'dd.MM.yyy');
};

const UserReview = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.rating}>
        {item.rating}
      </Text>

      <View style={styles.review}>
        <Text style={styles.name}>{item.repository.fullName}</Text>
        <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>

    </View>
  );
};

export default UserReview;