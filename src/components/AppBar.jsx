import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    paddingBottom: 20,
    paddingLeft: 10,
    backgroundColor: theme.colors.appBar,
    color: theme.colors.appBarText,
    width: '100vw',
    flexDirection: 'row',
    columnGap: 20
  },
  text: {
    color: theme.colors.appBarText,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.text}>Repositories</Text>
      </Pressable>

      <Pressable>
        <Text style={styles.text}>Second Tab</Text>
      </Pressable>
    </View>
  )
};

export default AppBar;