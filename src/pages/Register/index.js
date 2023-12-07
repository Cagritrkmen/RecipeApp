import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../store/userSlice';
import { Button, TextField, Typography, Container, Box } from '@mui/material';

const Register = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  const initialValues = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: 'user',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(registerUser(values));
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="xs" >
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'background.paper', p: 4, borderRadius:"20px"}}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="username">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    label="Username"
                    type="text"
                    error={form.errors.username && form.touched.username}
                    helperText={<ErrorMessage name="username" />}
                  />
                )}
              </Field>

              <Field name="email">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    label="Email"
                    type="email"
                    error={form.errors.email && form.touched.email}
                    helperText={<ErrorMessage name="email" />}
                  />
                )}
              </Field>

              <Field name="password">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    error={form.errors.password && form.touched.password}
                    helperText={<ErrorMessage name="password" />}
                  />
                )}
              </Field>

              <Field name="passwordConfirm">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    error={form.errors.passwordConfirm && form.touched.passwordConfirm}
                    helperText={<ErrorMessage name="passwordConfirm" />}
                  />
                )}
              </Field>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              {error && <Typography color="error">{error}</Typography>}
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Register;
