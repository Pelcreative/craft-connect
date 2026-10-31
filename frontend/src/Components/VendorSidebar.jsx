import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  BriefcaseBusiness,
  Image,
  Users,
  MessageSquare,
  Star,
  CreditCard,
  ChartNoAxesCombined,
  Settings,
  LogOut,
  X,
  Crown,
  ArrowRight,
} from "lucide-react";

import Logo from "../assets/craftlogo.png";

const navigationLinks = [
  { name: "Dashboard", path: "/vendor/dashboard", icon: LayoutDashboard },
  { name: "Bookings", path: "/vendor/bookings", icon: CalendarDays },
  { name: "Service", path: "/vendor/services", icon: BriefcaseBusiness },
  { name: "Portfolio", path: "/vendor/portfolio", icon: Image },
  { name: "Customer", path: "/vendor/customers", icon: Users },
  {
    name: "Messages",
    path: "/vendor/messages",
    icon: MessageSquare,
    badge: 2,
  },
  { name: "Reviews", path: "/vendor/reviews", icon: Star },
  { name: "Payments", path: "/vendor/payments", icon: CreditCard },
  {
    name: "Analysis",
    path: "/vendor/analysis",
    icon: ChartNoAxesCombined,
  },
  { name: "Settings", path: "/vendor/settings", icon: Settings },
];

export default function VendorSidebar({
  isOpen = false,
  closeSidebar = () => {},
  onLogout,
}) {
  const navigate = useNavigate();

  // Close the mobile sidebar when the screen becomes desktop-sized.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeSidebar();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [closeSidebar]);

  // Prevent background scrolling while the mobile sidebar is open.
  useEffect(() => {
    if (window.innerWidth >= 768 || !isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleLogout = () => {
    closeSidebar();

    if (onLogout) {
      onLogout();
    } else {
      navigate("/login");
    }
  };

  const handleUpgrade = () => {
    closeSidebar();
    navigate("/vendor/upgrade");
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="vendor-sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeSidebar}
            className="fixed inset-0 z-[60] bg-slate-950/50 md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: typeof window !== "undefined" && window.innerWidth < 768
            ? isOpen
              ? 0
              : "-100%"
            : 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
        className={`
          fixed inset-y-0 left-0 z-[70]
          flex h-screen h-dvh w-[250px] max-w-[85vw]
          flex-col overflow-hidden
          bg-[#071b2a] text-white shadow-xl
          ${isOpen ? "visible" : "md:visible"}
        `}
        style={{
          visibility:
            typeof window !== "undefined" && window.innerWidth < 768
              ? isOpen
                ? "visible"
                : "hidden"
              : "visible",
        }}
      >
        {/* Logo */}
        <div className="flex h-[85px] shrink-0 items-center justify-between border-b border-white/10 px-5">
          <NavLink
            to="/vendor/dashboard"
            onClick={closeSidebar}
            className="flex min-w-0 items-center gap-3"
          >
            <img
              src={Logo}
              alt="CraftConnect Logo"
              className="h-10 w-10 shrink-0 rounded-full bg-white object-contain p-1"
            />

            <span className="whitespace-nowrap text-lg font-bold tracking-tight">
              Craft<span className="text-orange-500">Connect</span>
            </span>
          </NavLink>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden"
          >
            <X size={21} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Vendor navigation"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="space-y-1.5">
            {navigationLinks.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.025, duration: 0.2 }}
                >
                  <NavLink
                    to={item.path}
                    end={item.path === "/vendor/dashboard"}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `group relative flex min-h-[46px] items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "bg-orange-500/15 text-orange-400"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="vendor-active-link"
                            className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-orange-500"
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              damping: 30,
                            }}
                          />
                        )}

                        <Icon
                          size={19}
                          strokeWidth={2}
                          className="shrink-0"
                        />

                        <span className="min-w-0 flex-1 truncate">
                          {item.name}
                        </span>

                        {item.badge && (
                          <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-orange-500 px-1.5 text-[10px] font-bold text-white">
                            {item.badge}
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

        {/* Bottom section */}
        <div className="shrink-0 border-t border-white/10 px-4 pb-4 pt-4">
          {/* Upgrade card */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#172d3c] to-[#3a281e] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
              <Crown size={22} />
            </div>

            <h3 className="mb-2 text-sm font-semibold">
              Grow Your Business
            </h3>

            <p className="mb-4 text-xs leading-5 text-slate-300">
              Get more bookings, reach more customers and increase your income.
            </p>

            <button
              type="button"
              onClick={handleUpgrade}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98]"
            >
              Upgrade Now
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={19} className="shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}