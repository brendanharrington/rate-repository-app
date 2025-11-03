import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';

import useAuthStorage from '../hooks/useAuthStorage';
import { ME } from '../graphql/queries';
import AppBarTab from './AppBarTab';
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
  },
});

const AppBar = () => {
  const { loading, error, data } = useQuery(ME);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
    } catch (e) {
      if (e.name !== 'AbortError') throw e;
    }
    navigate('/');
  };

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  const user = data.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text='Repositories' link='/' />
        {user && <AppBarTab text='Create a review' link='/create-review' />}
        {user && <AppBarTab text='My reviews' link='/my-reviews' />}
        {user
          ? <AppBarTab text='Sign out' onPress={handleSignOut} />
          : <AppBarTab text='Sign in' link='/sign-in' />
        }
        {!user && <AppBarTab text='Sign up' link='/sign-up' />}
      </ScrollView>
    </View>
  );
};

export default AppBar;