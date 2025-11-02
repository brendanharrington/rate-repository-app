import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';
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
  },
  error: {
    color: 'red',
    paddingVertical: 10,
    fontSize: theme.fontSizes.body,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInContainer = ({ formik }) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.text}>Username</Text>
      <TextInput
        testID='usernameInput'
        style={{
          ...styles.input,
          ...(formik.touched.username && formik.errors.username
            ? { borderColor: 'red' }
            : {}),
        }}
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={() => formik.setFieldTouched('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
    </View>

    <View>
      <Text style={styles.text}>Password</Text>
      <TextInput
        testID='passwordInput'
        style={{
          ...styles.input,
          ...(formik.touched.password && formik.errors.password
            ? { borderColor: 'red' }
            : {}),
        }}
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={() => formik.setFieldTouched('password')}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
    </View>

    <Pressable onPress={formik.handleSubmit}>
      <Text
        testID='submitButton'
        style={styles.button}
      >
        Sign in
      </Text>
    </Pressable>
  </View>
);

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { username, password } = values;
      try {
        const { data } = await signIn({ username, password });
        const token = data.authenticate.accessToken;
        console.log(`Sign-in success: ${token}`);
        resetForm();
        navigate('/');
      } catch (e) {
        console.log(e.message);
      }
    },
  });

  return <SignInContainer formik={formik} />;
};

export default SignIn;
