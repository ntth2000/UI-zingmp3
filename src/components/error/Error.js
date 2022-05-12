import { Link } from "react-router-dom";
import "./Error.css";
const Error = ({ msg = "Đã có lỗi xảy ra." }) => {
  return (
    <div className="error">
      <p className="error__msg">{msg}</p>
      <Link to="/" className="btn btn-1 error__btn">
        Trở lại trang chủ
      </Link>
    </div>
  );
};

export default Error;
