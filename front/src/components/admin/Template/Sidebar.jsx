import { NavLink, useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { BiWorld } from "react-icons/bi";
import { BsGeoAltFill } from "react-icons/bs";
import { IoMdHome, IoMdMenu } from "react-icons/io";
import { IoLogOutSharp, IoCloseSharp } from "react-icons/io5";
import { MdCatchingPokemon } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import React, { useState } from "react";
import { logOut } from "../../auth/helpers";

const Sidebar = () => {
  const navigate = useNavigate();
  const menus = [
    { name: "Dashboard", link: "/admin", icon: LuLayoutDashboard },
    { name: "Ranking Mundial", link: "/admin/rankingMundial", icon: BiWorld },
    { name: "Liga Local", link: "/admin/ligaLocal", icon: BsGeoAltFill },
    { name: "Equipos Top", link: "/admin/equiposTop", icon: MdCatchingPokemon },
    { name: "Permisos App", link: "/admin/permisos", icon: FaGear },
    { name: "Catálogos", link: "/admin/catalogos", icon: FaGear },
    { name: "Inicio", link: "/", icon: IoMdHome },
  ];
  const [sidebar, setSidebar] = useState(false);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  const onLogOut = () => {
    logOut();
    navigate("/");
  };
  return (
    // <div className="md:w-2/5 lg:w-1/5 xl:w-1/5 text-center items-center ">
    <div className="md:w-2/5 lg:w-[25%] md:h-full xl:w-[25%]text-center items-center ">
      <div
        className={`fixed lg:static w-[79%] md:w-[40%] lg:w-full top-0 z-50 bg-cyan-950 text-white transition-all ${
          sidebar ? "-left-0" : "-left-full"
        } w-full h-full col-span-1 p-8 border-r`}
      >
        <div className="text-center pb-8">
          <div className="text-right uppercase font-bold text-xl ">
            {sidebar && <button onClick={handleSidebar}>X</button>}
          </div>
          <h1 className="uppercase font-bold tracking-[4px]">Dashboard</h1>
        </div>
        <div className="flex flex-col justify-between sm:h-0 lg:h-[850px] 2xl:h-[850px] ">
          <nav>
            <ul>
              {menus?.map((menu, i) => (
                <li
                  className="text-xl p-2 font-semibold hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white transition-colors rounded-lg"
                  key={i}
                >
                  {sidebar ? (
                    <NavLink
                      to={menu?.link}
                      className="group flex items-center gap-2"
                      onClick={handleSidebar}
                    >
                      {React.createElement(menu?.icon)}
                      {menu?.name}
                    </NavLink>
                  ) : (
                    <NavLink
                      to={menu?.link}
                      className="group flex items-center gap-2"
                    >
                      {React.createElement(menu?.icon)}
                      {menu?.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-4">
            <ul>
              <li className="text-xl p-2  font-semibold hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white transition-colors rounded-lg">
                <button onClick={onLogOut} className="flex items-center gap-2 ">
                  <IoLogOutSharp />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button
        onClick={handleSidebar}
        className="block lg:hidden absolute bottom-4 right-4 m-4 p-1 items-center text-center text-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl "
      >
        {sidebar ? <IoCloseSharp /> : <IoMdMenu />}
      </button>
    </div>
  );
};

export default Sidebar;
