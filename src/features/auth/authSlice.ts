import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthUser = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  phone?: string;
  favTeam?: string;
  area?: string;
  street?: string;
  number?: string;
  po?: string;
  municipality?: string;
  address?: {
    area?: string;
    street?: string;
    number?: string;
    po?: string;
    municipality?: string;
  };
};

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  loading: boolean;
};

type LoginSuccessPayload = {
  user: AuthUser;
  accessToken: string;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuth: (
      state,
      action: PayloadAction<{ user: AuthUser | null; accessToken: string | null }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.loading = false;
    },
    loginSuccess: (state, action: PayloadAction<LoginSuccessPayload>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.loading = false;
    },
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
    },
  },
});

export const { initializeAuth, loginSuccess, setUser, logout } = authSlice.actions;
export default authSlice.reducer;