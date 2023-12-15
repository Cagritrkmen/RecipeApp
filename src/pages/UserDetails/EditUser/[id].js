import React, { useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography, dividerClasses } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { fetchUserDetails, updateUser } from '../../../../store/userSlice';
import * as Yup from 'yup';



const EditUser = () => {
    const router = useRouter();
    const { id } = router.query;
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('İsim zorunlu'),
        surname: Yup.string().required('Soyisim zorunlu'),
        username: Yup.string().required('Kullanıcı adı zorunlu'),
        email: Yup.string().email('Geçersiz email').required('Email girmek zorunlu'),
        password: Yup.string().required('Şifre girmek zorunlu').min(6, 'Şifre en az 6 karakter uzunluğunda olmalıdır'),
        passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Şifreler aynı değil'),

    });


    const dispatch = useDispatch();
    const { user, loadingUserDetails } = useSelector((state) => state.user)




    const handleSubmit = async (values) => {
        try {
            await dispatch(updateUser({ id, values }));
            toast.success('Kullanıcı başarıyla güncellendi.');
        } catch (error) {
            toast.error(error.payload || 'Kullanıcı güncellenemedi.');
            console.error('Bir hata oluştu:', error);
        }
    };




    if (loadingUserDetails) {
        return <Box>Loading</Box>
    }


    return (
        <Container>
            <Box sx={{
                marginTop: "20px",
                backgroundColor: '#fff',
                padding: '10px 50px',
                borderRadius: '20px',
            }}>
                <Stack spacing={2}>
                    <Typography variant="h4" component="h1">Kullanıcı Güncelle
                        <Formik
                            initialValues={{
                                username: user?.username || '',
                                email: user?.email || '',
                                password: user?.password || '',
                                passwordConfirm: user?.passwordConfirm || '',
                                name: user?.name || '',
                                surname: user?.surname || '',
                                role: user?.role || "",
                                favorites: user?.favorites || "",
                            }}

                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({
                                values,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                errors,
                                touched,
                                setFieldValue,
                            }) => (
                                <form onSubmit={handleSubmit}>


                                    <Field name="email">
                                        {({ field, form }) => (
                                            <TextField
                                                {...field}
                                                margin="normal"
                                                fullWidth
                                                value={values.email}
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
                                                value={values.name}
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
                                                value={values.surname}
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
                                                value={values.password}
                                                label="Şifre"

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
                                                value={values.passwordConfirm}
                                                label="Şifre Tekrar"

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
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Güncelle
                                    </Button>
                                </form>
                            )}
                        </Formik>
                    </Typography>
                </Stack>
            </Box>

            <ToastContainer position="bottom-right" />
        </Container>

    );
};

export default EditUser;
