import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllCategories from "./Pages/AllCategories";
import Homepage from "./Pages/Homepage";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Vendor from "./Pages/Vendor";
import About from "./Pages/About";
import Contact from "./Pages/Contact";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
