import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLogin: false,
  },

  reducers: {
    authuser: (state, action) => {
      state.user = action.payload;
    },
    usertoken: (state, action) => {
      state.token = action.payload;
    },

    logout: (state, action) => {
      state.user = null;
      state.token = null;
      state.isLogin = false;
    },
    isLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { authuser, usertoken, logout, isLogin } = authSlice.actions;
export default authSlice.reducer;
``;
