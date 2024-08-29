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
import RelRolPermisos from "./components/admin/catalogos/RelRolPermisos/RelRolPermisos";
import Catalogos from "./components/admin/catalogos/Catalogos";
import {
  ADMIN,
  ADMIN_CATALOGOS,
  ADMIN_EQUIPOS_TOP,
  ADMIN_RANKING_LOCAL,
  ADMIN_RANKING_MUNDIAL,
  ADMIN_REL_PERMISOS,
  EQUIPOS_TOP,
  LOGIN,
  RANKING_LOCAL,
  RANKING_MUNDIAL,
  REGISTER,
  TERMINOS_CONDICIONES,
} from "./utils/urls";

function App() {
  return (
    <Routes>
      <Route path={LOGIN} element={<Login />} />
      <Route path={REGISTER} element={<Register />} />
      <Route path="/" element={<Template />}>
        <Route index element={<Homepage />} />
        <Route path={RANKING_MUNDIAL} element={<RankingMundial />} />
        <Route path={RANKING_LOCAL} element={<RankingRegional />} />
        <Route path={TERMINOS_CONDICIONES} element={<TerminosCondiciones />} />
        <Route path={EQUIPOS_TOP} element={<EquiposTop />} />
      </Route>
      <Route path={ADMIN} element={<AdminTemplate />}>
        <Route index element={<Admin />} />
        <Route path={ADMIN_RANKING_MUNDIAL} element={<RankingMundialAdmin />} />
        <Route path={ADMIN_RANKING_LOCAL} element={<LigaLocalAdmin />} />
        <Route path={ADMIN_EQUIPOS_TOP} element={<EquiposTopAdmin />} />
        <Route path={ADMIN_REL_PERMISOS} element={<RelRolPermisos />} />
        <Route path={ADMIN_CATALOGOS} element={<Catalogos />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
