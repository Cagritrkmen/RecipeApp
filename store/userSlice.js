import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';



const initialState = {
  user: null,
  isLoggedIn: false,
  error: null,
  isRegister: false,
  loadingUserDetails: false,
};


export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const existingUsers = await axios.get('http://localhost:3001/users');
      const existingUser = existingUsers.data.find(user => user.username === userData.username);

      if (existingUser) {
        return rejectWithValue('Kullanıcı adı zaten kullanımda');
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

export const updateUser = createAsyncThunk(
  'recipes/updateUser',
  async ({ id, values },{ rejectWithValue }) => {
    const response = await axios.put(`http://localhost:3001/users/${id}`, values);
    return response.data;
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
      return rejectWithValue(error.response.data.error);
    }
  }
);



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loadingUserDetails = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loadingUserDetails = false;
        state.user = action.payload;
        state.isLoggedIn = false;
        state.error = null;
        state.isRegister = true;
        toast.success(`Başarıyla kayıt oldunuz. Login sayfasına yönlendiriliyorsunuz`);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loadingUserDetails = false;
        state.error = action.error.message;
        state.isRegister = false;
        toast.error(`Kullanıcı adı zaten kullanımda`);
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loadingUserDetails = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loadingUserDetails = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
        toast.success(`Başarıyla giriş yaptınız. Hoşgeldiniz ${action.payload.username} :)`);

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingUserDetails = false;
        state.error = action.error.message;
        toast.error(`Hatalı kullanıcı adı veya şifre`);
        ;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loadingUserDetails = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.loadingUserDetails = false;
        toast.success(`Kullanıcı başarıyla güncellendi`);

      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingUserDetails = false;
        toast.error(`Kullanıcı güncellenemedi`);
      });

  },
});

export default userSlice.reducer;
