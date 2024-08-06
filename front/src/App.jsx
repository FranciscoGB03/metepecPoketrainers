import { Route, Routes } from "react-router-dom";
import "./App.css";
import Template from "./components/template/Template";
import Homepage from "./components/Homepage/Homepage";
import RankingMundial from "./components/rankingMundial/RankingMundial";
import RankingRegional from "./components/rankingRegional/RankingRegional";
import TerminosCondiciones from "./components/terminosCondiciones/TerminosCondiciones";
import Admin from "./components/admin/Admin";
import { RankingMundialAdmin } from "./components/admin/RankingMundial/RankingMundialAdmin";
import AdminTemplate from "./components/admin/Template/AdminTemplate";
import LigaLocalAdmin from "./components/admin/LigaLocal/LigaLocalAdmin";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotFound from "./components/template/notFound/NotFound";
import EquiposTopAdmin from "./components/admin/equiposTop/equiposTopAdmin";
import EquiposTop from "./components/equiposTop/EquiposTop";
import Permisos from "./components/admin/catalogos/Permisos/Permisos";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Template />}>
        <Route index element={<Homepage />} />
        <Route path="/rankingMundial" element={<RankingMundial />} />
        <Route path="/rankingRegional" element={<RankingRegional />} />
        <Route path="/terminosCondiciones" element={<TerminosCondiciones />} />
        <Route path="/equiposTop" element={<EquiposTop />} />
      </Route>
      <Route path="/admin" element={<AdminTemplate />}>
        <Route index element={<Admin />} />
        <Route path="/admin/rankingMundial" element={<RankingMundialAdmin />} />
        <Route path="/admin/ligaLocal" element={<LigaLocalAdmin />} />
        <Route path="/admin/equiposTop" element={<EquiposTopAdmin />} />
        <Route path="/admin/permisos" element={<Permisos />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
