import { View, StyleSheet, Pressable, Linking } from 'react-native';
import { useLocation } from 'react-router-native';

import Text from './Text';
import RepositoryInfo from './RepositoryInfo';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
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

const RepositoryView = () => {
  const location = useLocation();
  const { item } = location.state;
  const { url } = item;
  console.log(item)

  return (
    <View testID='repositoryView'>

      <View style={styles.container}>
        <RepositoryInfo {...{ item }} />
        <Pressable onPress={() => Linking.openURL(url)}>
          <Text style={styles.button}>Open in GitHub</Text>
        </Pressable>
      </View>

      <View style={styles.container}>
        <RepositoryInfo {...{ item }} />
        <Pressable onPress={() => Linking.openURL(url)}>
          <Text style={styles.button}>Open in GitHub</Text>
        </Pressable>
      </View>

    </View>
  );
};

export default RepositoryView;