import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

const Footer = () => {
  const quickLinks = [
    "Home",
    "Categories",
    "Become a Vendor",
    "About Us",
    "Contact",
  ];

  const clientLinks = [
    "How It Works",
    "Search",
    "Reviews",
    "Blog",
    "Help Center",
  ];

  const vendorLinks = [
    "Vendor Dashboard",
    "Pricing",
    "Vendor Guide",
    "FAQs",
  ];

  return (
    <footer className="bg-white px-4 pt-12 sm:px-6 lg:px-16">

      <div className="mx-auto max-w-7xl">

        {/* Main Footer */}
        <div className="grid gap-10 border-b border-gray-200 pb-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl font-extrabold text-[#0a192f]">
              Craft<span className="text-orange-500">Connect</span>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
              Connecting you with the best artisans near you.
            </p>

            <div className="mt-5 flex gap-3">
              {[
                { icon: <FaFacebookF />, label: "Facebook" },
                { icon: <FaInstagram />, label: "Instagram" },
                { icon: <FaTwitter />, label: "Twitter" },
                { icon: <FaLinkedinIn />, label: "LinkedIn" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a192f] text-sm text-white transition hover:bg-orange-500"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <FooterColumn
            title="Quick Links"
            links={quickLinks}
          />

          {/* For Clients */}
          <FooterColumn
            title="For Clients"
            links={clientLinks}
          />

          {/* For Vendors */}
          <FooterColumn
            title="For Vendors"
            links={vendorLinks}
          />
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 py-5 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>
             © {new Date().getFullYear()} CraftConnect. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="#"
              className="transition hover:text-orange-500"
            >
              Privacy Policy
            </a>

            <span>|</span>

            <a
              href="#"
              className="transition hover:text-orange-500"
            >
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="mb-4 text-sm font-bold text-[#0a192f]">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="group flex items-center text-sm text-gray-500 transition hover:text-orange-500"
            >
              {link}

              <FiArrowUpRight className="ml-1 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Footer;