import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./styles.css";
import AdminHeader from "./AdminHeader";

const AdminTemplate = () => {
	return (
		<div className="admin-contenedor">
			{/* <Navbar /> */}
			<div className="lg:flex-start lg:flex">
				<Sidebar />
				<div className="w-full">
					<AdminHeader />
					<div className="bg-gray-200">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminTemplate;
