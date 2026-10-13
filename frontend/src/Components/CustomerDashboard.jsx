import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  Users,
  WalletCards,
  MapPin,
  MessageSquare,
  Heart,
  Star,
  Camera,
  Scissors,
  CalendarCheck,
  Grid3X3,
  ChevronRight,
  // ChevronDown,
  // Bookmark,
  // CreditCard,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import CustomerSidebar from "./CustomerSidebar";
import DashboardNavbar from "./DashboardNavbar";

/* =========================================================
   DATA
========================================================= */

const stats = [
  {
    title: "Upcoming Bookings",
    value: "2",
    change: "1 from last week",
    icon: CalendarDays,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    title: "Completed Bookings",
    value: "12",
    change: "3 from last week",
    icon: CheckCircle2,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    title: "Saved Vendors",
    value: "8",
    change: "2 new this week",
    icon: Users,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    title: "Total Spent",
    value: "₦320,000",
    change: "12% from last month",
    icon: WalletCards,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
];

const bookings = [
  {
    name: "Zainab's Fashion Hub",
    type: "Fashion Designer & Tailor",
    date: "May 28, 2025",
    time: "10:00 AM",
    location: "Lagos, Nigeria",
    status: "Confirmed",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=85",
  },
  {
    name: "Tolu Events & Decor",
    type: "Event Photographer",
    date: "May 30, 2025",
    time: "2:00 PM",
    location: "Lagos, Nigeria",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=85",
  },
];

const categories = [
  {
    name: "Fashion Designers",
    icon: Sparkles,
    style: "bg-pink-50 text-pink-500",
  },
  {
    name: "Caterers",
    icon: Sparkles,
    style: "bg-orange-50 text-orange-500",
  },
  {
    name: "Photographers",
    icon: Camera,
    style: "bg-blue-50 text-blue-500",
  },
  {
    name: "Decorators",
    icon: Sparkles,
    style: "bg-purple-50 text-purple-500",
  },
  {
    name: "Makeup Artists",
    icon: Sparkles,
    style: "bg-red-50 text-red-500",
  },
  {
    name: "Tailors",
    icon: Scissors,
    style: "bg-cyan-50 text-cyan-500",
  },
  {
    name: "Event Planners",
    icon: CalendarCheck,
    style: "bg-violet-50 text-violet-500",
  },
  {
    name: "Others",
    icon: Grid3X3,
    style: "bg-slate-100 text-slate-600",
  },
];

const vendors = [
  {
    name: "Zainab's Fashion Hub",
    category: "Fashion Designer & Tailor",
    rating: "4.8",
    reviews: "124",
    location: "Lagos, Nigeria",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=85",
  },
  {
    name: "Tolu Events & Decor",
    category: "Event Photographer",
    rating: "4.7",
    reviews: "98",
    location: "Lagos, Nigeria",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=85",
  },
  {
    name: "Emeka's Photography",
    category: "Portrait Photographer",
    rating: "4.9",
    reviews: "87",
    location: "Abuja, Nigeria",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=85",
  },
];

/* =========================================================
   ANIMATION SETTINGS
========================================================= */

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
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   MAIN DASHBOARD
========================================================= */

export default function CustomerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className="
        min-h-screen
        bg-[#f7faff]
        text-slate-800
      "
    >
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <CustomerSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          min-h-screen
          lg:pl-[270px]
        "
      >
        {/* Navbar */}
        <DashboardNavbar
          setIsOpen={setIsSidebarOpen}
        />

        <main
          className="
            px-4
            py-6
            sm:px-6
            lg:px-8
          "
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="
              mx-auto
              max-w-[1600px]
            "
          >
            {/* =================================================
                PAGE TITLE
            ================================================= */}

            <motion.div
              variants={itemVariants}
              className="
                mb-6
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <p
                  className="
                    mb-1
                    text-sm
                    font-semibold
                    text-orange-500
                  "
                >
                  Customer Portal
                </p>

                <h1
                  className="
                    text-2xl
                    font-bold
                    tracking-tight
                    text-[#09234a]
                    sm:text-3xl
                  "
                >
                  Customer Dashboard
                </h1>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Manage your bookings, vendors and activities.
                </p>
              </div>

              {/* Logout */}
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="
                  w-fit
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-slate-600
                  shadow-sm
                  transition

                  hover:border-red-200
                  hover:bg-red-50
                  hover:text-red-500
                "
              >
                Logout
              </button>
            </motion.div>

            {/* =================================================
                WELCOME BANNER
            ================================================= */}

            <motion.section
              variants={itemVariants}
              className="
                relative
                mb-6
                min-h-[130px]
                overflow-hidden
                rounded-2xl
                border
                border-orange-100
                bg-gradient-to-r
                from-orange-50
                via-orange-50
                to-white
              "
            >
              <div
                className="
                  relative
                  z-10
                  max-w-xl
                  p-6
                  sm:p-7
                "
              >
                <div
                  className="
                    mb-3
                    flex
                    h-10 w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-orange-100
                    text-xl
                  "
                >
                  👋
                </div>

                <h2
                  className="
                    text-xl
                    font-bold
                    text-[#09234a]
                    sm:text-2xl
                  "
                >
                  Welcome back, Ada!
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-slate-500
                  "
                >
                  Here's what's happening with your
                  bookings, messages and more.
                </p>
              </div>

              {/* Banner image */}
              <div
                className="
                  absolute
                  inset-y-0
                  right-0
                  hidden
                  w-[45%]
                  overflow-hidden
                  lg:block
                "
              >
                <img
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&q=85"
                  alt=""
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-r
                    from-orange-50
                    via-orange-50/30
                    to-transparent
                  "
                />
              </div>
            </motion.section>

            {/* =================================================
                STAT CARDS
            ================================================= */}

            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                xl:grid-cols-4
              "
            >
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <motion.div
                    key={stat.title}
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      boxShadow:
                        "0 15px 35px rgba(15, 23, 42, 0.08)",
                    }}
                    className="
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-5
                      shadow-sm
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <div
                        className={`
                          flex
                          h-11 w-11
                          items-center
                          justify-center
                          rounded-full
                          ${stat.iconBg}
                        `}
                      >
                        <Icon
                          size={21}
                          className={stat.iconColor}
                        />
                      </div>

                      <p
                        className="
                          text-sm
                          text-slate-500
                        "
                      >
                        {stat.title}
                      </p>
                    </div>

                    <h3
                      className="
                        mt-4
                        text-2xl
                        font-bold
                        text-[#09234a]
                      "
                    >
                      {stat.value}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-xs
                        font-medium
                        text-emerald-500
                      "
                    >
                      ↑ {stat.change}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* =================================================
                MAIN TWO-COLUMN AREA
            ================================================= */}

            <div
              className="
                mt-6
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-[minmax(0,1fr)_350px]
              "
            >
              {/* =================================================
                  LEFT COLUMN
              ================================================= */}

              <div
                className="
                  min-w-0
                  space-y-6
                "
              >
                {/* ===============================================
                    BOOKINGS + CATEGORIES
                =============================================== */}

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-6
                    2xl:grid-cols-[1.15fr_0.85fr]
                  "
                >
                  {/* UPCOMING BOOKINGS */}
                  <motion.section
                    variants={itemVariants}
                    className="
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-5
                      shadow-sm
                    "
                  >
                    <div
                      className="
                        mb-5
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <h2
                        className="
                          text-base
                          font-bold
                          text-[#09234a]
                          sm:text-lg
                        "
                      >
                        Upcoming Bookings
                      </h2>

                      <button
                        className="
                          text-xs
                          font-semibold
                          text-blue-500
                          transition
                          hover:text-orange-500
                        "
                      >
                        View All
                      </button>
                    </div>

                    <div className="space-y-4">
                      {bookings.map((booking, index) => (
                        <motion.div
                          key={booking.name}
                          initial={{
                            opacity: 0,
                            x: -15,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: 0.2 + index * 0.1,
                          }}
                          className="
                            flex
                            flex-col
                            gap-4
                            rounded-xl
                            border
                            border-slate-100
                            p-3
                            transition
                            hover:border-orange-100
                            hover:bg-orange-50/30
                            sm:flex-row
                          "
                        >
                          <img
                            src={booking.image}
                            alt={booking.name}
                            className="
                              h-24
                              w-full
                              rounded-xl
                              object-cover
                              sm:h-20
                              sm:w-20
                            "
                          />

                          <div className="min-w-0 flex-1">
                            <div
                              className="
                                flex
                                flex-wrap
                                items-start
                                justify-between
                                gap-2
                              "
                            >
                              <div>
                                <h3
                                  className="
                                    text-sm
                                    font-bold
                                    text-[#09234a]
                                  "
                                >
                                  {booking.name}
                                </h3>

                                <p
                                  className="
                                    mt-1
                                    text-xs
                                    text-slate-500
                                  "
                                >
                                  {booking.type}
                                </p>
                              </div>

                              <span
                                className={`
                                  rounded-full
                                  px-3
                                  py-1
                                  text-[10px]
                                  font-semibold
                                  ${
                                    booking.status ===
                                    "Confirmed"
                                      ? "bg-emerald-50 text-emerald-600"
                                      : "bg-orange-50 text-orange-500"
                                  }
                                `}
                              >
                                {booking.status}
                              </span>
                            </div>

                            <div
                              className="
                                mt-3
                                flex
                                flex-wrap
                                gap-x-4
                                gap-y-2
                                text-xs
                                text-slate-500
                              "
                            >
                              <span
                                className="
                                  flex
                                  items-center
                                  gap-1
                                "
                              >
                                <CalendarDays size={13} />
                                {booking.date} • {booking.time}
                              </span>

                              <span
                                className="
                                  flex
                                  items-center
                                  gap-1
                                "
                              >
                                <MapPin size={13} />
                                {booking.location}
                              </span>
                            </div>

                            <div
                              className="
                                mt-3
                                flex
                                flex-wrap
                                gap-2
                              "
                            >
                              <button
                                className="
                                  rounded-lg
                                  border
                                  border-slate-200
                                  px-3 py-2
                                  text-[11px]
                                  font-medium
                                  text-slate-600
                                  transition
                                  hover:border-orange-300
                                  hover:text-orange-500
                                "
                              >
                                View Details
                              </button>

                              <button
                                className="
                                  flex
                                  items-center
                                  gap-1
                                  rounded-lg
                                  bg-orange-500
                                  px-3 py-2
                                  text-[11px]
                                  font-semibold
                                  text-white
                                  transition
                                  hover:bg-orange-600
                                "
                              >
                                <MessageSquare size={12} />
                                Message Vendor
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>

                  {/* POPULAR CATEGORIES */}
                  <motion.section
                    variants={itemVariants}
                    className="
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-5
                      shadow-sm
                    "
                  >
                    <div
                      className="
                        mb-5
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <h2
                        className="
                          text-base
                          font-bold
                          text-[#09234a]
                          sm:text-lg
                        "
                      >
                        Popular Categories
                      </h2>

                      <button
                        className="
                          text-xs
                          font-semibold
                          text-blue-500
                        "
                      >
                        View All
                      </button>
                    </div>

                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-3
                        sm:grid-cols-4
                        2xl:grid-cols-4
                      "
                    >
                      {categories.map((category, index) => {
                        const Icon = category.icon;

                        return (
                          <motion.button
                            key={category.name}
                            initial={{
                              opacity: 0,
                              scale: 0.9,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            transition={{
                              delay: 0.2 + index * 0.05,
                            }}
                            whileHover={{
                              y: -4,
                            }}
                            className="
                              flex
                              min-h-[105px]
                              flex-col
                              items-center
                              justify-center
                              rounded-xl
                              border
                              border-slate-100
                              p-3
                              transition
                              hover:border-orange-100
                              hover:shadow-sm
                            "
                          >
                            <div
                              className={`
                                mb-2
                                flex
                                h-11 w-11
                                items-center
                                justify-center
                                rounded-full
                                ${category.style}
                              `}
                            >
                              <Icon size={21} />
                            </div>

                            <span
                              className="
                                text-center
                                text-[10px]
                                font-medium
                                text-slate-600
                              "
                            >
                              {category.name}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.section>
                </div>

                {/* ===============================================
                    RECENT VENDORS
                =============================================== */}

                <motion.section
                  variants={itemVariants}
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-5
                    shadow-sm
                  "
                >
                  <div
                    className="
                      mb-5
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <h2
                      className="
                        text-base
                        font-bold
                        text-[#09234a]
                        sm:text-lg
                      "
                    >
                      Recent Vendors
                    </h2>

                    <button
                      className="
                        text-xs
                        font-semibold
                        text-blue-500
                      "
                    >
                      View All
                    </button>
                  </div>

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-4
                      md:grid-cols-3
                    "
                  >
                    {vendors.map((vendor) => (
                      <motion.article
                        key={vendor.name}
                        whileHover={{
                          y: -5,
                        }}
                        className="
                          rounded-xl
                          border
                          border-slate-100
                          p-3
                        "
                      >
                        <div className="relative">
                          <img
                            src={vendor.image}
                            alt={vendor.name}
                            className="
                              h-36
                              w-full
                              rounded-xl
                              object-cover
                            "
                          />

                          <button
                            className="
                              absolute
                              right-2
                              top-2
                              flex
                              h-8 w-8
                              items-center
                              justify-center
                              rounded-full
                              bg-white/90
                              text-red-500
                              shadow-sm
                              backdrop-blur
                            "
                          >
                            <Heart size={15} />
                          </button>
                        </div>

                        <h3
                          className="
                            mt-3
                            text-sm
                            font-bold
                            text-[#09234a]
                          "
                        >
                          {vendor.name}
                        </h3>

                        <p
                          className="
                            mt-1
                            text-xs
                            text-slate-500
                          "
                        >
                          {vendor.category}
                        </p>

                        <div
                          className="
                            mt-2
                            flex
                            items-center
                            gap-1
                            text-xs
                          "
                        >
                          <Star
                            size={13}
                            className="
                              fill-orange-400
                              text-orange-400
                            "
                          />

                          <span
                            className="
                              font-semibold
                              text-slate-700
                            "
                          >
                            {vendor.rating}
                          </span>

                          <span className="text-slate-400">
                            ({vendor.reviews})
                          </span>
                        </div>

                        <p
                          className="
                            mt-2
                            flex
                            items-center
                            gap-1
                            text-xs
                            text-slate-500
                          "
                        >
                          <MapPin size={12} />
                          {vendor.location}
                        </p>

                        <button
                          className="
                            mt-3
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-lg
                            border
                            border-blue-100
                            py-2
                            text-xs
                            font-semibold
                            text-blue-600
                            transition
                            hover:bg-blue-50
                          "
                        >
                          View Profile <ArrowUpRight size={13} />
                        </button>
                      </motion.article>
                    ))}
                  </div>
                </motion.section>
              </div>

              {/* =================================================
                  RIGHT COLUMN (SIDEBAR / WIDGETS)
              ================================================= */}
              <div className="space-y-6">
                <motion.section
                  variants={itemVariants}
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-5
                    shadow-sm
                  "
                >
                  <h2
                    className="
                      text-base
                      font-bold
                      text-[#09234a]
                      sm:text-lg
                    "
                  >
                    Quick Actions
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Frequently used shortcuts.
                  </p>
                  
                  <div className="mt-4 space-y-2">
                    <button className="flex w-full items-center justify-between rounded-xl border border-slate-100 p-3 text-sm font-medium text-slate-700 transition hover:border-orange-200 hover:bg-orange-50/50">
                      <span>Explore Categories</span>
                      <ChevronRight size={16} className="text-slate-400" />
                    </button>
                    <button className="flex w-full items-center justify-between rounded-xl border border-slate-100 p-3 text-sm font-medium text-slate-700 transition hover:border-orange-200 hover:bg-orange-50/50">
                      <span>Saved Vendors</span>
                      <ChevronRight size={16} className="text-slate-400" />
                    </button>
                    <button className="flex w-full items-center justify-between rounded-xl border border-slate-100 p-3 text-sm font-medium text-slate-700 transition hover:border-orange-200 hover:bg-orange-50/50">
                      <span>Billing & Payments</span>
                      <ChevronRight size={16} className="text-slate-400" />
                    </button>
                  </div>
                </motion.section>
              </div>

            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}