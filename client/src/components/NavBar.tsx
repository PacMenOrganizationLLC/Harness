import { useAuth } from "react-oidc-context";
import { Link, useLocation } from "react-router-dom";

export const NavBar = () => {
  const location = useLocation();
  const isActive = (to: string) => {
    if (to === "/" && location.pathname === "/") {
      return true
    }
    if (to !== "/" && location.pathname.includes(to)) {
      return true
    }
  }

  const auth = useAuth();
  const logout = () => {
    auth.removeUser().then(() => auth.signoutRedirect());
  };
  const login = () => {
    auth.signinRedirect();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            className="img-fluid"
            alt="Logo"
            style={{ maxHeight: "12ex" }}
            src="/SCengineering_logo.png"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className={`nav-link`}>
                <button className={`btn btn-primary fs-5 ${isActive("/") && "active"}`}>
                  <i className="bi-house pe-1" />Home
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/competitions" className={`nav-link`}>
                <button className={`btn btn-primary fs-5 ${isActive("competitions") && "active"}`}>
                  <i className="bi-calendar-event pe-1" />Competitions
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/games" className={`nav-link`}>
                <button className={`btn btn-primary fs-5 ${isActive("games") && "active"}`}>
                  <i className="bi-joystick pe-1" />Games
                </button>
              </Link>
            </li>
            <li className="nav-item my-auto">
              {auth.user ? (
                <button className="btn btn-bold"
                  onClick={logout}>Logout</button>
              ) : (
                <button className="btn btn-bold"
                  onClick={login}>Login</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
