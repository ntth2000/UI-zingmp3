import React from "react";
import { NavLink } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "./Sidebar.css";
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <NavLink activeClassName="active" className="logo__wrapper" to="/">
          <img
            src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"
            alt="ZingMP3"
            className="logo__img l-logo__img"
          />
          <img
            src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.20/static/media/icon_zing_mp3_60.f6b51045.svg"
            alt="ZingMP3"
            className="logo__img s-logo__img"
          />
        </NavLink>
      </div>
      <nav className="nav">
        <ul className="nav__list">
          <li>
            <NavLink
              activeClassName="active"
              to="/my-music"
              className="nav__link"
            >
              <span className="nav__icon">
                <i className="bi bi-file-earmark-music"></i>{" "}
              </span>
              <span className="nav__text hide-on-tablet-mobile">Cá Nhân</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/" className="nav__link">
              <span className="nav__icon">
                <i className="bi bi-disc"></i>
              </span>
              <span className="nav__text hide-on-tablet-mobile">Khám phá</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="active"
              to="/zing-chart"
              className="nav__link"
            >
              <span className="nav__icon">
                {" "}
                <i className="bi bi-graph-up"></i>{" "}
              </span>
              <span className="nav__text hide-on-tablet-mobile">
                #zingchart
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/radio" className="nav__link">
              <span className="nav__icon">
                <i className="bi bi-boombox"></i>
              </span>
              <span className="nav__text hide-on-tablet-mobile">Radio</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="active"
              to="/follow"
              className="nav__link"
            >
              <span className="nav__icon">
                <i className="bi bi-file-earmark-text"></i>
              </span>
              <span className="nav__text hide-on-tablet-mobile">Theo dõi</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar__scrollbar">
        <div className="sidebar__scrollbar-track">
          <div className="sidebar__scrollbar-thumb"></div>
        </div>
        <div className="sidebar__scrollbar-shadow"></div>
        <div className="sidebar__scrollbar-wrapper">
          <nav className="nav">
            <ul className="nav__list">
              <li>
                <NavLink
                  activeClassName="active"
                  to="/new-releases"
                  className="nav__link"
                >
                  <span className="nav__icon">
                    <i className="bi bi-music-note-beamed"></i>{" "}
                  </span>
                  <span className="nav__text">Nhạc mới</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="active"
                  to="/genre"
                  className="nav__link"
                >
                  <span className="nav__icon">
                    <i className="bi bi-columns"></i>
                  </span>
                  <span className="nav__text">Thể loại</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="active"
                  to="/top100"
                  className="nav__link"
                >
                  <span className="nav__icon">
                    {" "}
                    <i className="bi bi-star"></i>{" "}
                  </span>
                  <span className="nav__text">Top 100</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="active"
                  to="/mv"
                  className="nav__link"
                >
                  <span className="nav__icon">
                    <i className="bi bi-play-btn"></i>
                  </span>
                  <span className="nav__text">MV</span>
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="sidebar__banner">
            <p className="sidebar__banner-text">
              Nghe nhạc không quảng cáo cùng kho nhạc VIP
            </p>
            <NavLink
              activeClassName="active"
              to=""
              className="sidebar__banner-btn"
            >
              Nâng cấp VIP
            </NavLink>
          </div>
          <div className="sidebar__library">
            <div className="sidebar__library-header">
              <h3 className="sidebar__library-heading">Thư viện</h3>
              <Tippy placement="top" content="Chỉnh sửa">
                <div className="sidebar__library-editor btn btn-circle is-hover-circle is26x26">
                  <span className="btn__icon">
                    <i className="bi bi-pencil"></i>
                  </span>
                </div>
              </Tippy>
            </div>
            <ul className="sidebar__library-list">
              <li className="sidebar__library-item">
                <NavLink
                  activeClassName="active"
                  to=""
                  className="sidebar__library-link"
                >
                  <img
                    className="sidebar__library-icon"
                    src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-song.cf0cb0b4.svg"
                    alt="Bài hát"
                  />
                  <span className="sidebar__library-text">Bài hát</span>
                </NavLink>
              </li>
              <li className="sidebar__library-item">
                <NavLink
                  activeClassName="active"
                  to=""
                  className="sidebar__library-link"
                >
                  <img
                    className="sidebar__library-icon"
                    src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-playlist.7e92a5f0.svg"
                    alt="Playlist"
                  />
                  <span className="sidebar__library-text">Playlist</span>
                </NavLink>
              </li>
              <li className="sidebar__library-item">
                <NavLink
                  activeClassName="active"
                  to=""
                  className="sidebar__library-link"
                >
                  <img
                    className="sidebar__library-icon"
                    src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-history.374cb625.svg"
                    alt="Gần đây"
                  />
                  <span className="sidebar__library-text">Gần đây</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="sidebar__create-playlist">
        <span className="sidebar__create-playlist-icon">
          <i className="bi bi-plus-lg"></i>{" "}
        </span>
        <span className="nav__text"></span>
        Tạo playlist mới
      </div>
    </aside>
  );
};

export default Sidebar;
