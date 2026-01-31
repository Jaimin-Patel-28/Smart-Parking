import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Footer from "./components/footer/Footer";
import UserSidebar from "./components/sidebar/UserSidebar";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route 
        path="/login" 
        element={<Auth />} />
        <Route path="/sidebar" element={<UserSidebar />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
