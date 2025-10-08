import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Supabase user_metadata yapısı
export interface UserMetadata {
  email?: string | null;
  full_name?: string | null;
  name?: string | null;
  picture?: string | null;
}

export interface UserState {
  id: string | null;
  email: string | null;
  full_name: string | null;
  role: string | null;
  subscription_plan: string | null;
  isAuthenticated: boolean;
  user_metadata: UserMetadata | null;
}

const initialState: UserState = {
  id: null,
  email: null,
  full_name: null,
  role: null,
  subscription_plan: null,
  isAuthenticated: false,
  user_metadata: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload, { isAuthenticated: true });
    },
    clearUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
