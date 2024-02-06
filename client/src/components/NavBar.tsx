import { useAuth } from "react-oidc-context";
import { Link, useLocation } from "react-router-dom";

export const NavBar = () => {
  const location = useLocation()
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
  }
  return (
    <nav className="bg-primary shadow">
      <div className="container">
        <div className="row">
          <div className="col">
            <Link to="/" className="navbar-brand">
              <img
                className="img-fluid"
                id="navbar-logo"
                alt="Snow College Logo"
                src="/SnowCollegeLogo.png" />
            </Link>
          </div>
          <div className="col-auto my-auto">
            <Link to="/" className="text-reset text-decoration-none fs-5">
              <button className={`btn btn-primary fs-5 ${isActive("/") && "active"}`}>
                <i className="bi-house pe-1" />Home
              </button>
            </Link>
          </div>
          <div className="col-auto my-auto">
            <Link to="/competitions" className="text-reset text-decoration-none fs-5">
              <button className={`btn btn-primary fs-5 ${isActive("competitions") && "active"}`}>
                <i className="bi-calendar-event pe-1" />Competitions
              </button>
            </Link>
          </div>
          <div className="col-auto my-auto">
            <Link to="/games" className="text-reset text-decoration-none fs-5">
              <button className={`btn btn-primary fs-5 ${isActive("games") && "active"}`}>
                <i className="bi-joystick pe-1" />Games
              </button>
            </Link>
          </div>
          <div className="col-auto my-auto">
            {auth.user ? (
              <button className="btn btn-bold"
                onClick={logout}>Logout</button>
            ) : (
              <button className="btn btn-bold"
                onClick={login}>Login</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
