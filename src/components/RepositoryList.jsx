import { FlatList, View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

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
    fontSize: theme.fontSizes.body,
  },
  searchbar: {
    backgroundColor: 'white',
    marginBottom: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
  // props passed from parent
  const { choice, onChoiceChange, filter = '', onFilterChange = () => {} } = this.props;

    return (
      <View>
        <Searchbar
          style={styles.searchbar}
          placeholder='Search'
          onChangeText={(value) => onFilterChange(value)}
          value={filter}
        />
        <Picker
          style={styles.picker}
          selectedValue={choice}
          onValueChange={(itemValue) => onChoiceChange(itemValue)}
        >
          <Picker.Item label='Latest repositories' value='latest' />
          <Picker.Item label='Highest rated repositories' value='highest' />
          <Picker.Item label='Lowest rated repositories' value='lowest' />
        </Picker>
      </View>
    );
  };

  render() {
    const { repositories, filter, debouncedFilter } = this.props;
    const repositoryNodes = repositories?.edges?.map(edge => edge.node) ?? [];

    // Use the debouncedFilter for list filtering (so the UI is responsive while avoiding frequent re-renders)
    const activeFilter = (debouncedFilter !== undefined) ? debouncedFilter : (filter || '');

    const filteredNodes = activeFilter
      ? repositoryNodes.filter(node => (
          (node.fullName || '').toLowerCase().includes(activeFilter.toLowerCase()) ||
          (node.description || '').toLowerCase().includes(activeFilter.toLowerCase())
        ))
      : repositoryNodes;

    return (
      <FlatList
        data={filteredNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem {...{ item }} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }

}

const RepositoryList = () => {
  const [choice, setChoice] = useState('latest');
  const [filter, setFilter] = useState('');
  const [debouncedFilter] = useDebounce(filter, 500);

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

  const { repositories, fetchMore } = useRepositories({
    ...vars,
    first: 3,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      choice={choice}
      onChoiceChange={setChoice}
      filter={filter}
      onFilterChange={setFilter}
      debouncedFilter={debouncedFilter}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;