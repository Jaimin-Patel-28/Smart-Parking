import { Routes } from "react-router-dom";

import PublicRoutes from "./routes/PublicRoutes";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

const App = () => {
  return (
    <Routes>
      {PublicRoutes()}
      {UserRoutes()}
      {AdminRoutes()}
    </Routes>
  );
};

export default App;
