import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showSidePlaylist: false,
  isPlaying: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidePlaylist: (state) => {
      state.showSidePlaylist = !state.showSidePlaylist;
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
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
