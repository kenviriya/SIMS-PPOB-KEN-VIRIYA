import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  isAuth: boolean;
};

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuth: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuth = true;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isAuth = false;
      localStorage.removeItem('token');
    },
  },
});

export const {setToken, logout} = authSlice.actions;
export default authSlice.reducer;
