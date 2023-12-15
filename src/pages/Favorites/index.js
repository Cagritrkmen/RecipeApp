import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { fetchRecipes } from '../../../store/recipeSlice';
import RecipeCard from '@/components/RecipeCard';
import { deleteFavoriteRecipe } from '../../../store/userSlice';

const Favorites = () => {
  const { recipes } = useSelector((state) => state.recipes);
  const router = useRouter();
  const dispatch = useDispatch()

  const { isLoggedIn,user } = useSelector((state) => state.user)

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    dispatch(fetchRecipes());

  }, []);

  const handleFavoriteToggle = (recipeId) => {
      const userId = user.id; 
      if (isFavorite(recipeId)) {
        dispatch(deleteFavoriteRecipe({ userId, recipeId }));
      } else {
        dispatch(addFavoriteRecipe({ userId, recipeId }))
      }
  };

  const isFavorite = (id) => user.favorites.includes(id);

  const favoriteRecipes = recipes.filter((recipe) => user?.favorites.includes(recipe.id));

  if (!isLoggedIn) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography mt={20} variant="h3" color="white" mb={4}>
          Lütfen Giriş Yapın
        </Typography>
        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} width={"300px"}>
          <Button variant="contained" color="secondary" onClick={() => { router.back() }}>
            Geri Dön
          </Button>
          <Button variant="contained" color="secondary" onClick={() => { router.push("/Login") }}>
            Giriş Yap
          </Button>
        </Box>

      </Box>
    );
  }

  return (
    <Stack direction="column" alignItems="center" m={5}>
      {favoriteRecipes.length === 0 ? (
        <Stack direction="column" alignItems="center" justifyContent="center">
          <Typography variant="h4" color="white" mb={4}>
            Favori tarif bulunamadı
          </Typography>
          <Button variant="contained" color="primary" onClick={router.back}>
            Geri Dön
          </Button>
        </Stack>
      ) : (
        <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} isFavorite={isFavorite} recipe={recipe} handleFavoriteToggle={handleFavoriteToggle} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default Favorites;
