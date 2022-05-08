import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice.js";
import playerReducer from "./playerSlice.js";

const store = configureStore({
  reducer: { auth: authReducer, player: playerReducer },
});

export default store;
