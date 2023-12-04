import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import CategoryList from './components/CategoryList';
import { fetchRecipesByCategory } from '../../../store/recipeSlice';
import { fetchCategories } from '../../../store/categorySlice';

const Recipes = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { categories, loadingCategories, defaultCategory } = useSelector(
    (state) => state.categories
  );
  const { recipes, loadingRecipes } = useSelector((state) => state.recipes);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = useCallback(
    (category) => {
      if (category !== selectedCategory) {
        setSelectedCategory(category);
        dispatch(fetchRecipesByCategory(category));
      }
    },
    [selectedCategory, dispatch]
  );

  useEffect(() => {
    dispatch(fetchRecipesByCategory(defaultCategory));
  }, [dispatch]);

  return (
    <Stack direction="column" spacing={4} m={5}>
      {loadingCategories ? (
        <Skeleton variant="rectangular" width={206} height={338} />
      ) : (
        <Stack direction="row" spacing={3}>
          <CategoryList
            categories={categories}
            handleCategoryClick={handleCategoryClick}
          />

          <Stack
            spacing={{ xs: 1, sm: 3, md: 3 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {loadingRecipes ? (
              Array.from(new Array(6)).map((_, index) => (
                <Card key={index} sx={{ width: '345px' }}>
                  <Skeleton variant="rectangular" width="100%" height={140} />
                  <CardContent>
                    <Skeleton variant="text" height={140} />
                    <Skeleton variant="text" width="60%" />
                  </CardContent>
                </Card>
              ))
            ) : (
              recipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  sx={{ maxWidth: 500, cursor: 'pointer' }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image={recipe.image}
                    alt={recipe.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {recipe.title}
                    </Typography>
                    {recipe.category}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 2,
                      }}
                    >
                      <Rating name="read-only" value={recipe.rating} readOnly />
                      <Typography variant="body2" color="text.secondary">
                        ({recipe.rating})
                      </Typography>
                    </Box>
                  </CardContent>
                  <Stack direction="row" justifyContent="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => router.push(`/Recipes/${recipe.id}`)}
                    >
                      Detaya Git
                    </Button>
                  </Stack>
                </Card>
              ))
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Recipes;
