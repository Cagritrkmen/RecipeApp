import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  isLoggedIn: false,
  error: null,
};


export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const existingUsers = await axios.get('http://localhost:3001/users');
      const existingUser = existingUsers.data.find(user => user.username === userData.username);

      if (existingUser) {
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


export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, { rejectWithValue }) => {
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
      return rejectWithValue("Hatalı kullanıcı adı veya şifre");
    }
  }
);



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
