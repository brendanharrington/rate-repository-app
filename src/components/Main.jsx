import { Text, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

const Main = () => {
  return (
    <View>
      <AppBar />
      <Text>Rate Repository Application</Text>
      <RepositoryList />
    </View>
  );
};

export default Main;