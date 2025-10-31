import { View, StyleSheet } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    height: '100%',
    width: '100vw',
    padding: 10,
  },
});

const Main = () => {
  return (
    <View>
      <AppBar />
      <View style={styles.container}>
        <Routes>
          <Route path='/' element={<RepositoryList />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </View>
    </View>
  );
};

export default Main;