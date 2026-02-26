import { Route } from "react-router-dom";

// Layout
import PublicLayout from "../../public-panel/Layout/PublicLayout";

// Pages
import Home from "../../public-panel/Pages/Home";
import About from "../../public-panel/Pages/About";
import Contact from "../../public-panel/Pages/Contact";
import Auth from "../../public-panel/Pages/Auth";

const PublicRoutes = () => {
  return (
    <Route element={<PublicLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Auth />} />
    </Route>
  );
};

export default PublicRoutes;
