import { View, Image, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 5
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'top',
    gap: 20,
    marginBottom: 10,
  },
  userText: {
    flexDirection: 'column',
    gap: 10,
  },
  fullName: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.normal,
  },
  language: {
    color: theme.colors.appBarText,
    fontSize: theme.fontSizes.normal,
    fontWeight: theme.fontWeights.normal,
    backgroundColor: theme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignSelf: 'flex-start', // prevent stretching to full width
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  statContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 5,
  },
  stat: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  statTitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.normal,
  }
})

const RepositoryItem = ({ item }) => {
  const formatStat = stat => {
    if (stat < 1000) return stat;

    return (stat / 1000).toFixed(1).toString() + 'k';
  };

  return (
    <View style={styles.container}>
      <View style={styles.userRow}>
        <View>
          <Image source={item.ownerAvatarUrl} style={styles.avatar} />
        </View>
        <View style={styles.userText}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>


      <View style={styles.statsRow}>
        <View style={styles.statContainer}>
          <Text style={styles.stat}>{formatStat(item.stargazersCount)}</Text>
          <Text style={styles.statTitle}>Stars</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.stat}>{formatStat(item.forksCount)}</Text>
          <Text style={styles.statTitle}>Forks</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.stat}>{item.reviewCount}</Text>
          <Text style={styles.statTitle}>Reviews</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.stat}>{item.ratingAverage}</Text>
          <Text style={styles.statTitle}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;