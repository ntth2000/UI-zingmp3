import React, { useEffect, useRef } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import "./Card.css";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../store/playerSlice";
import { Link } from "react-router-dom";
import { uiActions } from "../../store/uiSlice";
const Card = ({ item, showDesc, showArtists }) => {
  const { isPlaying } = useSelector((state) => state.ui);
  const { idList, playingSongId } = useSelector((state) => state.player);
  const { encodeId, title, thumbnail, sortDescription, artists } = item;
  const cardPlayBtn = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
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
    cardPlayBtn.current.onclick = () => {
      isPlaying && pauseAudio();
      dispatch(uiActions.setPlaying(false));
      dispatch(playerActions.playPlaylist({ playlistId: encodeId }));
      dispatch(playerActions.setCurrentIndex(0));
      dispatch(uiActions.setCurrentTime(0));
      audio.currentTime = 0;
    };
  });
  return (
    <div className="card">
      <Link to="" className="card__top zoom-in">
        <div className="card__img-wrapper">
          <img src={thumbnail} className="card__img" alt={title} />
        </div>
        <div className="card__actions">
          <Tippy placement="top" content={"Thêm vào thư viện"}>
            <button className={`btn-circle is-hover-circle btn is32x32`}>
              <span className="btn__icon">
                <i className="bi bi-heart"></i>
              </span>
            </button>
          </Tippy>
          <div
            className="btn is-hover-dark btn-circle is45x45 card__action play"
            ref={cardPlayBtn}
          >
            <span className="btn__icon">
              <i className="bi bi-play-fill"></i>
            </span>
          </div>
          <Tippy placement="top" content={"Khác"}>
            <button className={`btn-circle is-hover-circle btn is32x32`}>
              <span className="btn__icon">
                <i className="bi bi-three-dots"></i>
              </span>
            </button>
          </Tippy>
        </div>
      </Link>
      <h5 className="card__title">
        <a href="" className="card__title-link">
          {title}
        </a>
      </h5>
      {showDesc && <p className="card__desc">{sortDescription}</p>}
      {showArtists && (
        <p className="card__singers">
          {artists.map((artist, index) => {
            if (index < 3) {
              return (
                <span>
                  <a className="card__singer" href="">
                    {artist.name}
                  </a>
                  {index < 2 ? ", " : ","}
                </span>
              );
            }
          })}
          ...
        </p>
      )}
    </div>
  );
};

export default Card;
