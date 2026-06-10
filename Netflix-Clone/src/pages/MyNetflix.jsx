import { Link } from "react-router-dom";

function MyNetflix() {
  return (
    <>
      <div className="dropdown-menu">
        <Link to="/profile" className="menu-item">
          My Profile
        </Link>
        <Link to="/payment" className="menu-item">
          Payment
        </Link>
        <Link to="/" className="menu-item">
          Logout
        </Link>
      </div>
    </>
  );
}

export default MyNetflix;
