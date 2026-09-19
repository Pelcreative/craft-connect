import { useState } from "react";
import { Link } from "react-router-dom";
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
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="CraftConnect Logo"
            className="h-12 w-12 rounded-full object-cover"
          />

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Craft<span className="text-orange-500">Connect</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.to}
              className={`relative py-7 text-sm font-medium transition ${
                index === 0
                  ? "text-orange-500"
                  : "text-slate-700 hover:text-orange-500"
              }`}
            >
              {link.name}

              {index === 0 && (
                <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-orange-500" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-5 lg:flex">

          {/* Saved */}
          <button
            className="flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-orange-500"
            title="Saved"
          >
            <FiHeart size={19} />
            <span>Saved</span>
          </button>

          {/* Messages */}
          <button
            className="relative flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-orange-500"
            title="Messages"
          >
            <FiMessageSquare size={19} />
            <span>Messages</span>

            <span className="absolute -right-2 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
              3
            </span>
          </button>

          {/* Notification */}
          <button
            className="relative text-slate-700 hover:text-orange-500"
            title="Notifications"
          >
            <FiBell size={20} />

            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white">
              2
            </span>
          </button>

          {/* Login */}
          <Link
            to="/login"
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-orange-500 hover:text-orange-500"
          >
            Login
          </Link>

          {/* Register */}
          <Link
            to="/register"
            className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            Register
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="text-slate-800 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenu ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="border-t border-gray-100 bg-white px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-500"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex gap-3 border-t border-gray-100 pt-4">
            <Link
              to="/login"
              onClick={() => setMobileMenu(false)}
              className="flex-1 rounded-lg border border-gray-200 py-3 text-center text-sm font-semibold"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setMobileMenu(false)}
              className="flex-1 rounded-lg bg-orange-500 py-3 text-center text-sm font-semibold text-white"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;