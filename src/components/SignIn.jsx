import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { useFormik } from 'formik';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  text: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.normal,
  },
  input: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
  },
  button: {
    textAlign: 'center',
    color: theme.colors.appBarText,
    backgroundColor: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 20,
  }
});

const onSubmit = (values) => {
  console.log(values);
};

const SignIn = () => {
  const initialValues = {
    username: '',
    password: '',
  };
  
  const formik = useFormik({
    initialValues,
    onSubmit
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Username</Text>
        <TextInput
          style={styles.input}
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />
      </View>

      <View>
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          secureTextEntry
        />
      </View>

      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;