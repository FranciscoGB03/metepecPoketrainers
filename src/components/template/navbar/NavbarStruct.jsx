import { AiOutlinePicture } from "react-icons/ai";

import "./NavbarStruct.css";
import { Link } from "react-scroll";
import {useState} from "react";
import { NavLink } from "react-router-dom";
import {FaTimes} from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

const NavbarStruct = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const content = <>
    <div className="lg:hidden flex-grow block absolute top-12 w-full left-0 right-0 transition nav-color z-50 ">
      <ul class="text-center text-xl flex flex-col">
        <NavLink to="/rankingMundial"><li className="py-2.5	" spy={true} smooth={true}>Ranking Mundial</li></NavLink>
        <NavLink to="/rankingRegional"><li className="py-2.5"  spy={true} smooth={true}>Ranking Local</li></NavLink>
        <NavLink href="#deets"><li className="py-2.5" spy={true} smooth={true}>Equipos Top</li></NavLink>     
      </ul>
    </div>
  </>
  return (
    <div className="nav-color ">
      <nav>
        <div className="h-10vh flex justify-between text-white lg:py-4 py-3 flex-1">
          <div className=" flex items-center flex-1">
            <span className=" ml-8 text-3x1 font-bold">Metepec Poke Trainers</span>
          </div>
          <div className="lg:flex md:flex lg: flex-1 items center justify-end font-normal hidden">
            <div className="flex-10">
              <ul className="flex gap-8 mr-16 text-[18px]">
              <NavLink to="/rankingMundial"><li spy={true} smooth={true}>Ranking Mundial</li></NavLink>
              <NavLink to="/rankingRegional"><li spy={true} smooth={true}>Ranking Local</li></NavLink>
              <NavLink href="#deets"><li spy={true} smooth={true}>Equipos Top</li></NavLink>
              </ul>
            </div>
          </div>
          <div>
            {click && content}
          </div>
          <button className="block mr-8 sm:hidden transtion" onClick={handleClick}>
            {click ? <FaTimes/> : <IoMenu/>}
          </button>
        </div>
      </nav>
    </div>
  );
};
export default NavbarStruct;
