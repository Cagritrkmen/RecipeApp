import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../store/userSlice';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validationSchema from '../../components/validationSchema';
import { useRouter } from 'next/router';

const Register = () => {
  const dispatch = useDispatch();

  const initialValues = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    name:"",
    surname:"",
    role: 'user',
    favorites: [],
  };

  const router = useRouter();
  const { isRegister } = useSelector((state) => state.user);


  const handleSubmit = async (values, { setSubmitting }) => {
    await dispatch(registerUser(values));
    setSubmitting(false);
  };

  useEffect(() => {
    if (isRegister) {
      setTimeout(()=>{
        router.push('/Login');
      },2000)
      
    }
  }, [isRegister, router]);

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'background.paper', p: 4, borderRadius: "20px" }}>
        <Typography component="h1" variant="h5">
          Kayıt Ol
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
              <Field name="name">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    label="İsim"
                    type="name"
                    error={form.errors.name && form.touched.name}
                    helperText={<ErrorMessage name="name" />}
                  />
                )}
              </Field>
              <Field name="surname">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    label="Soyisim"
                    type="surname"
                    error={form.errors.surname && form.touched.surname}
                    helperText={<ErrorMessage name="surname" />}
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

              <Field name="passwordConfirm">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    label="Şifre Tekrar"
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
            </Form>
          )}
        </Formik>
        <ToastContainer position='bottom-right' /> 
      </Box>
    </Container>
  );
};

export default Register;
