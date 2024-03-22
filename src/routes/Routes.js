import RankingMundial from "../components/rankingMundial/RankingMundial";
import RankingRegional from "../components/rankingRegional/RankingRegional";
import TerminosCondiciones from "../components/terminosCondiciones/TerminosCondiciones";

const ROUTES = [
  { id:1, exact: true, path: "/", element: RankingRegional },
  { id:2, exact: true, path: "/rankingMundial", element: RankingMundial },
  { id:3, exact: true, path: "/rankingRegional", element: RankingRegional },
  { id:4, exact: true, path:"/terminosCondiciones", element: TerminosCondiciones},
];

export default ROUTES;
