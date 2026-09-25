import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheckCircle,
  FiUsers,
  FiBriefcase,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import Hero from "../assets/artisan2.png";

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#fffaf2]">
      {/* Decorative background */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-100/40 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:py-16 lg:grid-cols-2 lg:px-10 lg:py-20">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-5 flex items-center gap-2"
          >
            <span className="h-2 w-2 rounded-full bg-orange-500" />

            <span className="text-xs font-bold uppercase tracking-[0.12em] text-orange-500">
              About CraftConnect
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-[#123b52] sm:text-5xl lg:text-[54px]">
            Connecting great talent with{" "}
            <span className="text-orange-500">
              opportunity.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            CraftConnect is a marketplace designed to make finding,
            booking and working with talented local artisans easier,
            safer and more convenient.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/artisans"
                className="group flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600"
              >
                Explore Artisans

                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/become-vendor"
                className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-[#123b52] transition hover:border-orange-300 hover:text-orange-500"
              >
                Become a Vendor
              </Link>
            </motion.div>
          </div>

          {/* Small benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-500"
          >
            <span className="flex items-center gap-2">
              <FiCheckCircle className="text-orange-500" />
              Trusted professionals
            </span>

            <span className="flex items-center gap-2">
              <FiUsers className="text-orange-500" />
              Local talent
            </span>

            <span className="flex items-center gap-2">
              <FiBriefcase className="text-orange-500" />
              Easy bookings
            </span>
          </motion.div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{
            opacity: 0,
            x: 45,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          className="relative"
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative overflow-hidden rounded-[28px]"
          >
            <motion.img
              src={Hero}
              alt="CraftConnect artisan"
              className="h-[330px] w-full object-cover sm:h-[420px] lg:h-[460px]"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5 }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#123b52]/20 to-transparent" />
          </motion.div>

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.5,
            }}
            className="absolute bottom-5 left-5 rounded-xl bg-white/95 p-4 shadow-xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                <FiUsers size={19} />
              </div>

              <div>
                <p className="text-sm font-bold text-[#123b52]">
                  Local Talent
                </p>

                <p className="text-xs text-slate-500">
                  Ready to be discovered
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;