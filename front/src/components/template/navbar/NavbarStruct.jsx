import "./NavbarStruct.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import logo from "../../../img/logo.png";
import { getEmailFromToken, isTokenExpired } from "../../auth/helpers";
import { FaRegUserCircle, FaTimes } from "react-icons/fa";
const NavbarStruct = () => {
	/**hooks */
	const [click, setClick] = useState(false);
	/** functions */
	const handleClick = () => setClick(!click);
	/**variables */
	const content = (
		<div className="lg:hidden flex-grow block absolute top-14 w-full left-0 right-0 transition nav-color z-50 ">
			<ul className="text-center text-xl flex flex-col">
				<NavLink to="/rankingMundial">
					<li className="py-2.5">Ranking Mundial</li>
				</NavLink>
				<NavLink to="/rankingRegional">
					<li className="py-2.5">Ranking Local</li>
				</NavLink>
				<NavLink to="/equiposTop">
					<li className="py-2.5">Equipos Top</li>
				</NavLink>
				<NavLink href="#deets">
					<li className="py-2.5">Torneo</li>
				</NavLink>
				<NavLink href="#deets">
					<li className="py-2.5">Nosotros</li>
				</NavLink>
				<NavLink href="#deets">
					<li className="py-2.5">Contactanos</li>
				</NavLink>
				{isTokenExpired() ? (
					<NavLink to="/login">
						<li className="py-2.5">Login</li>
					</NavLink>
				) : (
					<NavLink to="/admin">
						<li className="py-2.5">Admin</li>
					</NavLink>
				)}
				<li className="lg:flex md:flex lg: flex-1 items center justify-end py-7">
					<FaRegUserCircle />
					{getEmailFromToken()}
				</li>
			</ul>
		</div>
	);
	/**render */
	return (
		<div className="nav-color ">
			<nav>
				<div className="h-10vh flex justify-between text-white lg:py-4 py-3 flex-1">
					<div className="flex items-center">
						<NavLink to="/">
							<img alt="imagen principal" className="w-6/12" src={logo} />
						</NavLink>
					</div>
					<div className="lg:flex md:flex lg: flex-1 items center justify-end font-normal hidden">
						<div className="flex-10">
							<ul className="flex  gap-8 mr-16 text-[18px]">
								<NavLink to="/rankingMundial">
									<li className="py-7">Ranking Mundial</li>
								</NavLink>
								<NavLink to="/rankingRegional">
									<li className="py-7">Ranking Local</li>
								</NavLink>
								<NavLink to="/equiposTop">
									<li className="py-7">Equipos Top</li>
								</NavLink>
								<NavLink href="#deets">
									<li className="py-7">Torneo</li>
								</NavLink>
								<NavLink href="#deets">
									<li className="py-7">Nosotros</li>
								</NavLink>
								<NavLink href="#deets">
									<li className="py-7">Contactanos</li>
								</NavLink>
								{isTokenExpired() ? (
									<NavLink to="/login">
										<li className="py-7">Login</li>
									</NavLink>
								) : (
									<NavLink className="py-7" to="/admin">
										<li className="py-7">Admin</li>
									</NavLink>
								)}
								{!isTokenExpired() && (
									<li className="lg:flex md:flex lg: flex-1 items center justify-end py-7">
										<FaRegUserCircle />
										{getEmailFromToken()}
									</li>
								)}
							</ul>
						</div>
					</div>
					<div>{click && content}</div>
					<button
						className="block mr-8 sm:hidden transtion"
						onClick={handleClick}>
						{click ? <FaTimes /> : <IoMenu />}
					</button>
				</div>
			</nav>
		</div>
	);
};
export default NavbarStruct;
