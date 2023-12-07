import { configureStore } from '@reduxjs/toolkit';
import recipeSlice from './recipeSlice';
import categorySlice from './categorySlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    recipes:recipeSlice,
    categories:categorySlice,
    user: userSlice
  },
});