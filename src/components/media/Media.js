import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { playerActions } from "../../store/playerSlice";
import { uiActions } from "../../store/uiSlice";
import "./Media.css";
const Media = ({
  item,
  playlistId: mediaPlaylistId = null,
  iconSize = 26,
  paddingSize = 8,
  imageSize = 40,
  ordinal = false,
  index = 0,
}) => {
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
      dispatch(uiActions.setCurrentTime(0));
      setTimeout(() => {
        playAudio();
      }, 300);
    } else {
      if (item.encodeId !== playingSongId) {
        pauseAudio();
        dispatch(uiActions.setPlaying(false));
        audio.currentTime = 0;
        dispatch(playerActions.setCurrentIndex(index));
        dispatch(uiActions.setCurrentTime(0));
        setTimeout(() => {
          audio.play();
        }, 300);
      } else {
        playBtn.click();
      }
    }
    dispatch(playerActions.playSong(item.encodeId));
  };

  return (
    <div
      className={`media padding${paddingSize}x${paddingSize} ${
        item && idList[currentIndex] === item.encodeId ? "active" : ""
      } ${item.streamingStatus === 2 ? "vip" : ""}`}
    >
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
                src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
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
            {item?.artists.map((artist, index) => (
              <>
                <a className="media__singer" href="">
                  {artist.name}
                </a>
                {index < item.artists.length - 1 ? ", " : ""}
              </>
            ))}
          </p>
        </div>
      </div>
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
