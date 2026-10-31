
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Homepage from "./Pages/Homepage";
import AllCategories from "./Pages/AllCategories";
import Vendor from "./Pages/Vendor";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import VerifyEmail from "./Pages/VerifyEmail";
import Artisans from "./Pages/Artisans";
import ArtisanProfile from "./Pages/ArtisanProfile";
import ArtisanDashboard from "./Pages/ArtisanDashboard";
import ArtisanProfileSettings from "./Pages/ArtisanProfileSettings";

// Authentication
import Login from "./Components/Login";
import Register from "./Components/Register";

// Customer layout
import CustomerLayout from "./Components/CustomerLayout";

// Customer dashboard pages
import CustomerDashboard from "./Components/CustomerDashboard";
import CustomerBooking from "./Components/CustomerBoooking";
import CustomerMessage from "./Components/CustomerMessage";
import CustomerSavedVendors from "./Components/CustomerSavedVendors";
import CustomerReview from "./Components/CustomerReview";
import CustomerNotification from "./Components/CustomerNotification";
import CustomerSettings from "./Components/CustomerSettings";
import CustomerLogout from "./Components/CustomerLogout";
import CustomerMakePayment from "./Components/CustomerMakePayment";

// Vendor dashboard components
import VendorLayout from "./Components/VendorLayout";
import VendorDashboard from "./Components/VendorDashboard";
import VendorBooking from "./Components/VendorBooking";
import VendorServices from "./Components/VendorServices";
import VendorPortfolio from "./Components/VendorPortfolio";
import VendorCustomer from "./Components/VendorCustomer";
import VendorMessage from "./Components/VendorMessage";
import VendorReview from "./Components/VendorReview";
import VendorPayment from "./Components/VendorPayment";
import VendorAnalysis from "./Components/VendorAnalysis";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC PAGES */}
        <Route path="/" element={<Homepage />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/artisans" element={<Artisans />} />
        <Route path="/artisans/:artisanId" element={<ArtisanProfile />} />
        <Route path="/artisan/dashboard" element={<ArtisanDashboard />} />
        <Route path="/artisan/profile" element={<ArtisanProfileSettings />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* AUTHENTICATION */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* CUSTOMER PORTAL */}
        <Route element={<CustomerLayout />}>
          <Route
            path="/dashboard"
            element={<CustomerDashboard />}
          />

          <Route
            path="/bookings"
            element={<CustomerBooking />}
          />

          <Route
            path="/messages"
            element={<CustomerMessage />}
          />

          <Route
            path="/vendors"
            element={<CustomerSavedVendors />}
          />

          <Route
            path="/reviews"
            element={<CustomerReview />}
          />

          <Route
            path="/notifications"
            element={<CustomerNotification />}
          />

          <Route
            path="/settings"
            element={<CustomerSettings />}
          />

          <Route
            path="/makepayments"
            element={<CustomerMakePayment />}
          />

          <Route
            path="/logout"
            element={<CustomerLogout />}
          />
        </Route>

        {/* VENDOR PORTAL */}
        <Route element={<VendorLayout />}>

          <Route
            path="/vendordashboard"
            element={<VendorDashboard />}
          />

          <Route
            path="/vendorbookings"
            element={<VendorBooking />}
          />

          <Route
            path="/vendorservices"
            element={<VendorServices />}
          />

          <Route
            path="/vendorportfolio"
            element={<VendorPortfolio />}
          />

          <Route
            path="/vendorcustomer"
            element={<VendorCustomer />}
          />

          <Route
            path="/vendormessage"
            element={<VendorMessage />}
          />

          <Route
            path="/vendorreview"
            element={<VendorReview />}
          />

          <Route
            path="/vendorpayment"
            element={<VendorPayment />}
          />
          
          <Route
            path="/vendoranalysis"
            element={<VendorAnalysis />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
