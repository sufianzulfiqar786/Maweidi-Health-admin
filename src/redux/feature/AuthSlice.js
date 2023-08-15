// AuthSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    profile_pic: null,
  },
  reducers: {
    setAuthentication: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.profile_pic = action.payload.profile_pic;
    },
    clearAuthentication: state => {
      state.user = null;
      state.token = null;
      state.profile_pic = null;
    },
  },
});

export const { setAuthentication, clearAuthentication } = authSlice.actions;

export default authSlice.reducer;
