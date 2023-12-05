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
import { fetchRecipes, fetchRecipesByCategory } from '../../../store/recipeSlice';
import { fetchCategories } from '../../../store/categorySlice';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchBar from '@/components/SearchBar';
import RecipeCard from '@/components/RecipeCard';

const Recipes = () => {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const { categories, loadingCategories, defaultCategory } = useSelector(
    (state) => state.categories
  );
  const { recipes, loadingRecipes } = useSelector((state) => state.recipes);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

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
      if(category =="Tümü"){
        dispatch(fetchRecipes(category))
      }
    },
    [selectedCategory, dispatch]
  );



  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleFavoriteToggle = (id) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id];

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };
  const isFavorite = (id) => favorites.includes(id);

  return (
    <Stack direction="column" spacing={4} m={5}>
      {loadingCategories ? (
        <Skeleton variant="rectangular" width={206} height={338} />
      ) : (
        <Stack direction="row" spacing={10}>
          <Stack>
            <SearchBar></SearchBar>
            <CategoryList
              categories={categories}
              handleCategoryClick={handleCategoryClick}
            />
          </Stack>


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
                <RecipeCard isFavorite={isFavorite} recipe={recipe} handleFavoriteToggle={handleFavoriteToggle}/>
              ))
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Recipes;
