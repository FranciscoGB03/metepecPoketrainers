import RankingMundial from "../components/rankingMundial/RankingMundial";
import RankingRegional from "../components/rankingRegional/RankingRegional";
import TerminosCondiciones from "../components/terminosCondiciones/TerminosCondiciones";

const ROUTES = [
  { exact: true, path: "/", element: RankingRegional },
  { exact: true, path: "/rankingMundial", element: RankingMundial },
  { exact: true, path: "/rankingRegional", element: RankingRegional },
  { exact: true, path:"/terminosCondiciones", element: TerminosCondiciones},
];

export default ROUTES;
