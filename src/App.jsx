import { Route, Routes } from "react-router-dom";
import "./App.css";
import ROUTES from "./routes/Routes";
function App() {
  return (
    <Routes>
      {ROUTES.map(route => (
        <Route
          key={route.id}
          exact={route.exact}
          path={route.path}
          element={<route.element />}
        />
      ))}
    </Routes>
  );
}

export default App;
