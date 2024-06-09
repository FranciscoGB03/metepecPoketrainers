import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TfiWorld } from "react-icons/tfi";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiDashboard2Line } from "react-icons/ri";
import { MdOutlineDashboard } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { VscHome } from "react-icons/vsc";
import { BsGeoAltFill } from "react-icons/bs";
const Sidebar = () => {
  const menus = [
    { name: "Dashboard", link: "/admin", icon: MdOutlineDashboard },
    { name: "Ranking Mundial", link: "/admin/rankingMundial", icon: BiWorld },
    { name: "Liga Local", link: "/admin/ligaLocal", icon: BsGeoAltFill },
    { name: "Inicio", link: "/", icon: VscHome },
  ];
  const [open, setOpen] = useState(true);
  return (
    <div>
      {/* menu */}
      {/* <div x-data="{ sidebarOpen: false }" className="flex h-screen bg-gray-200">
        </div> */}
      <section className="flex grap-6 ">
        <div
          className={`bg-[#0e0e0e] min-h-screen ${
            open ? "w-72" : "w-20"
          } duration-500 text-gray-100 px-4 `}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={24}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mt-4 flex flex-col grap-4 relative">
            <div className="mt-4 flex flex-col grap-4 relative">
                {menus?.map((menu, i) => (
                    <NavLink
                      to={menu?.link}
                      key={i}
                      className={`${menu?.margin && "mt-5"}
                      group flex items-center text-2xl grap-3.5 front-medium p-3 m-3 hover:bg-gray-800 rounded-2xl`}
                    >
                      <div className="pr-2 mr-2 min-w-max">
                        {React.createElement(menu?.icon, { size: "20" })}
                      </div>
                      <h2
                        style={{
                          transitionDelay: `${i + 3}00ms`,
                        }}
                        className={`whitespace-pre duration-500 ${
                          !open && "opacity-0 translate-x-28 overflow-hidden "
                        }`}
                      >
                        {menu?.name}
                      </h2>
                      <h2
                        className={`${
                          open && "hidden"
                        } absolute left-48 bg-white front-semibold 
                  whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 
                  overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 
                  group-hover:duration-300 group-hover:w-fit`}
                      >
                        {menu?.name}
                      </h2>
                    </NavLink>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
