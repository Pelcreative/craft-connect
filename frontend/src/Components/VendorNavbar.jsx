
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  User,
  Settings,
  LogOut,
  CalendarDays,
  MessageSquare,
  CreditCard,
  X,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "New Booking",
    message: "You have received a new booking request.",
    time: "10 minutes ago",
  },
  {
    id: 2,
    title: "New Message",
    message: "A customer sent you a message.",
    time: "30 minutes ago",
  },
  {
    id: 3,
    title: "Payment Received",
    message: "Your payment was successfully processed.",
    time: "2 hours ago",
  },
];

export default function VendorNavbar({
  openSidebar,
  vendorName = "Adaeze Okafor",
  vendorRole = "Vendor",
  vendorImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
  onSearch,
  onLogout,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleLogout = () => {
    setShowProfile(false);

    if (onLogout) {
      onLogout();
    } else {
      navigate("/login");
    }
  };

  const dropdownAnimation = {
    hidden: { opacity: 0, y: -8, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -8, scale: 0.97 },
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-30 flex min-h-[76px] w-full items-center justify-between gap-3 border-b border-slate-100 bg-white/95 px-3 backdrop-blur-md sm:px-5 md:px-6 lg:px-8"
    >
      {/* Search and mobile menu */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={openSidebar}
          aria-label="Open navigation menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 md:hidden"
        >
          <Menu size={23} />
        </button>

        <div className="flex h-11 w-full max-w-[530px] items-center gap-3 rounded-xl border border-blue-100 bg-[#fafdff] px-3 text-blue-500 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
          <Search size={19} className="shrink-0" />

          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for bookings, services, or customers..."
            className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                onSearch?.("");
              }}
              aria-label="Clear search"
              className="text-slate-400 hover:text-slate-700"
            >
              <X size={17} />
            </button>
          )}
        </div>
      </div>

      {/* Navbar right side */}
      <div className="flex shrink-0 items-center gap-3 sm:gap-5">

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={() => {
              setShowNotifications((previous) => !previous);
              setShowProfile(false);
            }}
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[#092a61] transition hover:bg-blue-50"
          >
            <Bell size={22} />

            <span className="absolute right-1 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
              3
            </span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                variants={dropdownAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 top-14 z-50 w-[min(340px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-slate-100 p-4">
                  <div>
                    <h3 className="font-bold text-[#092a61]">
                      Notifications
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      You have 3 new updates
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                    aria-label="Close notifications"
                  >
                    <X size={17} />
                  </button>
                </div>

                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 border-b border-slate-50 p-4 transition hover:bg-slate-50"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />

                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-slate-800">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {item.message}
                      </p>
                      <span className="mt-2 block text-[11px] text-slate-400">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications(false);
                    navigate("/vendor/notifications");
                  }}
                  className="w-full p-3 text-center text-sm font-semibold text-blue-600 hover:bg-blue-50"
                >
                  View all notifications
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setShowProfile((previous) => !previous);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50 sm:gap-3"
          >
            <img
              src={vendorImage}
              alt={vendorName}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100"
            />

            <span className="hidden text-left sm:block">
              <strong className="block text-sm text-[#092a61]">
                {vendorName}
              </strong>
              <small className="text-xs text-blue-500">
                {vendorRole}
              </small>
            </span>

            <ChevronDown
              size={18}
              className={`hidden text-[#092a61] transition sm:block ${
                showProfile ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                variants={dropdownAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 top-14 z-50 w-60 overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-xl"
              >
                <div className="border-b border-slate-100 p-3">
                  <p className="font-semibold text-[#092a61]">
                    {vendorName}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {vendorRole}
                  </p>
                </div>

                {[
                  { label: "My Profile", icon: User, path: "/vendor/profile" },
                  { label: "My Bookings", icon: CalendarDays, path: "/vendor/bookings" },
                  { label: "Messages", icon: MessageSquare, path: "/vendor/messages" },
                  { label: "Payments", icon: CreditCard, path: "/vendor/payments" },
                  { label: "Settings", icon: Settings, path: "/vendor/settings" },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      type="button"
                      key={item.label}
                      onClick={() => {
                        setShowProfile(false);
                        navigate(item.path);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Icon size={17} />
                      {item.label}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 transition hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
