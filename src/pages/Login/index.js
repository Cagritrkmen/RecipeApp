import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Container, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { loginUser } from '../../../store/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Login = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Kullanıcı adı zorunlu'),
    password: Yup.string().required('Şifre zorunlu'),
  });
  const router = useRouter()

  const handleSubmit = async (values, { setSubmitting }) => {
    await dispatch(loginUser(values));
    setSubmitting(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(()=>{
        router.push('/Recipes');
      },2000)
      
    }
  }, [isLoggedIn, router]);

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'white', p: 4, borderRadius: "20px" }}>
        <Typography component="h1" variant="h5">
          Giriş Yap
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
                    label="Kullanıcı Adı"
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
                    label="Şifre"
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
            </Form>
          )}
        </Formik>
        <ToastContainer position='bottom-right'/>
      </Box>
    </Container>
  );
};

export default Login;
