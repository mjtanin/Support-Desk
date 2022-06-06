import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'))
console.log(user);

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  user: user ? user : null
}

export const register = createAsyncThunk(
  'auth/user',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {

      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async(user, thunkAPI) => {
    try {
      await authService.logout(user)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = actions.payload
      })
      .addCase(register.rejected, (state, actions) => {
        state.isLoading = false
        state.isError = true
        state.message = actions.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = actions.payload
      })
      .addCase(login.rejected, (state, actions) => {
        state.isLoading = false
        state.isError = true
        state.message = actions.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      
  }

})

export const { reset } = authSlice.actions
export default authSlice.reducer