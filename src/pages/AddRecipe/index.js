import React, { useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../store/categorySlice';
import { useFormik } from 'formik';


const AddRecipe = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categories);
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
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
    });
    const formik = useFormik({
        initialValues: {
            title: '',
            category: '',
            difficulty: '',
            ingredients: '',
            instructions: '',
            rating: '',
            image:"",

        },
        validationSchema: RecipeSchema,
        onSubmit: async (values) => {
            try {
                await axios.post('http://localhost:3001/recipes', values);
                alert('Tarif başarıyla eklendi!');
                router.reload("/AddRecipe") 

            } catch (error) {
                alert('Tarif eklenemedi');
                console.error('Bir hata oluştu:', error);
            }
        },
    });
    const [ingredients, setIngredients] = useState([]);
    const [ingredientInput, setIngredientInput] = useState('');
    const [instructions, setInstructions] = useState([]);
    const [instructionInput, setInstructionInput] = useState('');


    const handleAddIngredient = () => {
        if (ingredientInput.trim() !== '') {
            const updatedIngredients = [...ingredients, ingredientInput.trim()];
            setIngredients(updatedIngredients);
            formik.setFieldValue('ingredients', updatedIngredients);
            setIngredientInput('');
        }
    };

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
        formik.setFieldValue('ingredients', updatedIngredients);
    };

    const handleAddInstructions = () => {
        if (instructionInput.trim() !== '') {
            const updatedinstructions = [...instructions, instructionInput.trim()];
            setInstructions(updatedinstructions);
            formik.setFieldValue('instructions', updatedinstructions);
            setInstructionInput('');
        }
    };

    const handleRemoveInstruction = (index) => {
        const updatedinstructions = [...instructions];
        updatedinstructions.splice(index, 1);
        setInstructions(updatedinstructions);
        formik.setFieldValue('instructions', updatedinstructions);
    };




    return (
        <Container>
            <Stack spacing={2}>
                <Typography variant="h4" component="h1">
                    Tarif Ekle
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="title"
                            name="title"
                            label="Başlık"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            margin="normal"
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                            onBlur={formik.handleBlur}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                            <Select
                                id="category"
                                name="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                label={"Kategori"}
                                error={formik.touched.category && Boolean(formik.errors.category)}

                            >
                                {categories.map((category, index) => (
                                    <MenuItem key={index} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}

                            </Select>
                            {formik.touched.category && formik.errors.category ? (
                                <FormHelperText
                                    sx={{ color: "#d32f2f", marginLeft: "16px !important" }}
                                >
                                    {formik.touched.category && formik.errors.category}
                                </FormHelperText>
                            ) : null}
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="difficulty-label">Zorluk</InputLabel>
                            <Select
                                id="difficulty"
                                value={formik.values.difficulty}
                                name='difficulty'
                                onChange={formik.handleChange}
                                label="Zorluk"
                                error={formik.touched.difficulty && Boolean(formik.errors.difficulty)}
                            >
                                <MenuItem value={"Kolay"}>Kolay</MenuItem>
                                <MenuItem value={"Orta"}>Orta</MenuItem>
                                <MenuItem value={"Zor"}>Zor</MenuItem>
                            </Select>
                            {formik.touched.difficulty && formik.errors.difficulty ? (
                                <FormHelperText
                                    sx={{ color: "#d32f2f", marginLeft: "16px !important" }}
                                >
                                    {formik.touched.difficulty && formik.errors.difficulty}
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="rating-label">Değerlendirme</InputLabel>
                            <Select
                                id="rating"
                                value={formik.values.rating}
                                name='rating'
                                onChange={formik.handleChange}
                                label="Değerlendirme"
                                error={formik.touched.rating && Boolean(formik.errors.rating)}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                            {formik.touched.rating && formik.errors.rating ? (
                                <FormHelperText
                                    sx={{ color: "#d32f2f", marginLeft: "16px !important" }}
                                >
                                    {formik.touched.rating && formik.errors.rating}
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                        <Stack spacing={2}>
                            <Stack spacing={1}>
                                {ingredients.map((ingredient, index) => (
                                    <Stack key={index} direction="row" alignItems="center" spacing={1}>
                                        <Typography>{ingredient}</Typography>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleRemoveIngredient(index)}
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
                                    onClick={handleAddIngredient}
                                    style={{ marginLeft: '20px', width: "240px", height: "52px" }} // İstediğiniz boşluğu ayarlayabilirsiniz
                                >
                                    Malzeme Ekle
                                </Button>
                            </Box>

                        </Stack>
                        <Stack spacing={2}>
                            <Stack spacing={1}>
                                {instructions.map((instruction, index) => (
                                    <Stack key={index} direction="row" alignItems="center" spacing={1}>
                                        <Typography>{instruction}</Typography>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleRemoveInstruction(index)}
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
                                    onClick={handleAddInstructions}
                                    style={{ marginLeft: '20px', width: "240px", height: "52px" }} // İstediğiniz boşluğu ayarlayabilirsiniz
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
                            value={formik.values.image}
                            onChange={formik.handleChange}
                            margin="normal"
                            error={formik.touched.image && Boolean(formik.errors.image)}
                            helperText={formik.touched.image && formik.errors.image}
                            onBlur={formik.handleBlur}
                        />

                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Tarif Ekle
                        </Button>
                    </form>
                </Typography>
            </Stack>
        </Container>
    );
};

export default AddRecipe;
