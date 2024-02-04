import RankingMundial from "../components/rankingMundial/RankingMundial";
import RankingRegional from "../components/rankingRegional/RankingRegional";

const ROUTES = [
  { exact: true, path: "/", element: RankingRegional },
  { exact: true, path: "/rankingMundial", element: RankingMundial },
  { exact: true, path: "/rankingRegional", element: RankingRegional },
];

export default ROUTES;
