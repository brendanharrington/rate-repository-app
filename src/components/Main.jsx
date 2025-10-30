import { View, StyleSheet } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    height: '100%',
    padding: 10,
  },
});

const Main = () => {
  return (
    <View>
      <AppBar />
      <View style={styles.container}>
        <RepositoryList />
      </View>
    </View>
  );
};

export default Main;