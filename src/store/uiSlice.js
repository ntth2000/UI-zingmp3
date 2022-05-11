import { createSlice } from "@reduxjs/toolkit";
const UI_SETTINGS = "ui-settings";
const initialState = JSON.parse(localStorage.getItem(UI_SETTINGS)) || {
  showSidePlaylist: false,
  isPlaying: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidePlaylist: (state) => {
      state.showSidePlaylist = !state.showSidePlaylist;
      localStorage.setItem(UI_SETTINGS, JSON.stringify(state));
    },
    // toggleMusic: (state) => {
    //   state.isPlaying = !state.isPlaying;
    //   localStorage.setItem(UI_SETTINGS, JSON.stringify(state));
    // },
    // stopMusic: (state) => {
    //   state.isPlaying = false;
    //   localStorage.setItem(UI_SETTINGS, JSON.stringify(state));
    // },
    // playMusic: (state) => {
    //   state.isPlaying = true;
    //   localStorage.setItem(UI_SETTINGS, JSON.stringify(state));
    // },
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
      localStorage.setItem(UI_SETTINGS, JSON.stringify(state));
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
