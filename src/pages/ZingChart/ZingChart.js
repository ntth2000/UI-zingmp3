import { useEffect, useState } from "react";
import Error from "../../components/error/Error";
import Media from "../../components/media/Media";
import "./ZingChart.css";
import useHttp from "../../hooks/useHttp";
const ZingChart = () => {
  const [showAllTop100, setShowAllTop100] = useState(false);
  const [zingChartData, setZingChartData] = useState();
  const { isFetching, error, sendRequest: fetchData } = useHttp();

  useEffect(() => {
    fetchData(
      {
        url: "http://localhost:8800/home/zing-chart",
      },
      setZingChartData
    );
  }, []);

  return (
    <div className="zingchart">
      {isFetching && <span className="spinner"></span>}
      {error && <Error />}
      {!isFetching && !error && (
        <>
          <div className="zingchart__section top100">
            <header className="zingchart__header">
              <h2 className="zingchart__title">#zingchart</h2>
              <div className="zingchart__header-play btn is-hover-dark is40x40">
                <span className="zingchart__header-icon">
                  <i className="bi bi-play-fill"></i>
                </span>
              </div>
            </header>
            <div className="section__content">
              <ul className="zingchart__top100-list">
                {zingChartData?.RTChart.items.map((item, index) => {
                  if (index < 10) {
                    return (
                      <li
                        className="zingchart__top100-item"
                        key={item.encodedId}
                      >
                        <Media
                          index={index}
                          playlistId={zingChartData?.RTChart.playlistId}
                          imageSize={40}
                          item={item}
                          ordinal={(index + 1).toString()}
                        />
                      </li>
                    );
                  } else {
                    return (
                      showAllTop100 && (
                        <li
                          className="zingchart__top100-item"
                          key={item.encodedId}
                        >
                          <Media
                            index={index}
                            imageSize={40}
                            item={item}
                            ordinal={(index + 1).toString()}
                          />
                        </li>
                      )
                    );
                  }
                })}
              </ul>
              {!showAllTop100 && (
                <div
                  className="zingchart__show-all"
                  onClick={() => setShowAllTop100(true)}
                >
                  <span className="btn btn-3">Xem top 100</span>
                </div>
              )}
            </div>
          </div>
          <div className="zingchart__section weekly">
            <header className="zingchart__header">
              <h2 className="zingchart__title">B???ng x???p h???ng tu???n</h2>
            </header>
            <div className="row">
              <div className="col l-4 m-12 c-12">
                <div className="zingchart__weekly">
                  <header className="zingchart__weekly-header">
                    <h3 className="zingchart__weekly-title">
                      <a className="zingchart__weekly-header-link" href="">
                        Vi???t Nam
                      </a>
                    </h3>
                    <div className="zingchart__header-play btn is-hover-dark is28x28">
                      <span className="zingchart__header-icon">
                        <i className="bi bi-play-fill"></i>
                      </span>
                    </div>
                  </header>
                  <ul>
                    {zingChartData?.weekChart.vn.items.map(
                      (item, index) =>
                        index < 5 && (
                          <li
                            className="zingchart__weekly-item"
                            key={item.encodedId}
                          >
                            <Media
                              index={index}
                              playlistId={zingChartData.weekChart.vn.playlistId}
                              imageSize={40}
                              item={item}
                              ordinal={(index + 1).toString()}
                            />
                          </li>
                        )
                    )}
                  </ul>
                  <div className="zingchart__show-all">
                    <a href="/zing-chart" className="btn btn-3">
                      Xem t???t c???
                    </a>
                  </div>
                </div>
              </div>
              <div className="col l-4 m-12 c-12">
                <div className="zingchart__weekly">
                  <header className="zingchart__weekly-header">
                    <h3 className="zingchart__weekly-title">
                      <a className="zingchart__weekly-header-link" href="">
                        US-UK
                      </a>
                    </h3>
                    <div className="zingchart__header-play btn is-hover-dark is28x28">
                      <span className="zingchart__header-icon">
                        <i className="bi bi-play-fill"></i>
                      </span>
                    </div>
                  </header>
                  <ul>
                    {zingChartData?.weekChart.us.items.map(
                      (item, index) =>
                        index < 5 && (
                          <li
                            className="zingchart__weekly-item"
                            key={item.encodedId}
                          >
                            <Media
                              index={index}
                              playlistId={zingChartData.weekChart.us.playlistId}
                              imageSize={40}
                              item={item}
                              ordinal={(index + 1).toString()}
                            />
                          </li>
                        )
                    )}
                  </ul>
                  <div className="zingchart__show-all">
                    <a href="/zing-chart" className="btn btn-3">
                      Xem t???t c???
                    </a>
                  </div>
                </div>
              </div>
              <div className="col l-4 m-12 c-12">
                <div className="zingchart__weekly">
                  <header className="zingchart__weekly-header">
                    <h3 className="zingchart__weekly-title">
                      <a className="zingchart__weekly-header-link" href="">
                        K-Pop
                      </a>
                    </h3>
                    <div className="zingchart__header-play btn is-hover-dark is28x28">
                      <span className="zingchart__header-icon">
                        <i className="bi bi-play-fill"></i>
                      </span>
                    </div>
                  </header>
                  <ul>
                    {zingChartData?.weekChart.korea.items.map(
                      (item, index) =>
                        index < 5 && (
                          <li
                            className="zingchart__weekly-item"
                            key={item.encodedId}
                          >
                            <Media
                              index={index}
                              playlistId={
                                zingChartData.weekChart.korea.playlistId
                              }
                              imageSize={40}
                              item={item}
                              ordinal={(index + 1).toString()}
                            />
                          </li>
                        )
                    )}
                  </ul>
                  <div className="zingchart__show-all">
                    <a href="/zing-chart" className="btn btn-3">
                      Xem t???t c???
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default ZingChart;
