import { Link } from "react-router-dom";
import { TfiWorld } from "react-icons/tfi";
import { LuLayoutDashboard } from "react-icons/lu";
const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column flex-shrink-0 p-3 bg-dark">
      <div className="col-span-1 p-8">
        <div className="text-center pb-8">
          <h1 className=" text-center uppercase font-bold tracking-[4px]">
            Dashboard
          </h1>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#" className="flex items-center gap-2 bg-purple-200 p-4 px-4">
                <LuLayoutDashboard/> 
                Dashboard
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
