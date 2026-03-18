import { Routes } from "react-router-dom";

import PublicRoutes from "./routes/PublicRoutes";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import MagneticCursor from "../common/MagneticCursor";

const App = () => {
  return (
    <div className="cursor-none-container">
      <MagneticCursor/>

    <Routes>
      {PublicRoutes()}
      {UserRoutes()}
      {AdminRoutes()}
    </Routes>
    </div>
  );
};

export default App;
