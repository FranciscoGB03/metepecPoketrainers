import { NavLink, useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { BiWorld } from "react-icons/bi";
import { BsGeoAltFill } from "react-icons/bs";
import { IoMdHome, IoMdMenu } from "react-icons/io";
import { IoLogOutSharp, IoCloseSharp } from "react-icons/io5";
import { MdCatchingPokemon } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import React, { useState } from "react";
import { getPermiso, logOut } from "../../auth/helpers";
import {
  PUBLICO,
  VER_ADMIN,
  VER_ADMIN_CATALOGOS,
  VER_ADMIN_EQUIPOS_TOP,
  VER_ADMIN_LIGA_LOCAL,
  VER_ADMIN_PERMISOS_APP,
  VER_ADMIN_RANKING_MUNDIAL,
} from "../../../utils/permisos";
import {
  ADMIN,
  ADMIN_CATALOGOS,
  ADMIN_EQUIPOS_TOP,
  ADMIN_RANKING_LOCAL,
  ADMIN_RANKING_MUNDIAL,
  ADMIN_REL_PERMISOS,
} from "../../../utils/urls";

const Sidebar = () => {
  const navigate = useNavigate();
  const menus = [
    {
      permiso: VER_ADMIN,
      name: "Dashboard",
      link: ADMIN,
      icon: LuLayoutDashboard,
    },
    {
      permiso: VER_ADMIN_RANKING_MUNDIAL,
      name: "Ranking Mundial",
      link: ADMIN_RANKING_MUNDIAL,
      icon: BiWorld,
    },
    {
      permiso: VER_ADMIN_LIGA_LOCAL,
      name: "Liga Local",
      link: ADMIN_RANKING_LOCAL,
      icon: BsGeoAltFill,
    },
    {
      permiso: VER_ADMIN_EQUIPOS_TOP,
      name: "Equipos Top",
      link: ADMIN_EQUIPOS_TOP,
      icon: MdCatchingPokemon,
    },
    {
      permiso: PUBLICO,
      name: "Permisos App",
      link: ADMIN_REL_PERMISOS,
      icon: FaGear,
    },
    {
      permiso: PUBLICO,
      name: "Catálogos",
      link: ADMIN_CATALOGOS,
      icon: FaGear,
    },
    { permiso: PUBLICO, name: "Inicio", link: "/", icon: IoMdHome },
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
    <div className="md:w-2/5 lg:w-[25%] md:h-full xl:w-[25%]text-center items-center  h-full">
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
              {menus?.map(
                (menu, i) =>
                  (getPermiso(menu.permiso) || menu.permiso === PUBLICO) && (
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
                  )
              )}
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
