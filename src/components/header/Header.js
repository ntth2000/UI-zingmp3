import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import ThemeIcon from "../../UI/icons/ThemeIcon";
import Themes from "../themes/Themes";
import Modal from "../../UI/Modal/Modal";
import "./Header.css";
const Header = () => {
  const headerThemeBtnRef = useRef();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isThemesPanelShowed, setIsThemesPanelShowed] = useState(false);
  const searchBarRef = useRef();
  const handleSearchInputFocus = () => {
    searchBarRef.current.classList.add("focus");
  };

  const handleSearchInputBlur = () => {
    searchBarRef.current.classList.remove("focus");
  };
  const showThemesPanel = () => {
    setIsThemesPanelShowed(true);
  };
  const hideThemesPanel = () => {
    setIsThemesPanelShowed(false);
  };
  useEffect(() => {
    const modalTheme = document.querySelector(".modal[target='themes']");
    const themeBtn = document.querySelector(".header .theme-btn");
    themeBtn.onclick = () => {
      modalTheme.classList.add("active");
    };
  }, []);
  return (
    <header className="header">
      <div className="header__left">
        <button
          className="header__arrow back"
          onClick={() => {
            console.log("arrow left");
          }}
        >
          <i className="bi bi-arrow-left"></i>
        </button>
        <button
          className="header__arrow forward disabled"
          onClick={() => {
            console.log("arrow right");
          }}
        >
          <i className="bi bi-arrow-right"></i>
        </button>
        <div className="header__search" ref={searchBarRef}>
          <div className="header__search-bar">
            <button className="header__search-icon">
              <i className="bi bi-search"></i>
            </button>
            <input
              type="text"
              className="header__search-input"
              placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
              onBlur={handleSearchInputBlur}
              onFocus={handleSearchInputFocus}
            />
            <button className="header__search-clear">
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="header__suggest">
            <ul className="header__suggest-list">
              <h4 className="header__suggest-heading">Từ khóa liên quan</h4>
              <li className="header__suggest-item">
                <span className="header__suggest-icon">
                  <i className="bi bi-search"></i>
                </span>
                về nghe mẹ ruvề nghe mẹ ruvề nghe mẹ ruvề nghe mẹ ruvề nghe mẹ
                ruvề nghe mẹ ruvề nghe mẹ ru
              </li>

              <li className="header__suggest-item">
                <span className="header__suggest-icon">
                  <i className="bi bi-search"></i>
                </span>
                về nghe mẹ ru
              </li>
              <li className="header__suggest-item">
                <span className="header__suggest-icon">
                  <i className="bi bi-search"></i>
                </span>
                về nghe mẹ ru
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="header__right">
        <div className="theme header__right-item">
          <button
            onClick={showThemesPanel}
            className="btn-circle is-hover-dark btn is40x40 theme-btn"
            ref={headerThemeBtnRef}
          >
            <span className="btn__icon">
              <ThemeIcon />
            </span>
            <span className="btn__name under user__action-name">Chủ đề</span>
          </button>
        </div>
        <div className="vip header__right-item">
          <button className="btn-circle is-hover-dark btn is40x40">
            <span className="btn__icon">
              <i className="bi bi-gem"></i>
            </span>
            <span className="btn__name under user__action-name">
              Nâng cấp VIP
            </span>
          </button>
        </div>
        <div className="upload header__right-item">
          <label
            className="btn-circle is-hover-dark btn is40x40 "
            htmlFor="song-upload"
          >
            <span className="btn__icon">
              <i className="bi bi-upload"></i>
            </span>
            <span className="btn__name under user__action-name">Tải lên</span>
          </label>
        </div>
        <div className="setting header__right-item">
          <button className="btn-circle is-hover-dark btn is40x40">
            <span className="btn__icon">
              <i className="bi bi-gear"></i>
            </span>
            <span className="btn__name under user__action-name">Cài đặt</span>
          </button>
          <div className="header__dropdown menu">
            <ul className="menu__list">
              <li className="menu__item">
                <span className="menu__icon">
                  <i className="bi bi-slash-circle"></i>
                </span>
                Danh sách chặn
              </li>
              <li className="menu__item">
                <span className="menu__icon">
                  <i className="bi bi-badge-hd"></i>
                </span>
                Chất lượng nhạc
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
              <li className="menu__item">
                <span className="menu__icon">
                  <i className="bi bi-play-circle"></i>
                </span>
                Giao diện
                <span className="menu__icon-right">
                  <i className="bi bi-chevron-right"></i>
                </span>
              </li>
              <div className="menu__separation"></div>
              <li className="menu__item bottom">
                <span className="menu__icon">
                  <i className="bi bi-info-circle"></i>
                </span>
                Giới thiệu
              </li>
              <li className="menu__item bottom">
                <span className="menu__icon">
                  <i className="bi bi-flag"></i>
                </span>
                Góp ý
              </li>
              <li className="menu__item bottom">
                <span className="menu__icon">
                  <i className="bi bi-telephone"></i>
                </span>
                Liên hệ
              </li>
              <li className="menu__item bottom">
                <span className="menu__icon">
                  <i className="bi bi-badge-ad"></i>
                </span>
                Quảng cáo
              </li>
              <li className="menu__item bottom">
                <span className="menu__icon">
                  <i className="bi bi-file-earmark-text"></i>
                </span>
                Thỏa thuận sử dụng
              </li>
              <li className="menu__item bottom">
                <span className="menu__icon">
                  <i className="bi bi-shield-check"></i>
                </span>
                Chính sách bảo mật
              </li>
            </ul>
          </div>
        </div>
        <div className="avatar header__right-item">
          <button className="btn-circle is-hover-dark btn is40x40">
            <img
              src={
                isLoggedIn
                  ? "https://s120-ava-talk-zmp3.zmdcdn.me/3/b/1/e/8/120/9ebf2da52dd62a352c4a1a6660df55e5.jpg"
                  : "https://avatar.talk.zdn.vn/default"
              }
              alt="Avatar"
              className="header__avatar"
            />
          </button>
          <div className="header__dropdown menu">
            <ul className="menu__list">
              <li className="menu__item">
                <span className="menu__icon">
                  <i className="bi bi-gem"></i>
                </span>
                Nâng cấp VIP
              </li>
              <li className="menu__item">
                <span className="menu__icon">
                  <i className="bi bi-gem"></i>
                </span>
                Mua code VIP
              </li>
              <div className="menu__separation"></div>
              <li className="menu__item">
                <span className="menu__icon">
                  <i className="bi bi-box-arrow-right"></i>
                </span>
                Đăng xuất
              </li>
            </ul>
          </div>
        </div>
        <input type="file" id="song-upload" className="song-upload__input" />
      </div>
      <Modal target={"themes"}>
        <Themes />
      </Modal>
    </header>
  );
};

export default Header;
