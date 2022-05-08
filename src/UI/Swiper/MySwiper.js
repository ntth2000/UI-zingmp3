import React, { useRef } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./MySwiper.css";
SwiperCore.use([Navigation, Autoplay]);

const MySwiper = ({ children, className, params }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="my-swiper">
      <Swiper
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        loop={params.loop || false}
        slidesPerGroup={params.slidesPerGroup}
        slidesPerView={params.slidesPerView}
        modules={[Autoplay]}
        className={`${className}`}
        autoplay={params.autoplay || false}
        navigation={{
          prevEl: `.${className} .prev`,
          nextEl: `.${className} .next`,
        }}
      >
        {children}
      </Swiper>
      <button
        className={`arrow btn is-hover-dark prev${
          params.navigation ? "" : " hidden-btn"
        }`}
        ref={prevRef}
      >
        <i className="bi bi-chevron-left"></i>
      </button>
      <button
        className={`arrow btn is-hover-dark next${
          params.navigation ? "" : " hidden-btn"
        }`}
        ref={nextRef}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
};
export default MySwiper;
