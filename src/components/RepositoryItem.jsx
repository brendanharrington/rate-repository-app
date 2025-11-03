import { StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import RepositoryInfo from './RepositoryInfo';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

const RepositoryItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Pressable 
      onPress={() => navigate(`/${item.id}`, {state: { item }})}
      testID='repositoryItem'
      style={styles.container}
    >
      <RepositoryInfo {...{ item }} />
    </Pressable>
  );
};

export default RepositoryItem;
