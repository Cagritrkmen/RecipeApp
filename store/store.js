import { configureStore } from '@reduxjs/toolkit';
import recipeSlice from './recipeSlice';
import categorySlice from './categorySlice';

export const store = configureStore({
  reducer: {
    recipes:recipeSlice,
    categories:categorySlice
  },
});