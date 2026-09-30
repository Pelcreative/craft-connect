import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllCategories from "./Pages/AllCategories";
import Homepage from "./Pages/Homepage";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Vendor from "./Pages/Vendor";
import About from "./Pages/About";
import Contact from "./Pages/Contact";


import CustomerDashboard from "./Components/CustomerDashboard";
import CustomerBooking from "./Components/CustomerBoooking";
import CustomerMessage from "./Components/CustomerMessage";
import CustomerSavedVendors from "./Components/CustomerSavedVendors";
import CustomerReview from "./Components/CustomerReview";
import CustomerNotification from "./Components/CustomerNotification";
import CustomerSettings from "./Components/CustomerSettings";
import CustomerLogout from "./Components/CustomerLogout";


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

        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/bookings" element={<CustomerBooking />} />
        <Route path="/messages" element={<CustomerMessage />} />
        <Route path="/vendors" element={<CustomerSavedVendors />} />
        <Route path="/reviews" element={<CustomerReview />} />
        <Route path="/notifications" element={<CustomerNotification />} />
        <Route path="/settings" element={<CustomerSettings/>} />
         <Route path="/logout" element={<CustomerLogout/>} />

       
      </Routes>
    </BrowserRouter>
  );
}

export default App;