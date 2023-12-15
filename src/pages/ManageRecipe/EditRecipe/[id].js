import React, { useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography, dividerClasses } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../../store/categorySlice';
import { Formik } from 'formik';
import { ToastContainer } from 'react-toastify';
import { fetchRecipeDetails, updateRecipe } from '../../../../store/recipeSlice';
import * as Yup from 'yup';




const EditRecipe = () => {
  
    const RecipeSchema = Yup.object().shape({
        title: Yup.string().required('Başlık gereklidir'),
        category: Yup.string().required('Kategori seçmek zorunludur'),
        difficulty: Yup.string().required('Zorluk seçmek zorunludur'),
        ingredients: Yup.array()
            .of(Yup.string().required('Malzeme gereklidir'))
            .min(1, 'En az 1 malzeme eklemelisiniz'),
        instructions: Yup.array()
            .of(Yup.string().required('Malzeme gereklidir'))
            .min(1, 'En az 1 malzeme eklemelisiniz'),
        rating: Yup.string().required('Değerlendirme yapmak zorunludur'),
        image: Yup.string().required('Resim yolu eklemek zorunludur'),
    });
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
            router.reload();

        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
    };



    const [ingredientInput, setIngredientInput] = useState('');
    const [instructionInput, setInstructionInput] = useState('');


    if (loadingRecipeDetails) {
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
                    <Typography variant="h4" component="h1">Tarif Güncelle
                        <Formik
                            initialValues={{
                                title: recipeDetails?.title || '',
                                category: recipeDetails?.category || '',
                                difficulty: recipeDetails?.difficulty || '',
                                ingredients: recipeDetails?.ingredients || [],
                                instructions: recipeDetails?.instructions || [],
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
                                setFieldValue,
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
                                    <Stack spacing={2}>
                                        <Stack spacing={1}>
                                            {values.ingredients.map((ingredient, index) => (
                                                <Stack key={index} direction="row" alignItems="center" spacing={1}>
                                                    <Typography>{ingredient}</Typography>
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() => {
                                                            const updatedIngredients = [...values.ingredients];
                                                            updatedIngredients.splice(index, 1);
                                                            setFieldValue('ingredients', updatedIngredients);
                                                        }}
                                                    >
                                                        Sil
                                                    </Button>
                                                </Stack>
                                            ))}
                                        </Stack>
                                        <Box display={'flex'} flexDirection={"row"} alignItems="center" justifyContent="space-between">
                                            <TextField
                                                fullWidth
                                                label="Malzeme Ekle"
                                                value={ingredientInput}
                                                onChange={(e) => setIngredientInput(e.target.value)}
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    if (ingredientInput.trim() !== '') {
                                                        const updatedIngredients = [...values.ingredients, ingredientInput.trim()];
                                                        setFieldValue('ingredients', updatedIngredients);
                                                        setIngredientInput('');
                                                    }
                                                }}
                                                style={{ marginLeft: '20px', width: "240px", height: "52px" }}
                                            >
                                                Malzeme Ekle
                                            </Button>
                                        </Box>
                                    </Stack>
                                    <Stack spacing={2}>
                                        <Stack spacing={1}>
                                            {values.instructions.map((instruction, index) => (
                                                <Stack key={index} direction="row" alignItems="center" spacing={1}>
                                                    <Typography>{instruction}</Typography>
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() => {
                                                            const updatedInstructions = [...values.instructions];
                                                            updatedInstructions.splice(index, 1);
                                                            setFieldValue('instructions', updatedInstructions);
                                                        }}
                                                    >
                                                        Sil
                                                    </Button>
                                                </Stack>
                                            ))}
                                        </Stack>
                                        <Box display={'flex'} flexDirection={"row"} alignItems="center" justifyContent="space-between">
                                            <TextField
                                                fullWidth
                                                label="Yapılacaklar Ekle"
                                                value={instructionInput}
                                                onChange={(e) => setInstructionInput(e.target.value)}
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    if (instructionInput.trim() !== '') {
                                                        const updatedInstructions = [...values.instructions, instructionInput.trim()];
                                                        setFieldValue('instructions', updatedInstructions);
                                                        setInstructionInput('');
                                                    }
                                                }}
                                                style={{ marginLeft: '20px', width: "240px", height: "52px" }}
                                            >
                                                Yapılacaklar Ekle
                                            </Button>
                                        </Box>
                                    </Stack>

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
            </Box>

            <ToastContainer position="bottom-right" />
        </Container>

    );
};

export default EditRecipe;
