import { createSlice } from "@reduxjs/toolkit";

export interface themeStateType {
  theme: "light" | "dark";
}

const initialState: themeStateType = {
  theme: "light",
};

export const themeStateDataSlice = createSlice({
  name: "themeStateData",
  initialState,
  reducers: {
    setLight: (state) => {
      state.theme = "light";
    },
    setDark: (state) => {
      state.theme = "dark";
    },
  },
});

export const { setLight, setDark } = themeStateDataSlice.actions;
export default themeStateDataSlice.reducer;
