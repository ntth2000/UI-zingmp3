import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { playerActions } from "../../store/playerSlice";
import { uiActions } from "../../store/uiSlice";
import "./Media.css";
import iconPlayingGif from "../../assets/icon-playing-gif.gif";
import MediaSinger from "./mediaSinger/MediaSinger";

const Media = ({
  item,
  playlistId: mediaPlaylistId = null,
  iconSize = 26,
  paddingSize = 8,
  imageSize = 40,
  ordinal = false,
  index = 0,
}) => {
  function toast(msg = "You got a massage!") {
    const app = document.querySelector(".App");

    // const prevToast = app.querySelector(".toast") || null;
    // if (!!prevToast) {
    //   prevToast.parentNode.removeChild(prevToast);
    // }
    app.innerHTML += `<div class="toast">
      <p class="toast__msg">${msg}</p>
      <span class="toast__close">
        <i class="bi bi-x-lg"></i>
      </span>
    </div>`;
    console.log("toast  running....");
    const toast = app.querySelector(".toast");
    const toastClose = toast.querySelector(".toast__close");

    const slideOutTimeoutId = setTimeout(function () {
      toast.classList.add("slideOut");
    }, 4000);
    const removeToastTimeoutId = setTimeout(function () {
      toast.parentNode.removeChild(toast);
    }, 5000);
    toastClose.onclick = () => {
      toast.parentNode.removeChild(toast);
      clearTimeout(slideOutTimeoutId);
      clearTimeout(removeToastTimeoutId);
    };
  }
  const dispatch = useDispatch();
  const {
    playingSongId,
    idList,
    playlistId,
    idListAndName,
    currentIndex,
    fetchingSongStatus,
  } = useSelector((state) => state.player);
  const { isPlaying } = useSelector((state) => state.ui);
  const duration = item
    ? `${Math.floor(item.duration / 60)
        .toString()
        .padStart(2, "0")}:${Math.floor(item.duration % 60)
        .toString()
        .padStart(2, "0")}`
    : 120;

  const mediaHandle = () => {
    const playBtn = document.querySelector(".player__action.play");
    const audio = document.querySelector(".player__audio");
    async function playAudio() {
      if (audio.paused && !isPlaying) {
        return audio.play();
      }
    }
    async function pauseAudio() {
      if (!audio.paused && isPlaying) {
        audio.pause();
      }
    }
    if (!idList.includes(item.encodeId)) {
      dispatch(
        playerActions.playPlaylist({
          playlistId: mediaPlaylistId || item.album.encodeId,
        })
      );
      isPlaying && pauseAudio();
      dispatch(uiActions.setPlaying(false));
      audio.currentTime = 0;
      dispatch(playerActions.setCurrentIndex(index));

      setTimeout(() => {
        playAudio();
      }, 300);
    } else {
      if (item.encodeId !== playingSongId) {
        pauseAudio();
        dispatch(uiActions.setPlaying(false));
        audio.currentTime = 0;
        dispatch(playerActions.setCurrentIndex(index));
        setTimeout(() => {
          audio.play();
        }, 300);
      } else {
        playBtn.click();
      }
    }
    dispatch(playerActions.playSong(item.encodeId));
  };
  const handleLikeBtn = () => {
    console.log("liekbtn clicked");
    toast("Chức năng này chưa được phát triển");
  };
  return (
    <div
      className={`media padding${paddingSize}x${paddingSize} ${
        item && idList[currentIndex] === item.encodeId ? "active" : ""
      } ${item.streamingStatus === 2 ? "vip" : ""}`}
      onClick={() => {
        console.log("media clicked");
      }}
    >
      {item && (
        <div className="media__left">
          {ordinal && (
            <>
              <span className={`media__ordinal ordinal-${ordinal}`}>
                {ordinal}
              </span>
              <span className="media__ordinal-separator"></span>
            </>
          )}
          <div
            onClick={mediaHandle}
            className={`media__img is${imageSize}x${imageSize}`}
            style={{
              backgroundImage: `url(${
                item
                  ? item.thumbnail
                  : "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/6/7/2/6/6726852445831142a43c99695e470d3b.jpg"
              })`,
            }}
          >
            <div className="media__icon-wrapper">
              {item &&
                idList[currentIndex] === item.encodeId &&
                fetchingSongStatus.isFetching && (
                  <span className="spinner"></span>
                )}

              {item &&
              idList[currentIndex] === item.encodeId &&
              !fetchingSongStatus.isFetching &&
              isPlaying ? (
                <img
                  src={iconPlayingGif}
                  className="media__icon-playing-active"
                />
              ) : (
                <span className="media__icon">
                  <i className="bi bi-play-fill"></i>
                </span>
              )}
            </div>
          </div>
          <div className="media__info">
            <h4 className="media__name">
              {item
                ? item.title
                : "Danh sách phátNghe gần đây Go! DK Tiếp theo Từ playlistNhững bài hát hay nhất của BigBang"}
              {item.streamingStatus === 2 && (
                <img
                  className="media__vip"
                  src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.24/static/media/vip-label.3dd6ac7e.svg"
                  alt="VIP"
                />
              )}
            </h4>
            <p className="media__singers">
              {item.artists ? (
                item?.artists.map((artist, index) => (
                  <>
                    <MediaSinger artist={artist} />
                    {index < item.artists.length - 1 ? ", " : ""}
                  </>
                ))
              ) : (
                <span>{item.artistsNames}</span>
              )}
            </p>
          </div>
        </div>
      )}
      <div className="media__center">
        <a href="" className="media__album">
          {item ? item?.album?.title : ""}
        </a>
      </div>
      <div className="media__right">
        <div className={`media__actions`}>
          {/* <Tippy placement="top" content={"Phát cùng lời bài hát"}> */}
          <div
            className={`btn-circle is-hover-circle btn is${iconSize}x${iconSize} with-lyrics disabled`}
          >
            <span>
              <i class="bi bi-mic"></i>
            </span>
          </div>
          {/* </Tippy> */}
          <Tippy placement="top" content={"Thêm vào thư viện"}>
            <div
              className={`btn-circle is-hover-circle btn is${iconSize}x${iconSize} like`}
              onClick={handleLikeBtn}
            >
              <span className="btn__icon">
                <i className="bi bi-heart"></i>
              </span>
            </div>
          </Tippy>
          <Tippy placement="top" content={"Khác"}>
            <div
              className={`btn-circle is-hover-circle btn is${iconSize}x${iconSize}`}
            >
              <span className="btn__icon">
                <i className="bi bi-three-dots"></i>
              </span>
            </div>
          </Tippy>
        </div>
        <div className="media__duration">{duration}</div>
      </div>
    </div>
  );
};

export default Media;
