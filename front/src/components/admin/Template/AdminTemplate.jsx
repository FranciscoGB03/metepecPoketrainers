import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const AdminTemplate = () => {
  return (
    <div>
        AdminTemplate
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default AdminTemplate;