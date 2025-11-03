import { StyleSheet, View, TextInput, Pressable } from 'react-native';
import { useFormik } from 'formik';
import { useQuery, useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';

import useRepositories from '../hooks/useRepositories';
import { ME } from '../graphql/queries';
import { CREATE_REVIEW } from '../graphql/mutations';


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
    fontFamily: theme.fonts,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
  },
  error: {
    color: 'red',
    paddingVertical: 10,
    fontSize: theme.fontSizes.body,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup.string(),
});



const ReviewForm = () => {
  const navigate = useNavigate();
  const [mutate] = useMutation(CREATE_REVIEW);
  const { repositories } = useRepositories();
  const repositoryNodes = repositories?.edges?.map(edge => edge.node) ?? [];
  const ownerNames = repositoryNodes.map(node => node.ownerName);
  const repositoryNames = repositoryNodes.map(node => node.fullName);

  const userQuery = useQuery(ME);
  const currentUser = userQuery?.data?.me;

  const reviewNodes = repositoryNodes.flatMap(node =>
    (node.reviews?.edges ?? []).map(edge => edge.node)
  );


  const formik = useFormik({
    initialValues: {
      ownerName: '',
      repositoryName: '',
      rating: '',
      text: '',
    },
    validationSchema,
    onSubmit: async (values, { setFieldError, resetForm }) => {
      const { ownerName, repositoryName, rating, text } = values;

      const ownerExists = ownerNames.includes(ownerName) || repositoryNodes.some(n => (n.fullName || '').startsWith(`${ownerName}/`));
      const repoFullName = `${ownerName}/${repositoryName}`;
      const repoExists = repositoryNames.includes(repoFullName);

      if (!repoExists) {
        setFieldError('repositoryName', 'Invalid repository name!');
      }

      if (!ownerExists) {
        setFieldError('ownerName', 'Invalid owner name!');
      }

      if (!repoExists || !ownerExists) return;

      const foundReview = reviewNodes.find(node => (
        node.user?.username === currentUser?.username && node.repository?.fullName === repoFullName
      ));

      if (foundReview) {
        console.log(`User "${currentUser?.username}" already reviewed the repository "${repoFullName}"`);
        return;
      }

      // Coerce rating to number before sending
      const numericRating = Number(rating);

      try {
        const response = await mutate({
          variables: {
            review: {
              ownerName,
              repositoryName,
              rating: numericRating,
              text,
            },
          },
        });

        console.log(response);
        // reset form on success
        resetForm();

        const repoId = response?.data?.createReview?.repositoryId;
        if (repoId) {
          // navigate to repository detail page
          navigate(`/${repoId}`);
        }
      } catch (e) {
        // avoid unhandled promise rejection and surface error for debugging
        console.error('Create review failed', e);
        // Rethrow so Formik can still surface the error if needed
        throw e;
      }
    },
  });

  return (
    <View>
      <TextInput
        style={{
          ...styles.input,
          ...((formik.touched.ownerName || formik.submitCount > 0) && formik.errors.ownerName
            ? { borderColor: 'red' }
            : {}),
        }}
        placeholder='Repository owner name'
        placeholderTextColor='rgba(0, 0, 0, 0.3)'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={() => formik.setFieldTouched('ownerName')}
      />
      {(formik.touched.ownerName || formik.submitCount > 0) && formik.errors.ownerName && (
        <Text style={styles.error}>{formik.errors.ownerName}</Text>
      )}
      
      <TextInput
        style={{
          ...styles.input,
          ...((formik.touched.repositoryName || formik.submitCount > 0) && formik.errors.repositoryName
            ? { borderColor: 'red' }
            : {}),
        }}
        placeholder='Repository name'
        placeholderTextColor='rgba(0, 0, 0, 0.3)'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={() => formik.setFieldTouched('repositoryName')}
      />
      {(formik.touched.repositoryName || formik.submitCount > 0) && formik.errors.repositoryName && (
        <Text style={styles.error}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={{
          ...styles.input,
          ...((formik.touched.rating || formik.submitCount > 0) && formik.errors.rating
            ? { borderColor: 'red' }
            : {}),
        }}
        placeholder='Rating between 0 and 100'
        placeholderTextColor='rgba(0, 0, 0, 0.3)'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={() => formik.setFieldTouched('rating')}
        keyboardType='numeric'
      />
      {(formik.touched.rating || formik.submitCount > 0) && formik.errors.rating && (
        <Text style={styles.error}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={{
          ...styles.input,
          ...((formik.touched.text || formik.submitCount > 0) && formik.errors.text
            ? { borderColor: 'red' }
            : {}),
        }}
        placeholder='Review'
        placeholderTextColor='rgba(0, 0, 0, 0.3)'
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={() => formik.setFieldTouched('text')}
      />
      {(formik.touched.text || formik.submitCount > 0) && formik.errors.text && (
        <Text style={styles.error}>{formik.errors.text}</Text>
      )}

      <Pressable
        onPress={formik.handleSubmit}
      >
        <Text style={styles.button}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;