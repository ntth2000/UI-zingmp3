import React from "react";
import "./Card.css";
const Card = ({ item, showDesc, showArtists }) => {
  const { id, title, thumbnail, sortDescription, artists } = item;
  return (
    <div className="card">
      <a href="" className="card__top zoom-in">
        <div className="card__img-wrapper">
          <img src={thumbnail} className="card__img" alt={title} />
        </div>
        <div className="card__actions">
          <button className={`btn-circle is-hover-circle btn is32x32`}>
            <span className="btn__icon">
              <i className="bi bi-heart"></i>
            </span>
            <span className="btn__name">Thêm vào thư viện</span>
          </button>
          <div className="btn is-hover-dark btn-circle is45x45 card__action play">
            <span className="btn__icon">
              <i className="bi bi-play-fill"></i>
            </span>
          </div>
          <button className={`btn-circle is-hover-circle btn is32x32`}>
            <span className="btn__icon">
              <i className="bi bi-three-dots"></i>
            </span>
            <span className="btn__name">Khác</span>
          </button>
        </div>
      </a>
      <h5 className="card__title">
        <a href="" className="card__title-link">
          {title}
        </a>
      </h5>
      {showDesc && <p className="card__desc">{sortDescription}</p>}
      {showArtists && (
        <p className="card__singers">
          {artists.map((artist, index) => {
            if (index < 3) {
              return (
                <span>
                  <a className="card__singer" href="">
                    {artist.name}
                  </a>
                  {index < 2 ? ", " : ","}
                </span>
              );
            }
          })}
          ...
        </p>
      )}
    </div>
  );
};

export default Card;
