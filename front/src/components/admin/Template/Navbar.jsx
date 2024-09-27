// Navbar.js
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav-color ">
      <div className="lg:flex md:flex lg: flex-1 items center justify-end font-normal hidden">
        <div className="flex-10">
          <ul className="flex  gap-8 mr-16 text-[18px]">
            <li>
              <Link to="/admin/rankingMundial">Ranking Mundial</Link>
            </li>
            <li>
              <Link to="/admin/ligaLocal">Liga Local</Link>
            </li>
            <li>
              <Link to="/">Inicio</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
