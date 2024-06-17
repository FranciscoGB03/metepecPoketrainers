import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { BiWorld } from "react-icons/bi";
import { BsGeoAltFill } from "react-icons/bs";
import { IoMdHome,IoMdMenu } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import React,{useState} from "react";
import { IoCloseSharp } from "react-icons/io5";

const Sidebar = () => {
  const menus = [
    { name: "Dashboard", link: "/admin", icon: LuLayoutDashboard },
    { name: "Ranking Mundial", link: "/admin/rankingMundial", icon: BiWorld },
    { name: "Liga Local", link: "/admin/ligaLocal", icon: BsGeoAltFill },
    { name: "Inicio", link: "/", icon: IoMdHome },
  ];
  const[sidebar,setSidebar]= useState(false);
  const handleSidebar = () =>{
    setSidebar(!sidebar);
  };
  return (
    // <div className="md:w-2/5 lg:w-1/5 xl:w-1/5 text-center items-center ">
    <div className="md:w-2/5 lg:w-[25%] md:h-full xl:w-[25%]text-center items-center ">
      <div className={`fixed lg:static w-[80%] md:w-[40%] lg:w-full top-0 z-50 bg-cyan-950 text-white transition-all ${sidebar? "-left-0" : "-left-full"} w-full h-full col-span-1 p-8 border-r`}>
        <div className="text-center pb-8">
          <h1 className="text-center uppercase font-bold tracking-[4px]">
            Dashboard
          </h1>
        </div>
        <div className="flex flex-col justify-between sm:h-0 lg:h-[850px] 2xl:h-[850px] ">
          <nav>
            <ul>
            {menus?.map((menu, i) => (
              <li className="text-xl p-2 font-semibold hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white transition-colors rounded-lg" key={i}>
                <NavLink
                  to={menu?.link}    
                  className="group flex items-center gap-2"
                >
                {React.createElement(menu?.icon)}
                {menu?.name}
                </NavLink>
                {/* <a href="#" className="flex items-center gap-2 ">
                  <LuLayoutDashboard />
                  SideBar
                </a> */}
              </li>
            ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-4">
            <ul>
            <li className="text-xl p-2  font-semibold hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white transition-colors rounded-lg">
            <a href="#" className="flex items-center gap-2 ">
                  <IoLogOutSharp />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
        <button onClick={handleSidebar} 
          className="block lg:hidden absolute bottom-4 right-4 m-4 p-1 items-center text-center text-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl "
        >
          {sidebar? <IoCloseSharp/> : <IoMdMenu />}
        </button>
    </div>
  );
};

export default Sidebar;
