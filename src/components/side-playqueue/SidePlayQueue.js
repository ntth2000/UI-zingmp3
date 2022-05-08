import Media from "../media/Media";
import "./SidePlayQueue.css";
const SidePlayQueue = () => {
  return (
    <div className="side-play-queue">
      <header className="side-play-queue__header">
        <div className="side-play-queue__options">
          <span className="side-play-queue__option active">Danh sách phát</span>
          <span className="side-play-queue__option">Nghe gần đây</span>
        </div>
        <div className="side-play-queue__clock">
          <button className="btn btn-circle is32x32 is-hover-dark">
            <span className="btn__icon">
              <i className="bi bi-alarm"></i>
            </span>
            <span className="btn__name under">Hẹn giờ dừng phát nhạc</span>
          </button>
        </div>
        <div className="side-play-queue__more">
          <button className="btn btn-circle is32x32 is-hover-dark">
            <span className="btn__icon">
              <i className="bi bi-three-dots"></i>
            </span>
            <span className="btn__name under">Khác</span>
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
      </header>
      <main className="side-play-queue__songs with-scrollbar">
        <ul className="side-play-queue__list listened">
          <li className="side-play-queue__item active">
            <Media iconSize={26} />
          </li>
          <li className="side-play-queue__item">
            <Media iconSize={26} />
          </li>
          <li className="side-play-queue__item">
            <Media iconSize={26} />
          </li>
          <li className="side-play-queue__item">
            <Media iconSize={26} />
          </li>
        </ul>
        <div className="side-play-queue__separation">
          <h4 className="side-play-queue__separation-heading">Tiếp theo</h4>
          <p className="side-play-queue__separation-desc">
            Từ playlist
            <a href="" className="side-play-queue__separation-playlist-name">
              Những bài hát hay nhất của BigBang
            </a>
          </p>
        </div>
        <ul className="side-play-queue__list listened">
          <li className="side-play-queue__item">
            <Media iconSize={26} />
          </li>
          <li className="side-play-queue__item">
            <Media iconSize={26} />
          </li>
          <li className="side-play-queue__item">
            <Media iconSize={26} />
          </li>
          <li className="side-play-queue__item">
            <Media iconSize={26} />
          </li>
          <li className="side-play-queue__item">
            <Media iconSize={26} />
          </li>
        </ul>
      </main>
    </div>
  );
};
export default SidePlayQueue;
