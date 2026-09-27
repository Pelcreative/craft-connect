import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  MessageSquare,
  Heart,
  Star,
  Bell,
  Settings,
  LogOut,
  X,
  Menu,
} from "lucide-react";

/* ========================================
   NAVIGATION ITEMS
======================================== */

const navigationItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "My Bookings", icon: CalendarDays, path: "/bookings" },
  { label: "Messages", icon: MessageSquare, path: "/messages", notification: 1 },
  { label: "Saved Vendors", icon: Heart, path: "/vendors" },
  { label: "Reviews", icon: Star, path: "/reviews" },
  { label: "Notifications", icon: Bell, path: "/notifications", notification: 1 },
  { label: "Settings", icon: Settings, path: "/settings" },
];

/* ========================================
   ANIMATION VARIANTS (Menu Item Stagger)
======================================== */

const itemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.06,
      duration: 0.35,
      ease: "easeOut",
    },
  }),
};

/* ========================================
   MAIN LAYOUT & SIDEBAR COMPONENT
======================================== */

export default function CustomerDashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR ASIDE (Using standard HTML aside with Tailwind responsive classes to prevent overlap) */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[270px] flex-col
          bg-[#0F2238] text-white shadow-2xl
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* BRAND HEADER */}
        <div className="flex h-[88px] shrink-0 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F97316] shadow-lg shadow-orange-500/20">
              <span className="text-xl font-black">C</span>
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">CraftConnect</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/40">
                Customer Panel
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
            Main Menu
          </p>

          <div className="space-y-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `
                      group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-white/10 text-white shadow-sm"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-4">
                          <Icon
                            size={20}
                            strokeWidth={1.8}
                            className={`transition-all duration-200 group-hover:scale-110 ${
                              isActive
                                ? "text-[#F97316]"
                                : "text-slate-400 group-hover:text-[#F97316]"
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>

                        {item.notification && (
                          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F97316] px-1.5 text-[10px] font-bold text-white">
                            {item.notification}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* USER PROFILE & LOGOUT */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold">
              A
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Ada</p>
              <p className="truncate text-xs text-white/40">Customer</p>
            </div>
          </div>

          <button
            type="button"
            className="group flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut
              size={20}
              strokeWidth={1.8}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA (Pushed cleanly to the right of the 270px sidebar) */}
      <div className="flex min-h-screen flex-col lg:pl-[270px]">
        {/* Sticky Mobile Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between bg-white px-4 shadow-sm lg:hidden">
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open sidebar"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-[#0F2238]">CraftConnect</span>
          <div className="w-8" />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}