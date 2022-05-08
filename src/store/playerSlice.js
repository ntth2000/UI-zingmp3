import { createSlice } from "@reduxjs/toolkit";

const MUSIC_PLAYER = "player";

const initialState = JSON.parse(localStorage.getItem(MUSIC_PLAYER)) || {
  currentIndex: 0,
  isRepeated: true,
  isRandom: true,
  volume: "20",
  playingSongId: "ZZ9D7W76",
  playlistId: "IWZ9Z0BO",
  idList: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    next: (state) => {
      state.currentSongNumber++;
    },
    prev: (state) => {
      state.currentSongNumber--;
    },
    toggleRepeat: (state) => {
      state.isRepeated = !state.isRepeated;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(state));
    },
    toggleRandom: (state) => {
      state.isRandom = !state.isRandom;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(state));
    },
    adjustVolume: (state, action) => {
      state.volume = action.payload;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(state));
    },
  },
});
export const playerActions = playerSlice.actions;
export default playerSlice.reducer;
