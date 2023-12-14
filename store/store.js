// store.js
import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './recipeSlice';
import categoryReducer from './categorySlice';
import { persistedUserReducer } from './userSlice'; // persistedUserReducer'ı doğrudan import edin, userSlice export'larını kaldırın
import { persistStore } from 'redux-persist';


export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    categories: categoryReducer,
    user: persistedUserReducer, // persistedUserReducer'ı kullanın
  },
});
export const persistor = persistStore(store)
