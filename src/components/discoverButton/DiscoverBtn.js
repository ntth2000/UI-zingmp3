import "./DiscoverBtn.css";
import { Link } from "react-router-dom";
const DiscoverBtn = ({ link = "/" }) => {
  return (
    <Link to={link} className="discover-btn">
      Tất cả
      <span className="discover-btn__icon-right">
        <i className="bi bi-chevron-right"></i>
      </span>
    </Link>
  );
};
export default DiscoverBtn;
