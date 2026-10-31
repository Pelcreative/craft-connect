
import { useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

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
  ShoppingBag,
  LogOutIcon,
} from "lucide-react";

import Logo from "../assets/craftlogo.png";
import { FaPaypal } from "react-icons/fa";

const navigationItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "My Bookings", path: "/bookings", icon: CalendarDays, badge: 3 },
  { label: "Messages", path: "/messages", icon: MessageSquare, badge: 2 },
  { label: "Saved Vendors", path: "/vendors", icon: Heart },
  { label: "Reviews", path: "/reviews", icon: Star },
  { label: "Notifications", path: "/notifications", icon: Bell, badge: 2 },
  { label: "Settings", path: "/settings", icon: Settings },
  { label: "Make Payments", path: "/makepayments", icon: FaPaypal },
  { label: "Logout", path: "/logout", icon: LogOutIcon },
];

export default function CustomerSidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);

  // Restore sidebar scroll position when the route changes.
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const savedPosition = sessionStorage.getItem(
      "customerSidebarScrollTop"
    );

    if (savedPosition !== null) {
      nav.scrollTop = Number(savedPosition);
    }
  }, [location.pathname]);

  const saveScrollPosition = (event) => {
    sessionStorage.setItem(
      "customerSidebarScrollTop",
      String(event.currentTarget.scrollTop)
    );
  };

  const closeSidebar = () => {
    setIsOpen?.(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    closeSidebar();
  };

  return (
    <>
      {/* Hide the sidebar scrollbar without disabling scrolling */}
      <style>{`
        .customer-sidebar-nav {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .customer-sidebar-nav::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
          background: transparent;
        }

        .customer-sidebar-nav::-webkit-scrollbar-track {
          background: transparent;
        }

        .customer-sidebar-nav::-webkit-scrollbar-thumb {
          background: transparent;
        }
      `}</style>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[270px] flex-col
          overflow-hidden
          bg-[#06182b] text-white
          shadow-2xl
          transform transition-transform
          duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex h-[82px] shrink-0 items-center justify-between border-b border-white/10 px-6">
          <NavLink
            to="/"
            onClick={closeSidebar}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-xl font-black shadow-lg shadow-orange-500/20">
              <img
                src={Logo}
                alt="CraftConnect Logo"
                className="h-8 w-8 rounded-full object-cover"
              />
            </div>

            <span className="text-xl font-bold tracking-tight">
              Craft<span className="text-orange-500">Connect</span>
            </span>
          </NavLink>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={21} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          ref={navRef}
          onScroll={saveScrollPosition}
          className="customer-sidebar-nav flex-1 min-h-0 space-y-2 overflow-y-auto overscroll-contain px-4 py-7"
        >
          {navigationItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.08 + index * 0.04,
                  duration: 0.3,
                }}
              >
                <NavLink
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) => `
                    group relative flex items-center justify-between
                    rounded-xl px-4 py-3.5
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-orange-500/15 text-white"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="sidebar-active"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                          className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-orange-500"
                        />
                      )}

                      <div className="flex items-center gap-4">
                        <Icon
                          size={19}
                          className={`transition-colors duration-300 ${
                            isActive
                              ? "text-orange-500"
                              : "text-slate-300 group-hover:text-orange-400"
                          }`}
                        />

                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </div>

                      {item.badge && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-[10px] font-bold text-white"
                        >
                          {item.badge}
                        </motion.span>
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        {/* Support card and logout */}
        <div className="shrink-0 p-4">
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/20 via-slate-800 to-slate-900 p-5"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
              <ShoppingBag size={21} />
            </div>

            <h3 className="text-sm font-semibold">
              Support Local Craftsmen
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-300">
              Every booking helps build a stronger community.
            </p>

            <button
              type="button"
              onClick={() => {
                navigate("/contact");
                closeSidebar();
              }}
              className="mt-4 rounded-full bg-orange-500 px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 active:scale-95"
            >
              Book Now →
            </button>
          </motion.div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm text-slate-300 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400 active:scale-[0.98]"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
