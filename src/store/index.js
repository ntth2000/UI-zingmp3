import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice.js";
import playerReducer from "./playerSlice.js";
import uiReducer from "./uiSlice.js";

const store = configureStore({
  reducer: { auth: authReducer, player: playerReducer, ui: uiReducer },
});

export default store;
