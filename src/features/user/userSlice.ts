// src/features/user/userSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import {getProfile} from '../../lib/api/UserApi';
import {getBalance} from '../../lib/api/TransactionApi';

interface Profile {
  firstName: string;
  lastName: string;
  profileImage: string | null;
}

interface UserState {
  profile: Profile;
  balance: number;
  showBalance: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: {firstName: '', lastName: '', profileImage: null},
  balance: 0,
  showBalance: false,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk('user/fetchProfile', async () => {
  const response = await getProfile();
  return response.data.data;
});

export const fetchBalance = createAsyncThunk('user/fetchBalance', async () => {
  const response = await getBalance();
  return response.data.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setShowBalance: (state, action: PayloadAction<boolean>) => {
      state.showBalance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = {
          firstName: action.payload.first_name,
          lastName: action.payload.last_name,
          profileImage: action.payload.profile_image,
        };
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      // Balance
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.balance;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch balance';
      });
  },
});

export const {setShowBalance} = userSlice.actions;
export default userSlice.reducer;
