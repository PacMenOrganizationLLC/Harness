import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="row">
          <div className="col-auto">
            <Link to="/" className="text-reset text-decoration-none">
              Home
            </Link>
          </div>
          <div className="col-auto">
            <Link to="/events" className="text-reset text-decoration-none">
              Events
            </Link>
          </div>
          <div className="col-auto">
            <Link to="/games" className="text-reset text-decoration-none">
              Games
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
