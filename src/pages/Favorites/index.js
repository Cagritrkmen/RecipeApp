import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { fetchRecipes } from '../../../store/recipeSlice';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { recipes } = useSelector((state) => state.recipes);
  const router = useRouter();
  const dispatch= useDispatch()

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
        console.log('storedFavorites', storedFavorites)
      setFavorites(JSON.parse(storedFavorites));
    }
    dispatch(fetchRecipes());
    
  }, []);

  const handleFavoriteToggle = (id) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id];

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (id) => favorites.includes(id);

  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));
  console.log('recipe', recipes)
  console.log('favoriteRecipes', favoriteRecipes)

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
            <Card key={recipe.id} sx={{ width: 250, marginBottom: 3 }}>
              <CardMedia
                component="img"
                height="150"
                image={recipe.image}
                alt={recipe.title}
              />
              <CardContent>
                <Typography mb={3} gutterBottom variant="h6" component="div">
                  {recipe.title}
                </Typography>
                {recipe.category}
              </CardContent>
              <Stack direction="row" justifyContent="space-around" mb={3}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => router.push(`/Recipes/${recipe.id}`)}
                >
                  Detaya Git
                </Button>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => handleFavoriteToggle(recipe.id)}
                >
                  <FavoriteIcon
                    sx={{ fontSize: '40px' }}
                    color={isFavorite(recipe.id) ? 'error' : 'disabled'}
                  />
                </IconButton>
              </Stack>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default Favorites;
