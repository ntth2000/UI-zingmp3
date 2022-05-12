import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TippyHeadless from "@tippyjs/react/headless";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import "./Player.css";
import { playerActions } from "../../store/playerSlice";
import { uiActions } from "../../store/uiSlice";
const Player = () => {
  const $ = document.querySelector.bind(document);
  const dispatch = useDispatch();
  const {
    currentIndex,
    playingSongId,
    isRepeated,
    isRandom,
    volume,
    playlistId,
    idList,
  } = useSelector((state) => state.player);
  const { isPlaying, currentTime } = useSelector((state) => state.ui);
  const [song, setSong] = useState();
  const [nextSong, setNextSong] = useState();

  useEffect(() => {
    const fetchSong = async () => {
      console.log("player fetchsong");
      dispatch(
        playerActions.setFetchingStatus({
          isFetching: true,
          error: null,
        })
      );
      try {
        const res = await axios.get(
          `http://localhost:8800/song/${playingSongId}`
        );
        setSong(res.data);
        dispatch(
          playerActions.setFetchingStatus({
            isFetching: false,
            error: null,
          })
        );
      } catch (error) {
        dispatch(
          playerActions.setFetchingStatus({
            isFetching: false,
            error,
          })
        );
      }
    };
    fetchSong();
  }, [playingSongId]);

  useEffect(() => {
    const nextSongId = idList[currentIndex + 1];
    axios
      .get(`http://localhost:8800/song/${nextSongId}`)
      .then((res) => {
        setNextSong(res.data);
      })
      .catch((error) => console.log(error));
  }, [currentIndex]);

  useEffect(() => {
    //handle events
    const audio = $(".player__audio");
    const randomBtn = $(".player__action.random");
    const repeatBtn = $(".player__action.repeat");
    const nextBtn = $(".player__action.next");
    const prevBtn = $(".player__action.prev");
    const playBtn = $(".player__action.play");
    const volumeInput = $(".player__volume-input");
    const progress = $(".player__process-bar");
    const sidePlaylistBtn = $(".player__action.playlist");

    // Play video function
    async function playAudio() {
      if (audio.paused && !isPlaying) {
        return audio.play();
      }
    }

    // Pause audio function
    async function pauseAudio() {
      if (!audio.paused && isPlaying) {
        audio.pause();
      }
    }

    sidePlaylistBtn.onclick = () => {
      dispatch(uiActions.toggleSidePlaylist());
    };
    audio.onended = () => {
      dispatch(uiActions.setPlaying(false));
      audio.volume = 0;
      dispatch(uiActions.setCurrentTime(0));
      console.log("audio on ended set current time");
      if (isRepeated) {
        playAudio();
      } else {
        nextBtn.click();
      }
    };
    nextBtn.onclick = () => {
      pauseAudio();
      dispatch(uiActions.setPlaying(false));
      audio.currentTime = 0;
      console.log("nextbtn clicked set current time");
      dispatch(playerActions.next());

      setTimeout(() => {
        audio.play();
        audio.volume = volume / 100;
      }, 300);
    };
    prevBtn.onclick = () => {
      pauseAudio();
      dispatch(uiActions.setPlaying(false));
      dispatch(uiActions.setCurrentTime(0));
      dispatch(playerActions.prev());

      setTimeout(() => {
        audio.play();
      }, 300);
    };
    audio.onplay = () => {
      dispatch(uiActions.setPlaying(true));
    };
    audio.onpause = () => {
      dispatch(uiActions.setPlaying(false));
    };
    playBtn.onclick = () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    };
    volumeInput.oninput = (e) => {
      dispatch(playerActions.adjustVolume(e.target.value));
      audio.volume = e.target.value / 100;
    };
    randomBtn.onclick = () => {
      dispatch(playerActions.toggleRandom());
    };
    repeatBtn.onclick = () => {
      dispatch(playerActions.toggleRepeat());
    };
    progress.oninput = (e) => {
      if (audio.duration) {
        console.log(e.target.value);
        const seekTime = (e.target.value * audio.duration) / 100;
        audio.currentTime = seekTime;
      }
    };
    audio.ontimeupdate = function () {
      if (this.duration) {
        progress.value = (this.currentTime / this.duration) * 100;
        dispatch(uiActions.setCurrentTime(Math.floor(audio.currentTime)));
      }
    };
  }, []);

  return (
    <div className="player">
      <div className="player__wrapper">
        <div className="player__left">
          <div className="media">
            <a
              href=""
              className="media__img is64x64"
              style={{
                backgroundImage: `url(${
                  song
                    ? song.thumbnail
                    : "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/6/7/2/6/6726852445831142a43c99695e470d3b.jpg"
                })`,
              }}
            >
              <div className="media__icon-wrapper">
                <span className="media__icon">
                  <i className="bi bi-arrows-angle-expand"></i>
                </span>
              </div>
            </a>
            <div className="media__info">
              <h4 className="media__name">
                {song
                  ? song.title
                  : "Danh sách phátNghe gần đây Go! DK Tiếp theo Từ playlistNhững bài hát hay nhất của BigBang"}
              </h4>
              <p className="media__singers">
                {song?.artists.map((artist, index) => (
                  <>
                    <a className="media__singer" href="">
                      {artist.name}
                    </a>
                    {index < song.artists.length - 1 ? ", " : ""}
                  </>
                ))}
              </p>
            </div>
            <div className="media__actions">
              <Tippy placement="top" content={"Thêm vào thư viện"}>
                <div className="btn-circle is-hover-circle btn is32x32">
                  <span className="player__action-icon btn__icon">
                    <i className="bi bi-heart"></i>
                  </span>
                </div>
              </Tippy>
              <Tippy placement="top" content={"Xem thêm"}>
                <div className="btn-circle is-hover-circle btn is32x32">
                  <span className="player__action-icon btn__icon">
                    <i className="bi bi-three-dots"></i>
                  </span>
                </div>
              </Tippy>
            </div>
          </div>
        </div>
        <div className="player__center">
          <div className="player__main-control">
            <Tippy
              placement="top"
              content={isRandom ? "Tắt phát ngẫu nhiên" : "Bật phát ngẫu nhiên"}
            >
              <div
                className={`player__action random btn-circle is-hover-circle btn is32x32${
                  isRandom ? " active" : ""
                }`}
              >
                <span className="player__action-icon btn__icon">
                  <i className="bi bi-shuffle"></i>
                </span>
              </div>
            </Tippy>
            <div className="player__action btn-circle is-hover-circle btn is32x32 prev">
              <span className="player__action-icon btn__icon">
                <i className="bi bi-skip-start-fill"></i>
              </span>
            </div>
            <div className={`player__action play`}>
              {isPlaying ? (
                <span className="player__action-icon pause">
                  <i className="bi bi-pause"></i>
                </span>
              ) : (
                <span className="player__action-icon play">
                  <i className="bi bi-play-fill"></i>
                </span>
              )}
            </div>

            <TippyHeadless
              placement="top"
              render={(attrs) => (
                <div className="box" tabIndex="-1" {...attrs}>
                  <div className="tippy-content">
                    <div className="player__action-text next-song ">
                      <span className="action__name-next-song">
                        Phát tiếp theo
                      </span>
                      <div className="media">
                        <a
                          href=""
                          className="media__img is40x40"
                          style={{
                            backgroundImage:
                              `url(${nextSong?.thumbnail})` ||
                              "url(https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/6/7/2/6/6726852445831142a43c99695e470d3b.jpg)",
                          }}
                        ></a>
                        <div className="media__info">
                          <h4 className="media__name">
                            {nextSong?.title ||
                              "Danh sách phátNghe gần đây Go! DK Tiếp theo Từ playlistNhững bài hát hay nhất của BigBang"}
                          </h4>
                          <p className="media__singers">
                            {nextSong?.artists.map((artist, index) => (
                              <>
                                <a className="media__singer" href="">
                                  {artist.name}
                                </a>
                                {index < nextSong.artists.length - 1
                                  ? ", "
                                  : ""}
                              </>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            >
              <div className="player__action btn-circle is-hover-circle btn is32x32 next">
                <span className="player__action-icon btn__icon">
                  <i className="bi bi-skip-end-fill"></i>
                </span>
              </div>
            </TippyHeadless>

            <Tippy
              placement="top"
              content={
                isRepeated ? "Tắt phát lại tất cả" : "Bật phát lại tất cả"
              }
            >
              <div
                className={`player__action btn-circle is-hover-circle btn is32x32 repeat ${
                  isRepeated ? " active" : ""
                }`}
              >
                <span className="player__action-icon btn__icon">
                  <i className="bi bi-arrow-repeat"></i>
                </span>
              </div>
            </Tippy>
          </div>
          <div className="player__process">
            <span className="player__current-time">
              {song
                ? `${Math.floor(currentTime / 60)
                    .toString()
                    .padStart(2, "0")}:${Math.floor(currentTime % 60)
                    .toString()
                    .padStart(2, "0")}`
                : 120}
            </span>
            <input
              type="range"
              className="player__process-bar"
              min={0}
              max={100}
              style={{
                backgroundSize: `${
                  song ? (currentTime * 100) / song.duration : 0
                }%`,
              }}
            />
            <span className="player__song-length">
              {song
                ? `${Math.floor(song.duration / 60)
                    .toString()
                    .padStart(2, "0")}:${Math.floor(song.duration % 60)
                    .toString()
                    .padStart(2, "0")}`
                : 120}
            </span>
          </div>
        </div>
        <div className="player__right">
          {/* <Tippy placement="top" content={"Xem lời bài hát"}> */}
          <div className="player__action btn-circle is-hover-circle btn is32x32 disabled">
            <span className="player__action-icon btn__icon">
              <i className="bi bi-mic"></i>
            </span>
          </div>
          {/* </Tippy> */}
          <div className="player__action btn-circle is-hover-circle btn is32x32 disabled">
            <span className="player__action-icon btn__icon">
              <i className="bi bi-play-btn"></i>
            </span>
          </div>
          {/* <Tippy placement="top" content={"Chế độ cửa sổ"}> */}
          <div className="player__action btn-circle is-hover-circle btn is32x32 disabled">
            <span className="player__action-icon btn__icon">
              <i className="bi bi-fullscreen-exit"></i>
            </span>
          </div>
          {/* </Tippy> */}

          <div className={`player__volume`}>
            <div className="player__action btn-circle btn is32x32">
              {volume === "0" ? (
                <span className="player__volume-icon--mute">
                  <i className="bi bi-volume-mute"></i>
                </span>
              ) : (
                <span className="player__volume-icon--unmute">
                  <i className="bi bi-volume-up"></i>
                </span>
              )}
            </div>
            <input
              type="range"
              className="player__volume-input"
              min={0}
              max={100}
              step={1}
              defaultValue={volume}
              style={{
                backgroundSize: `${volume}%`,
              }}
            />
          </div>
          <Tippy placement="top" content={"Danh sách phát"}>
            <div className="player__action btn-circle btn playlist active">
              <span className="player__action-icon btn__icon">
                <i className="bi bi-music-note-list"></i>
              </span>
            </div>
          </Tippy>
        </div>
      </div>
      <audio
        src={song?.streaming["128"]}
        volume={volume}
        className="player__audio"
      />
    </div>
  );
};
export default Player;
