import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Media from "../media/Media";
import "./Player.css";
import { playerActions } from "../../store/playerSlice";
const Player = () => {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  const dispatch = useDispatch();
  const { currentIndex, playingSongId, isRepeated, isRandom, volume } =
    useSelector((state) => state.player);

  const [song, setSong] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/song/${playingSongId}`)
      .then((res) => {
        setSong((prev) => res.data);
        console.log("song:", song);
      })
      .catch((error) => console.log(error));

    //handle events
    const audio = $(".player__audio");
    const randomBtn = $(".player__action.random");
    const repeatBtn = $(".player__action.repeat");
    const nextBtn = $(".player__action.next");
    const prevBtn = $(".player__action.prev");
    const playBtn = $(".player__action.play");
    const volumeInput = $(".player__volume-input");
    const progress = $(".player__process-bar");
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    audio.onplay = () => {
      setIsPlaying(true);
    };
    audio.onpause = () => {
      setIsPlaying(false);
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
      const seekTime = (e.target.value * song.duration) / 100;
      audio.currentTime = seekTime;
    };
    audio.ontimeupdate = function () {
      if (this.duration) {
        progress.value = (this.currentTime / this.duration) * 100;
        setCurrentTime(Math.floor(this.currentTime));
      }
    };
  }, [playingSongId]);
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
              <div className="btn-circle is-hover-circle btn is32x32">
                <span className="player__action-icon btn__icon">
                  <i className="bi bi-heart"></i>
                </span>
                <span className="player__action-text btn__name">
                  Thêm vào thư viện
                </span>
              </div>
              <div className="btn-circle is-hover-circle btn is32x32">
                <span className="player__action-icon btn__icon">
                  <i className="bi bi-three-dots"></i>
                </span>
                <span className="player__action-text btn__name">Xem thêm</span>
              </div>
            </div>
          </div>
        </div>
        <div className="player__center">
          <div className="player__main-control">
            <div
              className={`player__action random btn-circle is-hover-circle btn is32x32${
                isRandom ? " active" : ""
              }`}
            >
              <span className="player__action-icon btn__icon">
                <i className="bi bi-shuffle"></i>
              </span>
              <span className="player__action-text btn__name">
                Bật phát ngẫu nhiên
              </span>
            </div>
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
            <div className="player__action btn-circle is-hover-circle btn is32x32 next">
              <span className="player__action-icon btn__icon">
                <i className="bi bi-skip-end-fill"></i>
              </span>
              <div className="player__action-text btn__name next-song">
                <span className="action__name-next-song"> Phát tiếp theo </span>
                <div className="media">
                  <a
                    href=""
                    className="media__img is40x40"
                    style={{
                      backgroundImage:
                        "url(https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/6/7/2/6/6726852445831142a43c99695e470d3b.jpg)",
                    }}
                  ></a>
                  <div className="media__info">
                    <h4 className="media__name">
                      Danh sách phátNghe gần đây Go! DK Tiếp theo Từ
                      playlistNhững bài hát hay nhất của BigBang
                    </h4>
                    <a href="" className="media__singer">
                      DK
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`player__action btn-circle is-hover-circle btn is32x32 repeat ${
                isRepeated ? " active" : ""
              }`}
            >
              <span className="player__action-icon btn__icon">
                <i className="bi bi-arrow-repeat"></i>
              </span>
              <span className="player__action-text btn__name">
                Bật phát lại tất cả
              </span>
            </div>
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
          <div className="player__action btn-circle is-hover-circle btn is32x32 disabled">
            <span className="player__action-icon btn__icon">
              <i className="bi bi-mic"></i>
            </span>
          </div>
          <div className="player__action btn-circle is-hover-circle btn is32x32 disabled">
            <span className="player__action-icon btn__icon">
              <i className="bi bi-play-btn"></i>
            </span>
          </div>
          <div className="player__action btn-circle is-hover-circle btn is32x32">
            <span className="player__action-icon btn__icon">
              <i className="bi bi-fullscreen-exit"></i>
            </span>
            <span className="btn__name">Chế độ cửa sổ</span>
          </div>
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
          <div className="player__action btn-circle btn playlist active">
            <span className="player__action-icon btn__icon">
              <i className="bi bi-music-note-list"></i>
            </span>
            <span className="player__action-text btn__name">
              Danh sách phát
            </span>
          </div>
        </div>
      </div>
      <audio
        src={song?.streaming["128"]}
        volume={20}
        className="player__audio"
      />
    </div>
  );
};

export default Player;
