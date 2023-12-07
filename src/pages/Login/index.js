import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Container, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { loginUser } from '../../../store/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginUser(values));
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'white', p: 4, borderRadius:"20px"}}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form >
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              {error && <Typography color="error">{error}</Typography>}
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
