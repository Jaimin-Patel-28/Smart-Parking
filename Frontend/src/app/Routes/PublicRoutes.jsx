import { Routes, Route } from "react-router-dom";

// Layout
import PublicLayout from "../../public-panel/Layout/PublicLayout";

// Pages
import Home from "../../public-panel/Pages/Home";
import About from "../../public-panel/Pages/About";
import Contact from "../../public-panel/Pages/Contact";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
