import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiMessageSquare,
  FiBell,
  FiMenu,
  FiX,
} from "react-icons/fi";

import Logo from "../assets/craftlogo.png";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Categories", to: "/categories" },
    { name: "Become a Vendor", to: "/vendor" },
    { name: "About Us", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo with Motion */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/" className="flex items-center gap-2">
            <motion.img
              src={Logo}
              alt="CraftConnect Logo"
              className="h-12 w-12 rounded-full object-cover shadow-sm"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Craft<span className="text-orange-500">Connect</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `relative py-7 text-sm font-medium transition ${
                  isActive
                    ? "text-orange-500 font-semibold"
                    : "text-slate-700 hover:text-orange-500"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <motion.span whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                    {link.name}
                  </motion.span>
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-orange-500"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="hidden items-center gap-5 lg:flex">

          {/* Saved */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-orange-500"
            title="Saved"
          >
            <FiHeart size={19} />
            <span>Saved</span>
          </motion.button>

          {/* Messages */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="relative flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-orange-500"
            title="Messages"
          >
            <FiMessageSquare size={19} />
            <span>Messages</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-2 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow-sm"
            >
              3
            </motion.span>
          </motion.button>

          {/* Notification */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="relative text-slate-700 hover:text-orange-500"
            title="Notifications"
          >
            <FiBell size={20} />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white shadow-sm"
            >
              2
            </motion.span>
          </motion.button>

          {/* Login */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/login"
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-orange-500 hover:text-orange-500"
            >
              Login
            </Link>
          </motion.div>

          {/* Register */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/register"
              className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
            >
              Register
            </Link>
          </motion.div>
        </div>

        {/* Mobile Button Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileMenu(!mobileMenu)}
          className="text-slate-800 lg:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenu ? <FiX size={26} /> : <FiMenu size={26} />}
        </motion.button>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-gray-100 bg-white px-5 py-6 lg:hidden overflow-hidden shadow-xl"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileMenu(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-orange-50 text-orange-500 font-semibold"
                          : "text-slate-700 hover:bg-orange-50 hover:text-orange-500"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 flex gap-3 border-t border-gray-100 pt-5"
            >
              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="flex-1 rounded-xl border border-gray-200 py-3 text-center text-sm font-semibold text-slate-800 hover:border-orange-500 transition-colors"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMobileMenu(false)}
                className="flex-1 rounded-xl bg-orange-500 py-3 text-center text-sm font-semibold text-white shadow-md shadow-orange-500/20 hover:bg-orange-600 transition-colors"
              >
                Register
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

 export default Navbar;