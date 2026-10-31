<<<<<<< HEAD
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
=======
import { motion, useReducedMotion } from "framer-motion";
>>>>>>> a6bbdb8 (Save local dashboard changes)
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
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

<<<<<<< HEAD
import CustomerSidebar from "./CustomerSidebar";
import DashboardNavbar from "./DashboardNavbar";
import { getMyServiceRequests } from "../api/requests";
=======
import { Link } from "react-router-dom";
>>>>>>> a6bbdb8 (Save local dashboard changes)

/* =========================================
   DASHBOARD DATA
========================================= */

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
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=75",
  },
  {
    name: "Tolu Events & Decor",
    type: "Event Photographer",
    date: "May 30, 2025",
    time: "2:00 PM",
    location: "Lagos, Nigeria",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=75",
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
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=75",
  },
  {
    name: "Tolu Events & Decor",
    category: "Event Photographer",
    rating: "4.7",
    reviews: "98",
    location: "Lagos, Nigeria",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=75",
  },
  {
    name: "Emeka's Photography",
    category: "Portrait Photographer",
    rating: "4.9",
    reviews: "87",
    location: "Abuja, Nigeria",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=75",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

/* =========================================
   REUSABLE SECTION TITLE
========================================= */

function SectionTitle({ title, to }) {
  return (
    <div className="mb-5 flex min-w-0 items-center justify-between gap-3">
      <h2 className="min-w-0 break-words text-base font-bold text-[#09234a] sm:text-lg">
        {title}
      </h2>

      <Link
        to={to}
        className="shrink-0 text-xs font-semibold text-blue-500 transition-colors hover:text-orange-500"
      >
        View All
      </Link>
    </div>
  );
}

/* =========================================
   MAIN DASHBOARD
========================================= */

export default function CustomerDashboard() {
<<<<<<< HEAD
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [requestsError, setRequestsError] = useState("");

  useEffect(() => {
    getMyServiceRequests()
      .then(setServiceRequests)
      .catch((error) => setRequestsError(error.message));
  }, []);
=======
  const reduceMotion = useReducedMotion();
>>>>>>> a6bbdb8 (Save local dashboard changes)

  return (
    <div className="w-full min-w-0 overflow-x-clip text-slate-800">

      <motion.div
        variants={reduceMotion ? undefined : containerVariants}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        className="mx-auto w-full min-w-0 max-w-[1600px]"
      >

        {/* PAGE HEADER */}
        <motion.section
          variants={reduceMotion ? undefined : itemVariants}
          className="mb-6 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <p className="mb-1 text-sm font-semibold text-orange-500">
              Customer Portal
            </p>

            <h1 className="break-words text-2xl font-bold tracking-tight text-[#09234a] sm:text-3xl">
              Customer Dashboard
            </h1>

            <p className="mt-2 break-words text-sm leading-6 text-slate-500">
              Manage your bookings, vendors and activities.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="w-fit shrink-0 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500"
          >
            Logout
          </button>
        </motion.section>

<<<<<<< HEAD
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
                  localStorage.removeItem("accessToken");
                  sessionStorage.removeItem("accessToken");
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

            <motion.section
              variants={itemVariants}
              className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#09234a]">My Service Requests</h2>
                  <p className="mt-1 text-sm text-slate-500">Track requests you have sent to artisans.</p>
                </div>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-600">
                  {serviceRequests.length}
                </span>
              </div>

              {requestsError && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{requestsError}</p>}
              {!requestsError && serviceRequests.length === 0 && (
                <p className="text-sm text-slate-500">You have not sent any service requests yet.</p>
              )}
              <div className="space-y-3">
                {serviceRequests.slice(0, 3).map((serviceRequest) => {
                  const partner = serviceRequest.artisan
                    ? serviceRequest.artisan.businessName
                    : serviceRequest.client?.name;

                  return (
                    <div key={serviceRequest.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-4">
                      <div>
                        <p className="font-semibold text-[#09234a]">{serviceRequest.title}</p>
                        <p className="mt-1 text-sm text-slate-500">{partner}</p>
                      </div>
                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold capitalize text-orange-600">
                        {serviceRequest.status}
                      </span>
                    </div>
                  );
                })}
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
=======
        {/* WELCOME BANNER */}
        <motion.section
          variants={reduceMotion ? undefined : itemVariants}
          className="relative mb-6 min-w-0 overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 via-orange-50 to-white"
        >
          <div className="relative z-10 max-w-xl p-5 sm:p-7">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-xl">
              👋
>>>>>>> a6bbdb8 (Save local dashboard changes)
            </div>

            <h2 className="break-words text-xl font-bold leading-tight text-[#09234a] sm:text-2xl">
              Welcome back, Ada!
            </h2>

            <p className="mt-2 break-words text-sm leading-6 text-slate-500">
              Here's what's happening with your bookings, messages and more.
            </p>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] overflow-hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=700&q=75"
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-orange-50/40 to-transparent" />
          </div>
        </motion.section>

        {/* STATISTICS */}
        <section className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.article
                key={stat.title}
                variants={reduceMotion ? undefined : itemVariants}
                className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${stat.iconBg}`}
                  >
                    <Icon size={21} className={stat.iconColor} />
                  </div>

                  <p className="min-w-0 break-words text-sm leading-5 text-slate-500">
                    {stat.title}
                  </p>
                </div>

                <h3 className="mt-4 break-words text-2xl font-bold text-[#09234a]">
                  {stat.value}
                </h3>

                <p className="mt-2 break-words text-xs font-medium leading-5 text-emerald-500">
                  ↑ {stat.change}
                </p>
              </motion.article>
            );
          })}
        </section>

        {/* MAIN CONTENT GRID */}
        <div className="mt-6 grid min-w-0 grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1fr)_300px]">

          {/* LEFT COLUMN */}
          <div className="min-w-0 space-y-6">

            {/* BOOKINGS AND CATEGORIES */}
            <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-2">

              {/* UPCOMING BOOKINGS */}
              <motion.section
                variants={reduceMotion ? undefined : itemVariants}
                className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <SectionTitle title="Upcoming Bookings" to="/bookings" />

                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <article
                      key={booking.name}
                      className="flex min-w-0 flex-col gap-3 rounded-xl border border-slate-100 p-3 transition-colors hover:border-orange-100 hover:bg-orange-50/30 sm:flex-row"
                    >
                      <img
                        src={booking.image}
                        alt={booking.name}
                        loading="lazy"
                        decoding="async"
                        className="h-36 w-full shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 flex-wrap items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h3 className="break-words text-sm font-bold leading-5 text-[#09234a]">
                              {booking.name}
                            </h3>

                            <p className="mt-1 break-words text-xs leading-5 text-slate-500">
                              {booking.type}
                            </p>
                          </div>

                          <span
                            className={`max-w-full shrink-0 break-words rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                              booking.status === "Confirmed"
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-orange-50 text-orange-500"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <div className="mt-3 flex min-w-0 flex-col gap-2 text-xs leading-5 text-slate-500">
                          <span className="flex min-w-0 items-start gap-2">
                            <CalendarDays size={14} className="mt-0.5 shrink-0" />
                            <span className="min-w-0 break-words">
                              {booking.date} · {booking.time}
                            </span>
                          </span>

                          <span className="flex min-w-0 items-start gap-2">
                            <MapPin size={14} className="mt-0.5 shrink-0" />
                            <span className="min-w-0 break-words">
                              {booking.location}
                            </span>
                          </span>
                        </div>

                        <div className="mt-3 flex min-w-0 flex-wrap gap-2">
                          <Link
                            to="/bookings"
                            className="rounded-lg border border-slate-200 px-3 py-2 text-center text-[11px] font-medium text-slate-600 transition-colors hover:border-orange-300 hover:text-orange-500"
                          >
                            View Details
                          </Link>

                          <Link
                            to="/messages"
                            className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-lg bg-orange-500 px-3 py-2 text-center text-[11px] font-semibold text-white transition-colors hover:bg-orange-600"
                          >
                            <MessageSquare size={13} className="shrink-0" />
                            <span className="break-words">Message Vendor</span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </motion.section>

              {/* POPULAR CATEGORIES */}
              <motion.section
                variants={reduceMotion ? undefined : itemVariants}
                className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <SectionTitle title="Popular Categories" to="/categories" />

                <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-4">
                  {categories.map((category) => {
                    const Icon = category.icon;

                    return (
                      <Link
                        key={category.name}
                        to="/categories"
                        className="flex min-w-0 min-h-[110px] flex-col items-center justify-center rounded-xl border border-slate-100 p-3 text-center transition-colors hover:border-orange-200 hover:bg-orange-50/30"
                      >
                        <div
                          className={`mb-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${category.style}`}
                        >
                          <Icon size={20} />
                        </div>

                        <span className="w-full break-words text-xs font-medium leading-5 text-slate-600">
                          {category.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </motion.section>
            </div>

            {/* RECENT VENDORS */}
            <motion.section
              variants={reduceMotion ? undefined : itemVariants}
              className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
            >
              <SectionTitle title="Recent Vendors" to="/categories" />

              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
                {vendors.map((vendor) => (
                  <article
                    key={vendor.name}
                    className="min-w-0 rounded-xl border border-slate-100 p-3 transition-colors hover:border-orange-100"
                  >
                    <div className="relative">
                      <img
                        src={vendor.image}
                        alt={vendor.name}
                        loading="lazy"
                        decoding="async"
                        className="h-40 w-full rounded-xl object-cover sm:h-36"
                      />

                      <button
                        type="button"
                        aria-label={`Save ${vendor.name}`}
                        className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow-sm transition-colors hover:bg-red-50"
                      >
                        <Heart size={16} />
                      </button>
                    </div>

                    <h3 className="mt-3 break-words text-sm font-bold leading-5 text-[#09234a]">
                      {vendor.name}
                    </h3>

                    <p className="mt-1 break-words text-xs leading-5 text-slate-500">
                      {vendor.category}
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-xs">
                      <Star
                        size={14}
                        className="shrink-0 fill-orange-400 text-orange-400"
                      />

                      <span className="font-semibold text-slate-700">
                        {vendor.rating}
                      </span>

                      <span className="text-slate-400">
                        ({vendor.reviews} reviews)
                      </span>
                    </div>

                    <p className="mt-2 flex min-w-0 items-start gap-2 text-xs leading-5 text-slate-500">
                      <MapPin size={13} className="mt-0.5 shrink-0" />
                      <span className="min-w-0 break-words">
                        {vendor.location}
                      </span>
                    </p>

                    <Link
                      to="/categories"
                      className="mt-3 flex w-full min-w-0 items-center justify-center gap-2 rounded-lg border border-blue-100 px-2 py-2 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                    >
                      <span>View Profile</span>
                      <ArrowUpRight size={14} className="shrink-0" />
                    </Link>
                  </article>
                ))}
              </div>
            </motion.section>
          </div>

          {/* QUICK ACTIONS */}
          <div className="min-w-0">
            <motion.section
              variants={reduceMotion ? undefined : itemVariants}
              className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
            >
              <h2 className="break-words text-base font-bold text-[#09234a] sm:text-lg">
                Quick Actions
              </h2>

              <p className="mt-1 break-words text-xs leading-5 text-slate-500">
                Frequently used shortcuts.
              </p>

              <div className="mt-4 space-y-2">
                <Link
                  to="/categories"
                  className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-slate-100 p-3 text-sm font-medium text-slate-700 transition-colors hover:border-orange-200 hover:bg-orange-50/50"
                >
                  <span className="min-w-0 break-words">
                    Explore Categories
                  </span>

                  <ChevronRight size={16} className="shrink-0 text-slate-400" />
                </Link>

                <Link
                  to="/saved-vendors"
                  className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-slate-100 p-3 text-sm font-medium text-slate-700 transition-colors hover:border-orange-200 hover:bg-orange-50/50"
                >
                  <span className="min-w-0 break-words">
                    Saved Vendors
                  </span>

                  <ChevronRight size={16} className="shrink-0 text-slate-400" />
                </Link>

                <Link
                  to="/make-payment"
                  className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-slate-100 p-3 text-sm font-medium text-slate-700 transition-colors hover:border-orange-200 hover:bg-orange-50/50"
                >
                  <span className="min-w-0 break-words">
                    Billing & Payments
                  </span>

                  <ChevronRight size={16} className="shrink-0 text-slate-400" />
                </Link>
              </div>
            </motion.section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
