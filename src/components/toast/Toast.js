import React, { useEffect } from "react";

function Toast({ msg = "You got a massage!" }) {
  const prevToast = document.querySelector(".toast");
  if (!!prevToast) {
    prevToast.parentNode.removeChild(prevToast);
  }
  const toast = document.querySelector(".toast");
  const handleCloseToast = () => {
    toast.parentNode.removeChild(toast);
  };
  console.log(toast);

  useEffect(function () {
    const timeoutId = setTimeout(function () {
      toast.classList.add("slideOut");
    }, 1000);
  }, []);

  const app = document.querySelector(".app");
  app.innerHTML += `<div className="toast">
    <p className="toast__msg">${msg}</p>
    <span className="toast__close" onClick={handleCloseToast}>
      <i class="bi bi-x-lg"></i>
    </span>
  </div>`;
}

export default Toast;
