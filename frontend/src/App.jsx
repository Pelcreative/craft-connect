import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllCategories from "./Pages/AllCategories";
import Homepage from "./Pages/Homepage";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/categories" element={<AllCategories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
