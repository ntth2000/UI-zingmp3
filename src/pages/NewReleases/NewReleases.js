import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Media from "../../components/media/Media";
const NewReleases = () => {
  const [newReleasesData, setNewReleasesData] = useState();
  useEffect(function () {
    axios
      .get("http://localhost:8800/home/new-releases")
      .then((res) => setNewReleasesData(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="new-releases zingchart">
      {newReleasesData && (
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
