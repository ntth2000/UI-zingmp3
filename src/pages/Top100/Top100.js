import React, { useEffect, useState } from "react";
import DiscoverBtn from "../../components/discoverButton/DiscoverBtn";
import Card from "../../components/card/Card";
import Top100Banner from "../../UI/icons/Top100Banner";
import Error from "../../components/error/Error";
import useHttp from "../../hooks/useHttp";
import "./Top100.css";
const Top100 = () => {
  const [top100Data, setTop100Data] = useState();
  const { isFetching, error, sendRequest: fetchData } = useHttp();

  useEffect(() => {
    fetchData(
      {
        url: "http://localhost:8800/home/top00",
      },
      setTop100Data
    );
  }, []);
  return (
    <div className="top100">
      {isFetching && <span className="spinner"></span>}
      {error && <Error />}
      {!isFetching && !error && (
        <>
          <div className="top100__banner">
            <Top100Banner />
          </div>
          {top100Data?.map((playlist, index) => {
            return (
              <div className="section" key={index}>
                <div className="section__header">
                  <h3 className="section__title">{playlist.title}</h3>
                  {playlist.discover && <DiscoverBtn link="/" />}
                </div>
                <div className="section__content">
                  <div className="row">
                    {playlist.items.map((item) => {
                      return (
                        <div className="col l-2-4 m-3 c-4" key={item.encodeId}>
                          <Card
                            key={item.encodeId}
                            item={item}
                            showDesc={playlist.showDesc}
                            showArtists={playlist.showArtists}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Top100;
