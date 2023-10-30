import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary-subtle">
      <div className="container-fluid">
        <div className="row">
          <div className="col-auto">
            <Link to="/" className="text-reset text-decoration-none fs-5">
              <i className="bi-house pe-1" />Home
            </Link>
          </div>
          <div className="col-auto">
            <Link to="/events" className="text-reset text-decoration-none fs-5">
              <i className="bi-calendar-event pe-1" />Events
            </Link>
          </div>
          <div className="col-auto">
            <Link to="/games" className="text-reset text-decoration-none fs-5">
              <i className="bi-joystick pe-1" />Games
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
