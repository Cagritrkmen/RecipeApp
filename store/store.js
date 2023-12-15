
import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './recipeSlice';
import categoryReducer from './categorySlice';
import { persistedUserReducer } from './userSlice';
import { persistStore } from 'redux-persist';


export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    categories: categoryReducer,
    user: persistedUserReducer, 
  },
});
export const persistor = persistStore(store)
