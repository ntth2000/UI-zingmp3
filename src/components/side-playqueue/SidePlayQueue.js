import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { MUSIC_PLAYER, playerActions } from "../../store/playerSlice";
import Media from "../media/Media";
import "./SidePlayQueue.css";
import useHttp from "../../hooks/useHttp";
const SidePlayQueue = () => {
  const dispatch = useDispatch();

  // const { isLoading, error, sendRequest } = useHttp();
  const [playlist, setPlaylist] = useState();
  const [queue, setQueue] = useState([]);
  const { playlistId, idList, isRandom, currentIndex, playingSongId } =
    useSelector((state) => state.player);
  const { showSidePlaylist } = useSelector((state) => state.ui);
  const [albumLink, setAlbumLink] = useState("");
  function shuffleQueue(array) {
    const copiedArray = [...array];
    for (let i = copiedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
    }
    return copiedArray;
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8800/playlist/${playlistId}`)
      .then((res) => {
        setPlaylist(res.data);
        const aliasTitle = res.data.link.split("/")[2];
        const link = "/album/" + aliasTitle + "/" + res.data.encodeId;
        setAlbumLink(link);
        const filteredVIPsongs = res.data.song.items.filter(
          (item) => item.streamingStatus !== 2
        );

        setQueue(filteredVIPsongs);

        const idList = filteredVIPsongs.map((item) => item.encodeId);
        dispatch(playerActions.setIdList(idList));
        const idListAndName = filteredVIPsongs.map((item) => ({
          id: item.encodeId,
          name: item.title,
        }));
        dispatch(playerActions.setIdListAndName(idListAndName));
        dispatch(playerActions.playSong(idList[currentIndex]));
      })
      .catch((error) => console.log(error));
  }, [playlistId]);

  useEffect(() => {
    if (playlist) {
      const newQueue = isRandom ? shuffleQueue(queue) : playlist.song.items;
      setQueue(newQueue);
      const idList = newQueue.map((item) => item.encodeId);
      dispatch(playerActions.setIdList(idList));
      dispatch(playerActions.setCurrentIndex(idList.indexOf(playingSongId)));
    }
  }, [isRandom]);

  return (
    <aside className={`side-play-queue${showSidePlaylist ? " active" : ""}`}>
      <header className="side-play-queue__header">
        <div className="side-play-queue__options">
          <span className="side-play-queue__option active">Danh sách phát</span>
          <span className="side-play-queue__option">Nghe gần đây</span>
        </div>
        <Tippy placement="bottom" content="Hẹn giờ dừng phát nhạc">
          <div className="side-play-queue__clock">
            <button className="btn btn-circle is32x32 is-hover-dark">
              <span className="btn__icon">
                <i className="bi bi-alarm"></i>
              </span>
            </button>
          </div>
        </Tippy>
        <Tippy placement="bottom" content="Khác">
          <div className="side-play-queue__more">
            <button className="btn btn-circle is32x32 is-hover-dark">
              <span className="btn__icon">
                <i className="bi bi-three-dots"></i>
              </span>
            </button>
            <div className="side-play-queue__dropdown menu">
              <ul className="menu__list">
                <li className="menu__item">
                  <span className="menu__icon">
                    <i className="bi bi-slash-circle"></i>
                  </span>
                  Xóa danh sách phát
                </li>
                <li className="menu__item">
                  <span className="menu__icon">
                    <i className="bi bi-slash-circle"></i>
                  </span>
                  Tải danh sách phát
                </li>
                <li className="menu__item">
                  <span className="menu__icon">
                    <i className="bi bi-badge-hd"></i>
                  </span>
                  Thêm vào playlist
                  <span className="menu__icon-right">
                    <i className="bi bi-chevron-right"></i>
                  </span>
                  {/* <div className="menu header__sidemenu">
                  <ul className="sub-menu__list quality-list">
                    <li className="sub-menu__item">
                      <h4 className="sub-menu__heading">
                        SQ <span className="sub-menu__heading-dot"></span> 128
                      </h4>
                      <span className="sub-menu__desc">
                        Giảm sử dụng dữ liệu cho các kết nối chậm hơn
                      </span>
                    </li>
                    <li className="sub-menu__item active">
                      <h4 className="sub-menu__heading">
                        HQ <span className="sub-menu__heading-dot"></span> 320
                      </h4>
                      <span className="sub-menu__desc">
                        Kết hợp tốt nhất giữa việc sử dụng dữ liệu và chất lượng
                        âm thanh
                      </span>
                    </li>
                  </ul>
                </div> */}
                </li>
              </ul>
            </div>
          </div>
        </Tippy>
      </header>
      <main className="side-play-queue__songs with-scrollbar">
        <ul className="side-play-queue__list listened">
          {queue?.map((item, index) =>
            currentIndex === index && index < queue.length - 1 ? (
              <>
                <li
                  className={`side-play-queue__item ${
                    index < currentIndex ? "played" : ""
                  }`}
                >
                  <Media
                    iconSize={26}
                    item={item}
                    playlistId={playlistId}
                    index={index}
                  />
                </li>
                <div className="side-play-queue__separation">
                  <h4 className="side-play-queue__separation-heading">
                    Tiếp theo
                  </h4>
                  <p className="side-play-queue__separation-desc">
                    Từ playlist
                    <Link
                      to={albumLink}
                      className="side-play-queue__separation-playlist-name"
                    >
                      {playlist?.title}
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <li
                className={`side-play-queue__item ${
                  index < currentIndex ? "played" : ""
                }`}
              >
                <Media
                  iconSize={26}
                  item={item}
                  playlistId={playlistId}
                  index={index}
                />
              </li>
            )
          )}
        </ul>
      </main>
    </aside>
  );
};
export default SidePlayQueue;
