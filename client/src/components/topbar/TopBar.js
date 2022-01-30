import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../../context/Context";
import logo from "../../Images/White-Logo.png";
import DefaultProfilePhoto from "../../Images/Default-Profile-Photo.png";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http:localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid container-fluid-relative">
          <NavLink to="/" className="navbar-brand">
            <img src={logo} className="logo" alt="Codes4Real Logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse navbar-relative"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <NavLink className="nav-link items" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link items" to="/write">
                Write
              </NavLink>
              {user && (
                <span
                  onClick={handleLogout}
                  className="nav-link items logout-absolute"
                >
                  Logout
                </span>
              )}
              {user ? (
                <NavLink to="/settings">
                  <img
                    className="topImg-absolute"
                    src={
                      user.profilePic
                        ? PF + user.profilePic
                        : DefaultProfilePhoto
                    }
                    alt="Profile Picture"
                  />
                </NavLink>
              ) : (
                <>
                  <div className="d-inline">
                    <NavLink className="nav-link items" to="/login">
                      Login
                    </NavLink>
                  </div>
                  <div className="d-inline">
                    <NavLink className="nav-link items" to="/register">
                      Register
                    </NavLink>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
