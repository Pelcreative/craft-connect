import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import VendorSidebar from "./VendorSidebar";
import VendorNavbar from "./VendorNavbar";

export default function VendorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((previous) => !previous);
  };

  // Close the mobile sidebar when navigating to another page.
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Close the mobile sidebar when switching to desktop width.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#f7faff]">
      {/* Vendor sidebar */}
      <VendorSidebar
        isOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
      />

      {/* Main dashboard area */}
      <div className="min-h-screen min-w-0 md:ml-[250px]">
        {/* Top navbar */}
        <VendorNavbar
          openSidebar={openSidebar}
          toggleSidebar={toggleSidebar}
        />

        {/* Page content */}
        <main className="min-h-[calc(100vh-85px)] min-w-0 px-3 py-5 sm:px-5 md:px-6 lg:px-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="min-w-0 w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}