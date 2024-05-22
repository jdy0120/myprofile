import themeStateSliceReducer from "./features/themeStateSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  theme: themeStateSliceReducer,
});

export default rootReducer;
