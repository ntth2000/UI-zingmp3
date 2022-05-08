import React, { useEffect, useRef } from "react";
import "./Modal.css";
const Modal = ({ children, target }) => {
  useEffect(() => {
    const modalOverlay = document.querySelector(".modal__overlay");
    const modalCloseBtn = document.querySelector(".modal__close");
    const modal = document.querySelector(`.modal`);
    modalOverlay.onclick = () => {
      modal.classList.remove("active");
    };
    modalCloseBtn.onclick = () => {
      modal.classList.remove("active");
    };
  });
  return (
    <div className="modal" target={target} id={`#modal-${target}`}>
      <div className="modal__overlay" href="#"></div>
      <div className="modal__content">
        <button className="btn modal__close is-hover-dark">
          <span className="btn__icon">
            <i className="bi bi-x-lg"></i>
          </span>
          <span className="btn__name">Đóng</span>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
