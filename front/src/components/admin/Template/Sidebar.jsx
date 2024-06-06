import { Link } from "react-router-dom";
import { TfiWorld } from "react-icons/tfi";

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
      <a
        href="/metepecPoketrainers/admin"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg className="bi me-2" width="40" height="32">
          <use xlinkHref="#bootstrap" />
        </svg>
        <span className="fs-4">Sidebar</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <Link to="/admin/rankingMundial">
            <div className="sidebar-enlace">
              <TfiWorld /> Ranking Mundial
            </div>
          </Link>
        </li>
        <li>
          <Link to="/admin/ligaLocal">
            <div className="sidebar-enlace">
              <TfiWorld /> Liga Local
            </div>           
          </Link>
        </li>
        <li>
          <Link to="/">Inicio</Link>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default Sidebar;
