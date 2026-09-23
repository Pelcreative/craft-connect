import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheckCircle,
  FiTrendingUp,
  FiBriefcase,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";



import Logo from "../assets/artisan1.png";

const VendorHero = () => {
  return (
    <section className="overflow-hidden bg-[#fffaf3]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:py-16 lg:grid-cols-2 lg:px-10 lg:py-20">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Small Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-5 flex items-center gap-2"
          >
            <span className="h-2 w-2 rounded-full bg-orange-500" />

            <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
              For Professionals
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="max-w-xl text-4xl font-extrabold leading-[1.08] tracking-tight text-[#123b52] sm:text-5xl lg:text-[56px]">
            Turn your skills into{" "}
            <span className="text-orange-500">
              more opportunities.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-base leading-7 text-slate-500">
            Join CraftConnect and put your services in front of customers
            looking for talented professionals like you.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600"
              >
                Start Selling
                <FiArrowRight />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/how-it-works"
                className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:text-orange-500"
              >
                How It Works
              </Link>
            </motion.div>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-1 gap-3 text-xs text-slate-500 sm:grid-cols-3">

            <div className="flex items-center gap-2">
              <FiCheckCircle className="text-orange-500" />
              Free profile setup
            </div>

            <div className="flex items-center gap-2">
              <FiBriefcase className="text-orange-500" />
              Showcase your portfolio
            </div>

            <div className="flex items-center gap-2">
              <FiTrendingUp className="text-orange-500" />
              Manage bookings
            </div>

          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          {/* Decorative Circle */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-orange-100 opacity-70"
          />

          <div className="relative overflow-hidden rounded-3xl">
            <motion.img
              src={Logo}
              alt="Craft professional"
              className="h-[330px] w-full object-cover sm:h-[400px] lg:h-[460px]"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5 }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#123b52]/30 via-transparent to-transparent" />
          </div>

          {/* Floating Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-5 left-5 flex items-center gap-3 rounded-xl bg-white p-4 shadow-xl sm:bottom-7 sm:left-7"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
              <FiUsers />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">
                Grow your network
              </p>

              <p className="text-xs text-slate-500">
                Connect with new customers
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default VendorHero;