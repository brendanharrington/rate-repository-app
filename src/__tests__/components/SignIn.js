import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const mockOnSubmit = jest.fn();

      const formik = {
        values: { username: '', password: '' },
        handleChange: jest.fn((field) => (value) => {
          formik.values[field] = value;
        }),
        handleSubmit: jest.fn(() => mockOnSubmit(formik.values)),
        touched: {},
        errors: {},
        setFieldTouched: jest.fn(),
      };

      render(<SignInContainer formik={formik} />);

      const usernameInput = screen.getByTestId('usernameInput');
      const passwordInput = screen.getByTestId('passwordInput');
      const submitButton = screen.getByTestId('submitButton');

      fireEvent.changeText(usernameInput, 'kalle');
      fireEvent.changeText(passwordInput, 'password');

      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(formik.handleSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});
