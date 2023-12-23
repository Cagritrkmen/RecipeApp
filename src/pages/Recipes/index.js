import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Skeleton,
  Typography,
} from '@mui/material';
import CategoryList from './components/CategoryList';
import { fetchRecipes, fetchRecipesByCategory } from '../../../store/recipeSlice';
import { fetchCategories } from '../../../store/categorySlice';
import SearchBar from '@/components/SearchBar';
import RecipeCard from '@/components/RecipeCard';
import { ToastContainer, toast } from 'react-toastify';
import { addFavoriteRecipe, deleteFavoriteRecipe } from '../../../store/userSlice';

const Recipes = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { categories, loadingCategories, defaultCategory } = useSelector(
    (state) => state.categories
  );
  
  const { recipes, loadingRecipes } = useSelector((state) => state.recipes);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const { isLoggedIn, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleCategoryClick = useCallback(
    (category) => {
      if (category !== selectedCategory) {
        setSelectedCategory(category);
        dispatch(fetchRecipesByCategory(category));
      }
      if(category === "Tümü") {
        dispatch(fetchRecipes(category));
      }
    },
    [selectedCategory, dispatch]
  );

  const handleFavoriteToggle = (recipeId) => {
    if (!isLoggedIn) {
      toast.error("Giriş yapmadan favorilere ekleme yapamazsınız.");
    } else {
      const userId = user.id; 
      if (isFavorite(recipeId)) {
        dispatch(deleteFavoriteRecipe({ userId, recipeId }));
      } else {
        dispatch(addFavoriteRecipe({ userId, recipeId }));
      }
    }
  };

  const isFavorite = (id) => user?.favorites.includes(id);

  return (
    <Box mt={10}>
      {loadingCategories ? (
        <Skeleton variant="rectangular" width={206} height={338} />
      ) : (
        <Grid container spacing={3}>
          <Grid marginLeft={7} mr={3} item xs={12} md={2}  xl={2}>
            <SearchBar />
            <CategoryList
              categories={categories}
              handleCategoryClick={handleCategoryClick}
            />
          </Grid>
          <Grid marginLeft={"60px"} item xs={12} md={8}>
            <Grid   container spacing={3}>
              {loadingRecipes ? (
                Array.from(new Array(8)).map((_, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ width: '100%' }}>
                      <Skeleton variant="rectangular" width="100%" height={150} />
                      <CardContent>
                        <Skeleton variant="text" height={140} />
                        <Skeleton variant="text" width="60%" />
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                recipes.map((recipe) => (
                  <Grid key={recipe.id} item xs={12} sm={6} md={4} lg={3}>
                    <RecipeCard
                      isFavorite={isFavorite}
                      recipe={recipe}
                      handleFavoriteToggle={handleFavoriteToggle}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
      <ToastContainer position="bottom-right" />
    </Box>
  );
};

export default Recipes;
