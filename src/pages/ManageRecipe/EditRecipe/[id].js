import React, { useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography, dividerClasses } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../../store/categorySlice';
import { Formik, useFormik } from 'formik';
import { ToastContainer } from 'react-toastify';
import { fetchRecipeDetails, updateRecipe } from '../../../../store/recipeSlice';
import RecipeSchema from '../recipeSchema';


const EditRecipe = () => {
    const router = useRouter();
    const { id } = router.query;
    console.log('id', id)


    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categories);
    const { recipeDetails, loadingRecipeDetails } = useSelector((state) => state.recipes)


    useEffect(() => {
        if (id) {
            dispatch(fetchRecipeDetails(id));
        }
        dispatch(fetchCategories());
    }, [dispatch, id]);
    console.log('recipeDetails', recipeDetails)


    const handleSubmit = async (values) => {
        try {

            await dispatch(updateRecipe({ id, values }));

        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
    };




    if(loadingRecipeDetails){
        return  <Box>Loading</Box>
    }


    return (
        <Container>
        <Stack spacing={2}>
            <Typography variant="h4" component="h1">Tarif Güncelle
                <Formik
                    initialValues={{
                        title: recipeDetails?.title || '',
                        category: recipeDetails?.category || '',
                        difficulty: recipeDetails?.difficulty || '',
                        ingredients: recipeDetails?.ingredients || '',
                        instructions: recipeDetails?.instructions || '',
                        rating: recipeDetails?.rating || '',
                        image: recipeDetails?.image || '',
                    }}
                    validationSchema={RecipeSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        errors,
                        touched,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <TextField
                            fullWidth
                            id="title"
                            name="title"
                            label="Başlık"
                            value={values.title}
                            onChange={handleChange}
                            margin="normal"
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
                            onBlur={handleBlur}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="category">Kategori</InputLabel>
                            <Select
                                id="category"
                                name="category"
                                value={values.category}
                                onChange={handleChange}
                                label={"Kategori"}
                                error={touched.category && Boolean(errors.category)}

                            >
                                {categories.map((category, index) => (
                                    <MenuItem key={index} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}

                            </Select>
                            {touched.category && errors.category ? (
                                <FormHelperText
                                    sx={{ color: "#d32f2f", marginLeft: "16px !important" }}
                                >
                                    {touched.category && errors.category}
                                </FormHelperText>
                            ) : null}
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="difficulty-label">Zorluk</InputLabel>
                            <Select
                                id="difficulty"
                                value={values.difficulty}
                                name='difficulty'
                                onChange={handleChange}
                                label="Zorluk"
                                error={touched.difficulty && Boolean(errors.difficulty)}
                            >
                                <MenuItem value={"Kolay"}>Kolay</MenuItem>
                                <MenuItem value={"Orta"}>Orta</MenuItem>
                                <MenuItem value={"Zor"}>Zor</MenuItem>
                            </Select>
                            {touched.difficulty && errors.difficulty ? (
                                <FormHelperText
                                    sx={{ color: "#d32f2f", marginLeft: "16px !important" }}
                                >
                                    {touched.difficulty && errors.difficulty}
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="rating-label">Değerlendirme</InputLabel>
                            <Select
                                id="rating"
                                value={values.rating}
                                name='rating'
                                onChange={handleChange}
                                label="Değerlendirme"
                                error={touched.rating && Boolean(errors.rating)}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                            {touched.rating && errors.rating ? (
                                <FormHelperText
                                    sx={{ color: "#d32f2f", marginLeft: "16px !important" }}
                                >
                                    {touched.rating && errors.rating}
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                        
                        <TextField
                            fullWidth
                            id="image"
                            name="image"
                            label="Resim Yolu"
                            value={values.image}
                            onChange={handleChange}
                            margin="normal"
                            error={touched.image && Boolean(errors.image)}
                            helperText={touched.image && errors.image}
                            onBlur={handleBlur}
                        />

                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Tarif Güncelle
                        </Button>
                        </form>
                    )}
                </Formik>
            </Typography>
        </Stack>
        <ToastContainer position="bottom-right" />
    </Container>

    );
};

export default EditRecipe;
