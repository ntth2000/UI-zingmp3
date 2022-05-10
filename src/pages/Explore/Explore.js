import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import Media from "../../components/media/Media";
import DiscoverBtn from "../../components/discoverButton/DiscoverBtn";
import Card from "../../components/card/Card";
import Gallery from "../../UI/Gallery/Gallery";
import MySwiper from "../../UI/Swiper/MySwiper";
import "./Explore.css";
import Modal from "../../UI/Modal/Modal";
const Explore = () => {
  const [homeData, setHomeData] = useState();
  useEffect(function () {
    axios
      .get("http://localhost:8800/home")
      .then((res) => {
        setHomeData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="explore grid">
      {homeData && (
        <div className="section">
          {<Gallery items={homeData?.banner?.items} />}
        </div>
      )}
      {homeData?.playlists?.map((playlist) => {
        return (
          <div className="section" key={playlist.sectionId}>
            <div className="section__header">
              <h3 className="section__title">{playlist.title}</h3>
              {playlist.discover && <DiscoverBtn link="/" />}
            </div>
            <div className="section__content">
              <div className="row">
                {playlist.items
                  .filter((item, index) => index < 5)
                  .map((item) => {
                    return (
                      <div className="col l-2-4 m-3 c-4">
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
      {homeData?.zingchart && (
        <div className="explore__zingchart section">
          <div className="explore__zingchart-wrapper">
            <div className="explore__zingchart-header section__header">
              <h2>
                <Link
                  to="/zing-chart"
                  className="explore__zingchart-header-link"
                >
                  {homeData?.zingchart?.title}
                </Link>
              </h2>
              <div className="explore__zingchart-header-play btn is-hover-dark is28x28">
                <span className="explore__zingchart-header-icon">
                  <i className="bi bi-play-fill"></i>
                </span>
              </div>
            </div>
            <div className="section__content">
              <ul className="explore__zing-chart-list">
                {homeData?.zingchart?.items.map((item, index) => (
                  <li className="explore__zing-chart-item">
                    <Media
                      imageSize={60}
                      item={item}
                      ordinal={(index + 1).toString()}
                      index={index}
                    />
                  </li>
                ))}
              </ul>
              <div className="explore__zing-chart-btn">
                <Link to="/zing-chart" className="btn btn-3">
                  Xem thêm
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {homeData?.weeklychart && (
        <div className="section">
          <div className="section__content">
            <div className="grid">
              <div className="row">
                {homeData?.weeklychart?.items.map((item) => (
                  <div className="col l-4 m-4 c-4" key={item.playlistId}>
                    <a className="explore__weekly-chart zoom-in" href="">
                      <img
                        src={item.banner}
                        alt={item.name}
                        className="explore__weekly-chart-img"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {homeData?.singers && (
        <div className="section explore__singers">
          <div className="section__content">
            <MySwiper
              className={"explore__singers-swiper"}
              params={{
                spaceBetween: 30,
                slidesPerView: 7,
                modules: [Autoplay],
                slidesPerGroup: 7,
                navigation: true,
              }}
            >
              {homeData.singers.items.map((item) => (
                <SwiperSlide key={item.singerId}>
                  <div className="swiper-item">
                    <Link to="" className="explore__singer">
                      <img
                        className="explore__singer-img"
                        src={item.img}
                        alt={item.singerName}
                      />
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </MySwiper>
          </div>
        </div>
      )}
      {homeData?.top100 && (
        <div className="section" key={homeData?.top100.sectionId}>
          <div className="section__header">
            <h3 className="section__title">{homeData?.top100.title}</h3>
            <DiscoverBtn link="/top100" />
          </div>
          <div className="section__content">
            <div className="row">
              {homeData?.top100.items.map((item) => {
                return (
                  <div className="col l-2-4 m-3 c-4">
                    <Card
                      key={item.encodeId}
                      item={item}
                      showDesc={homeData?.top100.showDesc}
                      showArtists={homeData?.top100.showArtists}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {homeData?.newReleases && (
        <div className="section explore__new-release">
          <div className="section__header">
            <h2 className="section__title">Mới phát hành</h2>
            <DiscoverBtn link="/new-releases" />
          </div>
          <div className="section__content">
            <MySwiper
              params={{
                slidesPerView: 3,
                autoplay: {
                  delay: 1000 * 10,
                },
                loop: true,
                slidesPerGroup: 3,
                navigation: false,
              }}
              className={"explore__new-release-swiper"}
            >
              {homeData?.newReleases.items.map((item, index) => (
                <SwiperSlide key={item.encodeId}>
                  <div className="swiper-item">
                    <div className="explore__new-release-item">
                      <div className="explore__new-release-img-wrapper zoom-in is120x120">
                        <img
                          className="explore__new-release-img"
                          src={item.thumbnail}
                          alt={item.title}
                        />
                        <div className="btn is-hover-dark btn-circle is45x45 explore__new-release-icon">
                          <span className="btn__icon">
                            <i className="bi bi-play-fill"></i>
                          </span>
                        </div>
                      </div>
                      <div className="explore__new-release-info">
                        <h4 className="explore__new-release-name">
                          {item.title}
                        </h4>
                        <p className="explore__new-release-singers">
                          {item.artists.map((artist, index) => (
                            <>
                              {" "}
                              <a
                                href=""
                                className="explore__new-release-singer"
                                key={artist.id}
                              >
                                {artist.name}
                              </a>
                              {index < item.artists.length - 1 ? ", " : ""}
                            </>
                          ))}
                        </p>
                        <div className="explore__new-release-ordinal-date">
                          <span className="explore__new-release-ordinal">
                            #{index + 1}
                          </span>
                          <span className="explore__new-release-date">
                            {item.album.releaseDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <SwiperSlide>
                <div className="swiper-item">
                  <a
                    href="/new-releases"
                    className="explore__new-release-item view-all"
                  >
                    Xem tất cả
                  </a>
                </div>
              </SwiperSlide>
            </MySwiper>
          </div>
        </div>
      )}
      {homeData?.zingChoiceArtists && (
        <div className="section explore__zingchoice-artists">
          <div className="section__header">
            <h2 className="section__title">
              {homeData?.zingChoiceArtists.title}
            </h2>
          </div>
          <div className="section__content">
            <MySwiper
              params={{
                slidesPerView: 3,
                autoplay: {
                  delay: 1000 * 20,
                },
                loop: true,
                slidesPerGroup: 3,
                navigation: false,
              }}
              className={"explore__zingchoice-artists-swiper"}
            >
              {homeData?.zingChoiceArtists.items.map((item, index) => (
                <SwiperSlide key={item.encodeId}>
                  <div className="swiper-item">
                    <a href="" className="explore__zingchoice-artist zoom-in">
                      <div className="explore__zingchoice-artist-img-wrapper">
                        <img
                          className="explore__zingchoice-artist-img"
                          src={item.thumbnail}
                          alt={item.title}
                        />
                        <div className="btn is-hover-dark btn-circle is58x58 explore__zingchoice-artist-icon">
                          <span className="btn__icon">
                            <i className="bi bi-play-fill"></i>
                          </span>
                        </div>
                      </div>
                      <div className="explore__zingchoice-artist-info">
                        <h3 className="explore__zingchoice-artist-name">
                          {item.artistsNames}
                        </h3>
                        <div className="explore__zingchoice-artist-thumbs">
                          {item.song.items.map(
                            (item, index) =>
                              index < 4 && (
                                <div
                                  key={item.encodeId}
                                  style={{
                                    backgroundImage: `url(${item.thumbnail})`,
                                  }}
                                  className="explore__zingchoice-artist-thumb is64x64"
                                />
                              )
                          )}
                        </div>
                      </div>
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </MySwiper>
          </div>
        </div>
      )}
      {homeData?.partners && (
        <div className="section explore__partners">
          <div className="section__header">
            <a href="#modal-partners" className="section__title">
              {homeData?.partners.title}
            </a>
          </div>
          <div className="section__content">
            <div className="row">
              {homeData.partners.items.map((item, index) =>
                index !== 8 ? (
                  <div className="col l-1-5 m-3 c-3">
                    <div className="explore__partner">
                      <img className="explore__partner-img" src={item} />
                    </div>
                  </div>
                ) : (
                  <div className="col l-1-5 l-o-4-5 m-3 m-o-3 c-3 c-o-3">
                    <div className="explore__partner">
                      <img className="explore__partner-img" src={item} />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <Modal target="partners">
            <div className="partners">
              <div className="row">
                {homeData.partners.items.map((item, index) => (
                  <div className="col l-1-5 m-3 c-3">
                    <div className="explore__partner">
                      <img className="explore__partner-img" src={item} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Explore;
