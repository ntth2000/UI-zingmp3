import { useEffect, useState, useRef } from "react";
import Media from "../../components/media/Media";
import Error from "../../components/error/Error";
import useHttp from "../../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../store/playerSlice";
import { uiActions } from "../../store/uiSlice";
const NewReleases = () => {
  const dispatch = useDispatch();
  const { isPlaying } = useSelector((state) => state.ui);
  const { playlistId } = useSelector((state) => state.player);

  const [newReleasesData, setNewReleasesData] = useState();
  const { isFetching, error, sendRequest: fetchData } = useHttp();
  const albumPlayBtn = useRef();

  useEffect(() => {
    fetchData(
      {
        url: "http://localhost:8800/home/new-releases",
      },
      setNewReleasesData
    );
  }, []);
  useEffect(() => {
    const playBtn = document.querySelector(".player__action.play");
    const audio = document.querySelector(".player__audio");
    const albumPlayBtn = document.querySelector(
      ".new-releases .zingchart__header-play"
    );
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
    console.log(albumPlayBtn);
    // albumPlayBtn.onclick = () => {
    //   if (newReleasesData.encodedId !== playlistId) {
    //     isPlaying && pauseAudio();
    //     dispatch(uiActions.setPlaying(false));
    //     dispatch(
    //       playerActions.playPlaylist({ playlistId: newReleasesData.encodedId })
    //     );
    //     dispatch(playerActions.setCurrentIndex(0));
    //     audio.currentTime = 0;
    //   } else {
    //     playBtn.click();
    //   }
    // };
  }, []);
  return (
    <div className="new-releases zingchart">
      {isFetching && <span className="spinner"></span>}
      {error && <Error />}
      {!isFetching && !error && newReleasesData && (
        <div className="zingchart__section top100">
          <header className="zingchart__header">
            <h2 className="zingchart__title">{newReleasesData.title}</h2>
            <div className="zingchart__header-play btn is-hover-dark is40x40">
              <span className="zingchart__header-icon">
                <i className="bi bi-play-fill"></i>
              </span>
            </div>
          </header>
          <div className="section__content">
            <ul className="explore__zing-chart-list">
              {newReleasesData?.items.map((item, index) => (
                <li className="zingchart__top100-item" key={item.encodedId}>
                  <Media
                    imageSize={40}
                    item={item}
                    ordinal={(index + 1).toString()}
                    playlistId={newReleasesData.encodedId}
                    index={index}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default NewReleases;
