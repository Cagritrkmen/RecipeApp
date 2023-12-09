import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  recipes: [],
  loadingRecipes: false,
  error: null,
  recipeDetails: {},
  loadingRecipeDetails: false,
};

export const fetchRecipesByCategory = createAsyncThunk(
  'recipes/fetchRecipesByCategory',
  async (category) => {
    const response = await axios.get(
      `http://localhost:3001/recipes?category=${category}`
    );
    return response.data;
  }
);

export const fetchRecipes = createAsyncThunk(
    'categories/fetchRecipes',
    async () => {
      const response = await axios.get(
        'http://localhost:3001/recipes'
      );
      return response.data;
    }
  );

export const fetchRecipeDetails = createAsyncThunk(
  'recipes/fetchRecipeDetails',
  async (recipeId) => {
    const response = await axios.get(
      `http://localhost:3001/recipes/${recipeId}`
    );
    return response.data;
  }
);

export const searchRecipes = createAsyncThunk(
  'search/searchRecipes',
  async (search) => {
      const response = await axios.get( `http://localhost:3001/recipes?q=${search}`);
      return response.data;
    }
);

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchRecipesByCategory.pending, (state) => {
          state.loadingRecipes = true;
        })
        .addCase(fetchRecipesByCategory.fulfilled, (state, action) => {
          state.recipes = action.payload;
          state.loadingRecipes = false;
        })
        .addCase(fetchRecipesByCategory.rejected, (state, action) => {
          state.loadingRecipes = false;
          state.error = action.error.message;
        })
        .addCase(fetchRecipes.pending, (state) => { 
          state.loadingRecipes = true;
        })
        .addCase(fetchRecipes.fulfilled, (state, action) => {
          state.recipes = action.payload;
          state.loadingRecipes = false;
        })
        .addCase(fetchRecipes.rejected, (state, action) => {
          state.loadingRecipes = false;
          state.error = action.error.message;
        })
        .addCase(fetchRecipeDetails.pending, (state) => {
          state.loadingRecipeDetails = true;
        })
        .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
          state.recipeDetails = action.payload;
          state.loadingRecipeDetails = false;
        })
        .addCase(fetchRecipeDetails.rejected, (state, action) => {
          state.error = action.error.message;
          state.loadingRecipeDetails = false;
        })
        .addCase(searchRecipes.pending, (state) => {
          state.loadingRecipes = true;
        })
        .addCase(searchRecipes.fulfilled, (state, action) => {
          state.recipes = action.payload;
          state.loadingRecipes = false;
        })
        .addCase(searchRecipes.rejected, (state, action) => {
          state.error = action.error.message;
          state.loadingRecipes = false;
        });
    },
  });

export default recipeSlice.reducer;