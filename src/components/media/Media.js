import React from "react";
import "./Media.css";
const Media = ({
  item,
  iconSize = 26,
  paddingSize = 8,
  imageSize = 40,
  ordinal = false,
}) => {
  const duration = item
    ? `${Math.floor(item.duration / 60)
        .toString()
        .padStart(2, "0")}:${Math.floor(item.duration % 60)
        .toString()
        .padStart(2, "0")}`
    : 120;
  return (
    <div className={`media padding${paddingSize}x${paddingSize}`}>
      <div className="media__left">
        {ordinal && (
          <>
            <span className={`media__ordinal ordinal-${ordinal}`}>
              {ordinal}
            </span>
            <span className="media__ordinal-separator"></span>
          </>
        )}
        <a
          href=""
          className={`media__img is${imageSize}x${imageSize}`}
          style={{
            backgroundImage: `url(${
              item
                ? item.thumbnail
                : "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/6/7/2/6/6726852445831142a43c99695e470d3b.jpg"
            })`,
          }}
        >
          <div className="media__icon-wrapper">
            <span className="media__icon">
              <i className="bi bi-play-fill"></i>
            </span>
          </div>
        </a>
        <div className="media__info">
          <h4 className="media__name">
            {item
              ? item.title
              : "Danh sách phátNghe gần đây Go! DK Tiếp theo Từ playlistNhững bài hát hay nhất của BigBang"}
          </h4>
          <p className="media__singers">
            {item?.artists.map((artist, index) => (
              <>
                <a className="media__singer" href="">
                  {artist.name}
                </a>
                {index < item.artists.length - 1 ? ", " : ""}
              </>
            ))}
          </p>
        </div>
      </div>
      <div className="media__center">
        <a href="" className="media__album">
          {item ? item?.album?.title : ""}
        </a>
      </div>
      <div className="media__right">
        <div className={`media__actions`}>
          <div
            className={`btn-circle is-hover-circle btn is${iconSize}x${iconSize} disabled`}
          >
            <span className="btn__icon">
              <i class="bi bi-mic"></i>
            </span>
            <span className="btn__name">Phát cùng lời bài hát</span>
          </div>
          <div
            className={`btn-circle is-hover-circle btn is${iconSize}x${iconSize} like`}
          >
            <span className="btn__icon">
              <i className="bi bi-heart"></i>
            </span>
            <span className="btn__name">Thêm vào thư viện</span>
          </div>
          <div
            className={`btn-circle is-hover-circle btn is${iconSize}x${iconSize}`}
          >
            <span className="btn__icon">
              <i className="bi bi-three-dots"></i>
            </span>
            <span className="btn__name">Khác</span>
          </div>
        </div>
        <div className="media__duration">{duration}</div>
      </div>
    </div>
  );
};

export default Media;
