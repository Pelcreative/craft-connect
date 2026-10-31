import { useState } from "react";
import { Outlet } from "react-router-dom";
import CustomerSidebar from "./CustomerSidebar";
import DashboardNavbar from "./DashboardNavbar";

export default function CustomerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-[#f7faff]">
      <CustomerSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="min-h-screen w-full min-w-0 md:ml-[280px] md:w-[calc(100%-280px)]">
        <DashboardNavbar setIsOpen={setIsSidebarOpen} />

        <main className="w-full min-w-0 px-3 py-5 sm:px-5 md:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}