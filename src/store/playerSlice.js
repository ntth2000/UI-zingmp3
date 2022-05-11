import { createSlice } from "@reduxjs/toolkit";

export const MUSIC_PLAYER = "player";

const initialState = JSON.parse(localStorage.getItem(MUSIC_PLAYER)) || {
  currentIndex: 0,
  isRepeated: false,
  isRandom: false,
  volume: "20",
  playingSongId: "",
  playlistId: "",
  idList: [],
  idListAndName: [],
  playedList: [],
  fetchingSongStatus: {
    isFetching: false,
    error: null,
  },
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setIdList: (state, action) => {
      state.idList = action.payload;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(state));
    },
    setIdListAndName: (state, action) => {
      state.idListAndName = action.payload;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(state));
    },
    playSong: (state, action) => {
      state.playingSongId = action.payload;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(state));
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(state));
    },
    next: (state) => {
      if (state.currentIndex === state.idList.length - 1) {
        state.currentIndex = 0;
      } else {
        state.currentIndex++;
      }
      state.playingSongId = state.idList[state.currentIndex];
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(state));
    },
    prev: (state) => {
      if (state.currentIndex === 0) {
        state.currentIndex = state.idList.length - 1;
      } else {
        state.currentIndex--;
      }
      state.playingSongId = state.idList[state.currentIndex];
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(state));
    },
    playPlaylist: (state, action) => {
      state.playlistId = action.payload.playlistId;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(state));
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
    setFetchingStatus: (state, action) => {
      state.fetchingSongStatus = action.payload;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(state));
    },
  },
});
export const playerActions = playerSlice.actions;
export default playerSlice.reducer;
