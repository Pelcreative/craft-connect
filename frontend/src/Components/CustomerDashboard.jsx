import { useState } from "react";
import { motion } from "framer-motion";

import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiMapPin,
  FiArrowRight,
  FiShoppingBag,
} from "react-icons/fi";

import UserSidebar from "./CustomerSidebar";

/* ========================================
   DASHBOARD DATA
======================================== */

const stats = [
  {
    title: "Upcoming Bookings",
    value: "2",
    icon: FiCalendar,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Completed",
    value: "12",
    icon: FiCheckCircle,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Saved Vendors",
    value: "8",
    icon: FiClock,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Pending Payments",
    value: "1",
    icon: FiCreditCard,
    color: "bg-orange-50 text-orange-600",
  },
];

const recentOrders = [
  {
    id: 1,
    vendor: "Tasty Bites Catering",
    date: "April 15, 2025",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=200&q=80",
  },
  {
    id: 2,
    vendor: "Glam by Zoe",
    date: "April 14, 2025",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80",
  },
  {
    id: 3,
    vendor: "Brown Ivy Events",
    date: "March 28, 2025",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&q=80",
  },
];

/* ========================================
   ANIMATIONS
======================================== */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cardHover = {
  y: -5,
  transition: {
    duration: 0.25,
  },
};

/* ========================================
   STAT CARD
======================================== */

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={cardHover}
      className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <motion.h3
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-3 text-3xl font-bold text-slate-900"
          >
            {value}
          </motion.h3>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${color} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
};

/* ========================================
   UPCOMING BOOKING
======================================== */

const UpcomingBooking = () => {
  return (
    <motion.section
      variants={itemVariants}
      className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Upcoming Booking</h2>
          <p className="mt-1 text-sm text-slate-500">Your next scheduled service</p>
        </div>
        <div className="hidden rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 sm:block">
          Upcoming
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-5 sm:flex-row">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="h-48 w-full overflow-hidden rounded-xl sm:h-32 sm:w-40"
          >
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80"
              alt="Birthday cake"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <div className="flex flex-1 flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Birthday Cake
              </span>
              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Sweet Delights
              </h3>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <FiCalendar className="text-blue-500" /> May 20, 2025
                </span>
                <span className="flex items-center gap-2">
                  <FiClock className="text-blue-500" /> 2:00 PM
                </span>
                <span className="flex items-center gap-2">
                  <FiMapPin className="text-blue-500" /> Lagos, Nigeria
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600 sm:mt-4"
            >
              View Details
              <FiArrowRight />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

/* ========================================
   RECENT ORDERS
======================================== */

const RecentOrders = () => {
  return (
    <motion.section
      variants={itemVariants}
      className="rounded-2xl border border-slate-100 bg-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
          <p className="mt-1 text-sm text-slate-500">Your latest vendor activities</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          View All
          <FiArrowRight size={15} />
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {recentOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ backgroundColor: "#f8fafc" }}
            className="flex items-center justify-between gap-4 px-6 py-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl">
                <img
                  src={order.image}
                  alt={order.vendor}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-slate-800">
                  {order.vendor}
                </h3>
                <p className="mt-1 text-xs text-slate-500">{order.date}</p>
              </div>
            </div>

            <span className="flex-shrink-0 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
              Confirmed
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

/* ========================================
   CUSTOMER DASHBOARD
======================================== */

const CustomerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <UserSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* MAIN CONTENT CONTAINER */}
      <div className="lg:ml-[270px]">
        <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Dashboard Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="mb-1 text-sm font-medium text-blue-600">
                    Customer Dashboard
                  </p>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Welcome back, Ada!
                  </h1>
                  <p className="mt-2 text-sm text-slate-500 sm:text-base">
                    Here's what's happening with your bookings.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  <FiShoppingBag />
                  Explore Vendors
                </motion.button>
              </div>
            </motion.div>

            {/* Statistics */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {stats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
              ))}
            </motion.div>

            {/* Main Dashboard Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2"
            >
              <UpcomingBooking />
              <RecentOrders />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;