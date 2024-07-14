import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    accessToken: "",
  },
  reducers: {
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logOutUser: (state) => {
      state.accessToken = "";
      localStorage.removeItem("accessToken");
      window.location.replace("/");
    },
  },
});

export const { updateAccessToken, logOutUser } = auth.actions;
export default auth.reducer;
