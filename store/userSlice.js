// userSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Kullanıcı kaydı (register) işlemi
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const existingUsers = await axios.get('http://localhost:3001/users');
      const existingUser = existingUsers.data.find(user => user.username === userData.username);

      if (existingUser) {
        // Kullanıcı adı mevcutsa hata döndür
        return rejectWithValue('Username already exists');
      }

      const response = await axios.post(
        'http://localhost:3001/users',
        userData
      );

      return response.data;
    } catch (error) {
      throw Error(error.response.data.error);
    }
  }
);


// Kullanıcı girişi (login) işlemi
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users?username=${userData.username}&password=${userData.password}`
      );

      if (response.data.length === 1) {
        return response.data[0];
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loadingUser: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loadingUser = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loadingUser = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loadingUser = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loadingUser = false;
        state.error = null;
        // Burada kullanıcı girişi başarılı olduğunda alınan işlemleri yapabilirsiniz
        // Örneğin, kullanıcıyı oturum açık olarak işaretleyebilir veya başka bir sayfaya yönlendirebilirsiniz
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
