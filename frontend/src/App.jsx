import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllCategories from "./Pages/AllCategories";
import Homepage from "./Pages/Homepage";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Vendor from "./Pages/Vendor";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import CustomerDashboard from "./Components/CustomerDashboard";
import VerifyEmail from "./Pages/VerifyEmail";

// Import your sidebar layout wrapper (adjust the path if it's located elsewhere)
import CustomerDashboardLayout from "./Components/CustomerSidebar"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Wrapped with the layout so the fixed sidebar and mobile header appear correctly */}
        <Route
          path="/dashboard"
          element={
            <CustomerDashboardLayout>
              <CustomerDashboard />
            </CustomerDashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;