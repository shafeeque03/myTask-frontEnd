import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    user: null,
    permissions: [],
    routerLinks: [],
  },
  reducers: {
    userLogin: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.permissions = action.payload.permissions;
      state.routerLinks = action.payload.routerLinks;
    },
    userLogout: (state) => {
      state.user = null;
      state.token = "";
      state.permissions = [];
      state.routerLinks = [];
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
