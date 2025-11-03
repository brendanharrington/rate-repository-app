import { View, Image, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  userRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  avatar: {
    borderRadius: 6,
    height: 50,
    width: 50,
  },
  userText: {
    flex: 1,
    gap: 6,
  },
  fullName: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body,
  },
  language: {
    color: theme.colors.appBarText,
    backgroundColor: theme.colors.primary,
    fontSize: theme.fontSizes.body,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 12,
  },
  statContainer: {
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
    fontSize: theme.fontSizes.body,
  },
});

const formatStat = (num) => (num < 1000 ? num : (num / 1000).toFixed(1) + 'k');

const RepositoryInfo = ({ item }) => {
  return (
    <View>
      <View style={styles.userRow}>
        <View>
          <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
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

export default RepositoryInfo;