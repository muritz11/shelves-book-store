import { createSlice } from "@reduxjs/toolkit";
// import { signOut } from "firebase/auth";
// import { auth as firebaseAuth } from "../../firebase";

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
      //   await signOut(firebaseAuth);
      state.accessToken = "";
      localStorage.removeItem("axxToken");
      localStorage.removeItem("TFAVerified");
      window.location.replace("/");
    },
  },
});

export const { updateAccessToken, logOutUser } = auth.actions;
export default auth.reducer;
