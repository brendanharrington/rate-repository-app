import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import { useMutation, useQuery } from '@apollo/client/react';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';
import Text from './Text';
import theme from '../theme';
import { CREATE_USER } from '../graphql/mutations';
import { GET_ALL_USERS } from '../graphql/queries';

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
  },
  error: {
    color: 'red',
    paddingVertical: 10,
    fontSize: theme.fontSizes.body,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5)
    .max(30)
    .required('Username is required'),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [mutate, result] = useMutation(CREATE_USER);
  const { data } = useQuery(GET_ALL_USERS);

  const users = data?.users?.edges?.map(edge => edge.node) ?? [];

  const signUp = async ({ username, password }) => {
    const response = await mutate({ variables: {
        user: { username, password },
      },
    });

    return response;
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit: async (values, { setFieldError, resetForm }) => {
      try {
        const { username } = values;

        if (users.find(u => u.username === username)) {
          setFieldError('username', 'Username is already taken!');
          return;
        }
        
        await signUp(values);
        await signIn(values);
        resetForm();
        navigate('/');
      } catch (e) {
        console.log(`Error: ${e.message}`);
      }
    },
  });

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={{
            ...styles.input,
            ...((formik.touched.username || formik.submitCount > 0) && formik.errors.username
              ? { borderColor: 'red' }
              : {}),
          }}
          placeholder='Username'
          placeholderTextColor='rgba(0, 0, 0, 0.3)'
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          onBlur={() => formik.setFieldTouched('username')}
        />
        {(formik.touched.username || formik.submitCount > 0) && formik.errors.username && (
          <Text style={styles.error}>{formik.errors.username}</Text>
        )}
      </View>

      <View>
        <TextInput
          style={{
            ...styles.input,
            ...((formik.touched.password || formik.submitCount > 0) && formik.errors.password
              ? { borderColor: 'red' }
              : {}),
          }}
          placeholder='Password'
          placeholderTextColor='rgba(0, 0, 0, 0.3)'
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={() => formik.setFieldTouched('password')}
        />
        {(formik.touched.password || formik.submitCount > 0) && formik.errors.password && (
          <Text style={styles.error}>{formik.errors.password}</Text>
        )}
      </View>

      <View>
        <TextInput
          style={{
            ...styles.input,
            ...((formik.touched.passwordConfirmation || formik.submitCount > 0) && formik.errors.passwordConfirmation
              ? { borderColor: 'red' }
              : {}),
          }}
          placeholder='Password confirmation'
          placeholderTextColor='rgba(0, 0, 0, 0.3)'
          value={formik.values.passwordConfirmation}
          onChangeText={formik.handleChange('passwordConfirmation')}
          onBlur={() => formik.setFieldTouched('passwordConfirmation')}
        />
        {(formik.touched.passwordConfirmation || formik.submitCount > 0) && formik.errors.passwordConfirmation && (
          <Text style={styles.error}>{formik.errors.passwordConfirmation}</Text>
        )}
      </View>

      <Pressable
        onPress={formik.handleSubmit}
      >
        <Text style={styles.button}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;