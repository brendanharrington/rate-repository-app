import { View, StyleSheet } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import RepositoryView from './RepositoryView';
import AppBar from './AppBar';
import SignIn from './SignIn';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    flex: 1,
    padding: 10,
  },
});

const Main = () => {
  return (
    <View style={{ flex: 1 }}>
      <AppBar />
      <View style={styles.container}>
        <Routes>
          <Route path='/' element={<RepositoryList />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/create-review' element={<ReviewForm />} />
          <Route path='/my-reviews' element={<UserReviews />} />
          <Route path='/:id' element={<RepositoryView />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </View>
    </View>
  );
};

export default Main;