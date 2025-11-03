import { FlatList, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import {Picker} from '@react-native-picker/picker';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    marginBottom: 10,
    padding: 10,
    fontFamily: theme.fonts,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, choice, onChoiceChange }) => {
  const repositoryNodes = repositories?.edges?.map(edge => edge.node) ?? [];

  const renderHeader = () => (
    <Picker 
      style={styles.picker}
      selectedValue={choice}
      onValueChange={(itemValue) => onChoiceChange(itemValue)}
    >
      <Picker.Item label='Latest repositories' value='latest' />
      <Picker.Item label='Highest rated repositories' value='highest' />
      <Picker.Item label='Lowest rated repositories' value='lowest' />
    </Picker>
  )
  
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem {...{ item }} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={renderHeader}
      showsVerticalScrollIndicator={false}
    />
  );
}

const RepositoryList = () => {
  const [choice, setChoice] = useState('latest');

  const vars = (() => {
    switch (choice) {
      case 'latest':
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
      case 'lowest':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      case 'highest':
      default:
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
    }
  })();

  const { repositories } = useRepositories(vars);

  return (
    <RepositoryListContainer
      repositories={repositories}
      choice={choice}
      onChoiceChange={setChoice}
    />
  );
};

export default RepositoryList;