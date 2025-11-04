import { View, StyleSheet, Pressable, Platform, Alert } from 'react-native';
import { format } from 'date-fns';

import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client/react';
import { DELETE_REVIEW } from '../graphql/mutations';
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    gap: 10,
  },
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  rating: {
    // legacy: keep visual text styles if used standalone
    fontSize: 20,
    fontFamily: theme.fonts,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
  },
  ratingContainer: {
    height: 60,
    width: 60,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  ratingText: {
    fontSize: 20,
    fontFamily: theme.fonts,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
  },
  review: {
    flexDirection: 'column',
    flex: 1,
  },
  name: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    flexShrink: 1,
  },
  date: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.normal,
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  text: {
    fontSize: theme.fontSizes.body,
    flexShrink: 1,
  },
  buttons: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  pressable: {
    flex: 1,
  },
  viewButton: {
    textAlign: 'center',
    color: theme.colors.appBarText,
    backgroundColor: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    borderRadius: 5,
    paddingVertical: 10,
    flex: 1,
  },
  deleteButton: {
    textAlign: 'center',
    color: theme.colors.appBarText,
    backgroundColor: 'rgb(212, 52, 52)',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    borderRadius: 5,
    paddingVertical: 10,
    flex: 1,
  },
});

const formatDate = date => {
  if (!date) return '';
  return format(new Date(date), 'dd.MM.yyyy');
};

const UserReview = ({ item }) => {
  const navigate = useNavigate();
  const [mutate, { loading: deleting }] = useMutation(DELETE_REVIEW);

  const handleDelete = async () => {
    try {
      const response = await mutate({
        variables: {
          deleteReviewId: item.id,
        },
        // refetch the current user so the reviews list updates
        refetchQueries: [{ query: ME, variables: { includeReviews: true } }],
        awaitRefetchQueries: true,
      });

      return response;
    } catch (e) {
      console.error('Failed to delete review', e);
      throw e;
    }
  };

  const handleAlert = () => {
    switch (Platform.OS) {
      case 'ios':
      case 'android':
        Alert.alert(
          'Delete review?',
          `Are you sure you want to delete the review for the following repository:\n\n ${item.repository.fullName}`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            { text: 'OK', onPress: async () => handleDelete() },
          ]
        );
        break;

      default:
        if (typeof window !== 'undefined' && window.confirm('Are you sure you want to delete this review?') ) {
          console.log('deleting on web');
          handleDelete();
        }
        break;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>

        <View style={styles.review}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{item.repository.fullName}</Text>
          <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
          <Text style={styles.text} numberOfLines={3} ellipsizeMode='tail'>{item.text}</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <Pressable style={styles.pressable} onPress={() => navigate(`/${item.repository.id}`)}>
          <Text style={styles.viewButton}>View repository</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={() => handleAlert()} disabled={deleting}>
          <Text style={styles.deleteButton}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UserReview;