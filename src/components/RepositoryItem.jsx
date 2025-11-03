// ./src/components/RepositoryItem.jsx

import { View, Image, StyleSheet, Pressable, ScrollView, Linking } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  avatar: {
    borderRadius: 6,
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
});

const formatStat = (num) => (num < 1000 ? num : (num / 1000).toFixed(1) + 'k');

const RepositoryItem = ({ item: propItem }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { repositories, loading } = useRepositories();

  // If there’s a route param, this component acts as the detail view
  const item =
    id && repositories
      ? repositories.edges.map((edge) => edge.node).find((r) => r.id === id)
      : propItem;

  // Handle loading and missing repository
  if (loading) return null;
  if (!item) return null;

  const stats = [
    { label: 'Stars', value: item.stargazersCount },
    { label: 'Forks', value: item.forksCount },
    { label: 'Reviews', value: item.reviewCount },
    { label: 'Rating', value: item.ratingAverage },
  ];

  const openInGitHub = () => {
    const url = item.url || `https://github.com/${item.fullName}`;
    Linking.openURL(url).catch((e) => console.log('Failed to open URL', e));
  };

  const isDetailView = !!id;

  const content = (
    <View testID='repositoryItem' style={[styles.container, isDetailView && { marginBottom: 20 }]}>
      <View style={styles.userRow}>
        <Image
          source={{ uri: item.ownerAvatarUrl }}
          style={[styles.avatar, { width: isDetailView ? 80 : 50, height: isDetailView ? 80 : 50 }]}
        />
        <View style={styles.userText}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          {item.language && <Text style={styles.language}>{item.language}</Text>}
        </View>
      </View>

      <View style={styles.statsRow}>
        {stats.map(({ label, value }) => (
          <View key={label} style={styles.statContainer}>
            <Text style={styles.stat}>{formatStat(value)}</Text>
            <Text style={styles.statTitle}>{label}</Text>
          </View>
        ))}
      </View>

      {isDetailView && (
        <Pressable onPress={openInGitHub}>
          <Text style={styles.button}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );

  // If this is a detail view, wrap in ScrollView
  if (isDetailView) return <ScrollView>{content}</ScrollView>;

  // Otherwise, it’s part of the list
  return <Pressable onPress={() => navigate(`/${item.id}`)}>{content}</Pressable>;
};

export default RepositoryItem;
