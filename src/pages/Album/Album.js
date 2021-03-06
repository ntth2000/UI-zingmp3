import React, { useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import axios from "axios";
import { data } from "./dummyData";
import MediaSinger from "../../components/media/mediaSinger/MediaSinger";
import Media from "../../components/media/Media";
import "./Album.css";
import iconPlayingGif from "../../assets/icon-playing-gif.gif";
import { useLocation, useMatch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../store/playerSlice";
import { uiActions } from "../../store/uiSlice";
const Album = () => {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const [albumDetail, setAlbumDetail] = useState();
  const albumPlayBtn = useRef();
  const { isPlaying } = useSelector((state) => state.ui);
  const { playlistId } = useSelector((state) => state.player);
  useEffect(() => {
    axios
      .get("http://localhost:8800/playlist/" + albumId)
      .then((res) => {
        setAlbumDetail(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, [albumId]);

  //   function animation(element) {
  //     return element.animate(
  //       [{ transform: "rotate(0)" }, { transform: "rotate(360deg)" }],
  //       {
  //         duration: 1000 * 20,
  //         iterations: Infinity,
  //       }
  //     );
  //   }

  //   useEffect(() => {
  //     const albumThumbnal = document.querySelector(".album__img");
  //     const animate = animation(albumThumbnal);
  //     animate.pause();
  //     if (isPlaying && albumId === playlistId) {
  //       animate.play();
  //     } else {
  //       animate.pause();
  //     }
  //     return animate.remove()
  //   }, [isPlaying]);
  useEffect(() => {
    const audio = document.querySelector(".player__audio");
    const playBtn = document.querySelector(".player__action.play");

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
    albumPlayBtn.current.onclick = () => {
      if (albumId !== playlistId) {
        isPlaying && pauseAudio();
        dispatch(uiActions.setPlaying(false));
        dispatch(playerActions.playPlaylist({ playlistId: albumId }));
        dispatch(playerActions.setCurrentIndex(0));
        audio.currentTime = 0;
      } else {
        playBtn.click();
      }
    };
  }, []);
  let btnPlayText = "Ph??t t???t c???";
  if (playlistId === albumId) {
    btnPlayText = isPlaying ? "T???m d???ng" : "Ti???p t???c ph??t";
  }
  return (
    <div
      className={`album ${isPlaying && albumId === playlistId && "playing"}`}
    >
      <div className="album__main-content">
        <div className="album__info">
          <div to="" className="album__top zoom-in is300x300">
            <div className="album__img-wrapper">
              <img
                src={albumDetail?.thumbnailM}
                className={`album__img ${
                  isPlaying && albumId === playlistId ? "rotating" : ""
                }`}
                alt={albumDetail?.title}
              />
            </div>
            <div className="album__info-play" ref={albumPlayBtn}>
              <div className="btn is-hover-dark btn-circle is45x45 album__action play">
                {isPlaying && albumId === playlistId ? (
                  <img
                    src={iconPlayingGif}
                    className="album__icon-playing-active"
                  />
                ) : (
                  <span className="btn__icon">
                    <i className="bi bi-play-fill"></i>
                  </span>
                )}
              </div>
            </div>
          </div>
          <h3 className="album__title">{albumDetail?.title}</h3>
          <p className="album__update-time">C???p nh???t: 11/05/2022</p>
          <p className="album__singers">
            {albumDetail && albumDetail?.artists ? (
              albumDetail?.artists.map((artist, index) => (
                <>
                  <MediaSinger artist={artist} key={artist.id} />
                  {index < albumDetail?.artists.length - 1 ? ", " : ""}
                </>
              ))
            ) : (
              <span>
                {albumDetail?.artistsNames ? albumDetail?.artistsNames : ""}
              </span>
            )}
          </p>
          <p className="album__likes">
            {Math.floor(albumDetail?.like / 1000)}K ng?????i y??u th??ch
          </p>
          <button className="btn btn-1 album__info-play-btn" ref={albumPlayBtn}>
            <span className="album__info-btn-icon">
              {isPlaying ? (
                <i class="bi bi-pause-fill"></i>
              ) : (
                <i class="bi bi-play-fill"></i>
              )}
            </span>
            <span>{btnPlayText}</span>
          </button>
          <div className="album__actions">
            <Tippy placement="top" content={"Th??m v??o th?? vi???n"}>
              <button className={`btn-circle is-hover-circle btn is35x35`}>
                <span className="btn__icon">
                  <i className="bi bi-heart"></i>
                </span>
              </button>
            </Tippy>{" "}
            <Tippy placement="top" content={"Kh??c"}>
              <button className={`btn-circle is-hover-circle btn is35x35`}>
                <span className="btn__icon">
                  <i className="bi bi-three-dots"></i>
                </span>
              </button>
            </Tippy>
          </div>
        </div>
        <div className="album__playlist">
          {albumDetail?.description && (
            <p className="album__desc">
              L???i t???a{" "}
              <span className="album__desc-content">
                {albumDetail?.description}
              </span>
            </p>
          )}
          <div className="album__playlist-content">
            <div className="album__playlist-header">
              <div className="album__playlist-left">
                {/* <span className="album__playlist-sort">
                  <i class="bi bi-arrow-down-up"></i>
                </span> */}
                <span className="album__playlist-heading">B??i h??t</span>
              </div>
              <div className="album__playlist-center">
                <span className="album__playlist-heading">Album</span>
              </div>
              <div className="album__playlist-right">
                <span className="album__playlist-heading">Th???i gian</span>
              </div>
            </div>
            <ul className="album__playlist-list">
              {albumDetail?.song.items.map((item, index) => (
                <Media
                  index={index}
                  item={item}
                  mediaPlaylistId={albumDetail?.encodeId}
                  imageSize={40}
                />
              ))}
            </ul>
            <p className="album__song-numbers">
              {albumDetail?.song.items.length} b??i h??t
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;
