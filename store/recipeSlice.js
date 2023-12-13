import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

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
export const deleteRecipe = createAsyncThunk(
  'recipes/deleteRecipe',
  async (recipeId) => {
    const response = await axios.delete(`http://localhost:3001/recipes/${recipeId}`);
    return response.data;
  }
);
export const addNewRecipe = createAsyncThunk(
  'recipes/addNewRecipe',
  async (recipeData) => {
    const response = await axios.post('http://localhost:3001/recipes', recipeData);
    return response.data;
  }
);


export const fetchRecipeDetails = createAsyncThunk(
  'recipes/fetchRecipeDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/recipes/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.error)
    }

  }
);


export const searchRecipes = createAsyncThunk(
  'search/searchRecipes',
  async (search) => {
    const response = await axios.get(`http://localhost:3001/recipes?q=${search}`);
    return response.data;
  }
);
export const updateRecipe = createAsyncThunk(
  'recipes/updateRecipe',
  async ({ id, values }) => {
    const response = await axios.put(`http://localhost:3001/recipes/${id}`, values);
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
      })
      .addCase(addNewRecipe.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
        toast.success(`Tarif başarıyla eklendi.`)
        state.loading = false;
      })
      .addCase(addNewRecipe.rejected, (state, action) => {
        state.error = action.error.message;
        toast.error('Tarif eklenemedi.')
        state.loading = false;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
        toast.success(`Tarif başarıyla silindi.`)
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.error = action.error.message;
        toast.error('Tarif silinemedi.')
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {

        const updatedRecipe = action.payload;
        const index = state.recipes.findIndex(recipe => recipe.id === updatedRecipe.id);
        if (index !== -1) {
          state.recipes[index] = updatedRecipe;
          toast.success(`Tarif başarıyla güncellendi.`);
        }
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.error = action.error.message;
        toast.error('Tarif güncellenemedi.');
      });
  },
});

export default recipeSlice.reducer;