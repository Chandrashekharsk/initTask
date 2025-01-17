import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    apiKey: null,
    token: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setApiKey: (state, action) => {
      state.apiKey = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.apiKey = null;
      state.token = null;
    },
  },
});

export const { setAuthUser, setApiKey, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
