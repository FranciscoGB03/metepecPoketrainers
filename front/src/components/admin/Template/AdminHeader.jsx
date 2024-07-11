
import "./styles.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <div className="md:w-full bg-cyan-950	text-white">
      <header className="flex flex-col md:flex-row gap-4 p-4  pr-8 items-center justify-between w-full">
        <form className="w-full order-1 md:order-none">
          <div className="relative">
            <FaSearch className="absolute left-2 top-3" />
            <input
              type="text"
              className=" md:[30%] lg:w-[90%] py-2 pl-8 pr-4 outline-none rounded-lg"
              placeholder="Buscar"
            ></input>
          </div>
        </form>
        <nav className="w-full flex justify-center md:justify-end md:[70%] lg:w-[70%]">
          <ul className="flex items-center gap-4">
            <li>
              <Link href="#" className="relative">
                <IoMdNotificationsOutline />
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-2">
                Administrador <FaChevronDown />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default AdminHeader;
