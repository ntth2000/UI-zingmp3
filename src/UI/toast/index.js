export function toast(msg = "You got a massage!") {
  console.log("toast  running....");
  const prevToast = document.querySelector(".toast");
  if (!!prevToast) {
    prevToast.parentNode.removeChild(prevToast);
  }
  const app = document.querySelector(".app");
  app.innerHTML += `<div className="toast">
    <p className="toast__msg">${msg}</p>
    <span className="toast__close" onClick={handleCloseToast}>
      <i class="bi bi-x-lg"></i>
    </span>
  </div>`;
  const toast = document.querySelector(".toast");
  const handleCloseToast = () => {
    toast.parentNode.removeChild(toast);
  };
  console.log(toast);

  const timeoutId = setTimeout(function () {
    toast.classList.add("slideOut");
  }, 1000);
}
