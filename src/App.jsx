import { Route, Routes } from "react-router-dom";
import "./App.css";
import RankingMundial from "./components/rankingMundial/RankingMundial";
import RankingRegional from "./components/rankingRegional/RankingRegional";

function App() {
  return (
    <Routes>
      <Route path='/' element={<RankingRegional/>}/>
      <Route path='/rankingMundial' element={<RankingMundial/>}/>
      <Route path='/rankingRegional' element={<RankingRegional/>}/>
    </Routes>
    );
}

export default App;
