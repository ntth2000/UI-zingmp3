import React, { useEffect } from "react";
import "./Gallery.css";
const Gallery = ({ items }) => {
  const galleryParams = {
    slidesPerView: 3,
    totalSlides: items.length,
  };

  useEffect(function () {
    const gallery = document.querySelector(".gallery");
    const buttons = gallery.querySelectorAll(".gallery .arrow");
    const galleryItems = document.querySelectorAll(".gallery-item");
    gallery.style.height = `${galleryItems[0]?.clientHeight}px`;

    const actives = [...gallery.querySelectorAll(".gallery-item.active")];
    activesPosition(actives, galleryParams.slidesPerView);

    const inactives = [
      ...gallery.querySelectorAll(".gallery-item:not(.active)"),
    ];
    inactivesPosition(
      inactives,
      galleryParams.slidesPerView,
      galleryParams.totalSlides
    );

    function createInterval() {
      const id = setInterval(function () {
        inactives.push(actives.shift());
        actives.push(inactives.shift());
        inactives[inactives.length - 1].classList.remove("active");
        activesPosition(actives, galleryParams.slidesPerView);

        inactivesPosition(
          inactives,
          galleryParams.slidesPerView,
          galleryParams.totalSlides
        );

        setTimeout(() => {
          actives[actives.length - 1].classList.add("active");
        }, 200);
      }, 3000);
      return id;
    }

    var intervalId = createInterval();
    var timeoutId = null;
    Array.from(buttons).forEach((button) => {
      button.onclick = function () {
        if (button.id === "next") {
          inactives.push(actives.shift());
          actives.push(inactives.shift());
          inactives[inactives.length - 1].classList.remove("active");
        } else {
          inactives.unshift(actives.pop());
          actives.unshift(inactives.pop());
          inactives[0].classList.remove("active");
        }
        activesPosition(actives, galleryParams.slidesPerView);

        inactivesPosition(
          inactives,
          galleryParams.slidesPerView,
          galleryParams.totalSlides
        );

        setTimeout(() => {
          if (button.id === "next") {
            actives[actives.length - 1].classList.add("active");
          } else {
            actives[0].classList.add("active");
          }
        }, 200);
      };
      button.onmousedown = function () {
        clearInterval(intervalId);
        timeoutId && clearTimeout(timeoutId);
      };
      button.onmouseup = function () {
        timeoutId = setTimeout(function () {
          intervalId = createInterval();
        }, 3000);
      };
    });
    window.addEventListener("resize", function () {
      gallery.style.height = `${galleryItems[0]?.clientHeight}px`;
      clearInterval(intervalId);
    });
    return () => {
      clearInterval(intervalId);
      timeoutId && clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="gallery">
      <span className="arrow btn is-hover-dark" id="prev">
        <i className="bi bi-chevron-left"></i>
      </span>
      <span className="arrow btn is-hover-dark" id="next">
        <i className="bi bi-chevron-right"></i>
      </span>
      <ul className="gallery-container">
        {items?.map((item, index) => (
          <li
            className={`gallery-item${
              index < galleryParams.slidesPerView ? " active" : ""
            }`}
            key={item.encodeId}
            style={{
              width: `calc(100%/${galleryParams.slidesPerView})`,
            }}
          >
            <div
              style={{
                backgroundImage: `url(${item.banner})`,
              }}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gallery;
function activesPosition(activesArray, slidesPerView) {
  activesArray.forEach(
    (item, index) =>
      (item.style.left = `calc(${index} * 100%/${slidesPerView})`)
  );
}
function inactivesPosition(inactivesArray, slidesPerView, totalSlides) {
  inactivesArray.forEach(
    (item, index) =>
      (item.style.left = `calc(${totalSlides - slidesPerView - index} * 100%/${
        totalSlides - slidesPerView + 3
      })`)
  );
}
// nextArrow.onclick = function () {
//   galleryWrapper.style.transform = `translateX(${
//     900 - galleryWrapperWidth
//   }px)`;
// };
// prevArrow.onclick = function () {
//   galleryWrapper.style.transform = `translateX(0)`;
// };
