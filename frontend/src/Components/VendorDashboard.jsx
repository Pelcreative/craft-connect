
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  Sun,
  CalendarDays,
  Clock3,
  CheckCircle2,
  Wallet,
  Shirt,
  Camera,
  Cake,
  Flower2,
  Scissors,
  CalendarCheck,
  LayoutGrid,
  MapPin,
  Star,
  MessageSquare,
  Bookmark,
  TrendingUp,
  ArrowRight,
  Crown,
  CreditCard,
  Bell,
} from "lucide-react";

const bookings = [
  {
    id: 1,
    name: "Zainab's Fashion Hub",
    service: "Fashion Designer & Tailor",
    date: "May 28, 2025",
    time: "10:00 AM",
    location: "Lagos, Nigeria",
    status: "Confirmed",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=180&q=85",
  },
  {
    id: 2,
    name: "Tolu Events & Decor",
    service: "Event Photographer",
    date: "May 30, 2025",
    time: "2:00 PM",
    location: "Lagos, Nigeria",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=180&q=85",
  },
];

const categories = [
  { name: "Fashion Designers", icon: Shirt, color: "bg-pink-100 text-pink-500" },
  { name: "Caterers", icon: Cake, color: "bg-orange-100 text-orange-500" },
  { name: "Photographers", icon: Camera, color: "bg-blue-100 text-blue-500" },
  { name: "Decorators", icon: Flower2, color: "bg-purple-100 text-purple-500" },
  { name: "Makeup Artists", icon: Scissors, color: "bg-pink-100 text-pink-500" },
  { name: "Tailors", icon: Scissors, color: "bg-blue-100 text-blue-500" },
  { name: "Event Planners", icon: CalendarCheck, color: "bg-purple-100 text-purple-500" },
  { name: "Others", icon: LayoutGrid, color: "bg-blue-100 text-blue-500" },
];

const activities = [
  {
    title: "Booking Confirmed",
    description: "Your booking with Zainab's Fashion Hub has been confirmed.",
    time: "2h ago",
    icon: CalendarDays,
    color: "bg-orange-100 text-orange-500",
  },
  {
    title: "New Message",
    description: "Tolu Events & Decor sent you a message.",
    time: "4h ago",
    icon: MessageSquare,
    color: "bg-blue-100 text-blue-500",
  },
  {
    title: "Payment Successful",
    description: "Your payment of ₦25,000 was successful.",
    time: "6h ago",
    icon: CreditCard,
    color: "bg-blue-100 text-blue-500",
  },
  {
    title: "Review Reminder",
    description: "You have a pending review.",
    time: "1d ago",
    icon: Star,
    color: "bg-orange-100 text-orange-500",
  },
  {
    title: "New Vendor Saved",
    description: "You saved Emeka's Photography.",
    time: "1d ago",
    icon: Bookmark,
    color: "bg-orange-100 text-orange-500",
  },
];

const vendors = [
  {
    name: "Zainab's Fashion Hub",
    service: "Fashion Designer & Tailor",
    rating: "4.8",
    reviews: "124",
    location: "Lagos, Nigeria",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=180&q=85",
  },
  {
    name: "Tolu Events & Decor",
    service: "Event Photographer",
    rating: "4.7",
    reviews: "98",
    location: "Lagos, Nigeria",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=180&q=85",
  },
  {
    name: "Emeka's Photography",
    service: "Portrait Photographer",
    rating: "4.8",
    reviews: "87",
    location: "Abuja, Nigeria",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=180&q=85",
  },
];

const stats = [
  {
    title: "Total Bookings",
    value: "18",
    growth: "12%",
    icon: CalendarDays,
    color: "bg-orange-100 text-orange-500",
  },
  {
    title: "Pending",
    value: "5",
    growth: "8%",
    icon: Clock3,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Completed",
    value: "12",
    growth: "21%",
    icon: CheckCircle2,
    color: "bg-emerald-100 text-emerald-500",
  },
  {
    title: "Total Earnings",
    value: "₦320,000",
    growth: "15%",
    icon: Wallet,
    color: "bg-blue-100 text-blue-500",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

function SectionHeading({ title, link = "/vendor/bookings" }) {
  const navigate = useNavigate();

  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <h2 className="text-base font-bold text-[#092a61]">{title}</h2>

      <button
        type="button"
        onClick={() => navigate(link)}
        className="shrink-0 text-xs font-semibold text-blue-600 hover:text-orange-500"
      >
        View All
      </button>
    </div>
  );
}

function StatCard({ item }) {
  const Icon = item.icon;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5 }}
      className="rounded-2xl border border-blue-50 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className={`flex h-11 w-11 items-center justify-center rounded-full ${item.color}`}>
          <Icon size={22} />
        </span>

        <span className="text-sm font-medium text-slate-600">
          {item.title}
        </span>
      </div>

      <h2 className="text-2xl font-bold text-[#092a61]">
        {item.value}
      </h2>

      <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
        <TrendingUp size={14} className="text-emerald-500" />
        <strong className="text-emerald-500">{item.growth}</strong>
        from last week
      </p>
    </motion.div>
  );
}

function RecentBookings() {
  const navigate = useNavigate();

  return (
    <motion.section
      variants={fadeUp}
      className="rounded-2xl border border-blue-50 bg-white p-4 shadow-sm sm:p-5"
    >
      <SectionHeading title="Recent Bookings" />

      <div className="divide-y divide-slate-100">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
          >
            <img
              src={booking.image}
              alt={booking.name}
              className="h-16 w-16 shrink-0 rounded-xl object-cover"
              loading="lazy"
            />

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-[#092a61]">
                {booking.name}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {booking.service}
              </p>

              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <CalendarDays size={12} />
                  {booking.date} · {booking.time}
                </span>

                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {booking.location}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                  booking.status === "Confirmed"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-orange-50 text-orange-600"
                }`}
              >
                {booking.status}
              </span>

              <button
                type="button"
                onClick={() => navigate(`/vendor/bookings/${booking.id}`)}
                className="rounded-lg border border-blue-100 px-3 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function PopularCategories() {
  const navigate = useNavigate();

  return (
    <motion.section
      variants={fadeUp}
      className="rounded-2xl border border-blue-50 bg-white p-4 shadow-sm sm:p-5"
    >
      <SectionHeading title="Popular Categories" link="/categories" />

      <div className="grid grid-cols-2 gap-x-2 gap-y-5 sm:grid-cols-4">
        {categories.map((category, index) => {
          const Icon = category.icon;

          return (
            <motion.button
              type="button"
              key={category.name}
              onClick={() => navigate("/categories")}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.04 }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className={`flex h-12 w-12 items-center justify-center rounded-full ${category.color}`}>
                <Icon size={23} />
              </span>

              <span className="text-xs font-medium text-[#092a61]">
                {category.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
}

function RecentActivity() {
  return (
    <motion.section
      variants={fadeUp}
      className="rounded-2xl border border-blue-50 bg-white p-4 shadow-sm sm:p-5"
    >
      <SectionHeading title="Recent Activity" link="/vendor/notifications" />

      <div className="divide-y divide-slate-100">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div key={activity.title} className="flex gap-3 py-4 first:pt-0 last:pb-0">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${activity.color}`}>
                <Icon size={20} />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[#092a61]">
                    {activity.title}
                  </h3>

                  <span className="shrink-0 text-[10px] text-slate-400">
                    {activity.time}
                  </span>
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

function RecentVendors() {
  const navigate = useNavigate();

  return (
    <motion.section
      variants={fadeUp}
      className="rounded-2xl border border-blue-50 bg-white p-4 shadow-sm sm:p-5"
    >
      <SectionHeading title="Recent Vendors" link="/vendor/customers" />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {vendors.map((vendor) => (
          <div key={vendor.name} className="flex min-w-0 gap-3">
            <img
              src={vendor.image}
              alt={vendor.name}
              loading="lazy"
              className="h-16 w-16 shrink-0 rounded-xl object-cover"
            />

            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold text-[#092a61]">
                {vendor.name}
              </h3>

              <p className="mt-1 truncate text-xs text-slate-500">
                {vendor.service}
              </p>

              <div className="mt-2 flex items-center gap-1 text-xs text-slate-600">
                <Star size={13} fill="#f59e0b" className="text-amber-500" />
                {vendor.rating} ({vendor.reviews})
              </div>

              <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                <MapPin size={12} />
                {vendor.location}
              </p>

              <button
                type="button"
                onClick={() => navigate("/vendor/messages")}
                className="mt-2 flex items-center gap-1 rounded-lg border border-blue-100 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50"
              >
                <MessageSquare size={12} />
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function ActivityOverview() {
  const bars = [25, 45, 42, 55, 47, 62, 85];

  return (
    <motion.section
      variants={fadeUp}
      className="rounded-2xl border border-blue-50 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-bold text-[#092a61]">
          Your Activity Overview
        </h2>

        <select
          className="rounded-lg border border-blue-100 bg-white px-3 py-2 text-xs text-slate-600 outline-none focus:border-blue-400"
          defaultValue="7"
          aria-label="Activity period"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 3 months</option>
        </select>
      </div>

      <div className="grid gap-7 lg:grid-cols-2">
        {/* Booking chart */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-[#092a61]">
            Bookings
          </h3>

          <div className="flex h-44 items-end justify-between gap-2 border-b border-l border-slate-100 px-2 pb-2">
            {bars.map((height, index) => (
              <div
                key={index}
                className="flex h-full flex-1 flex-col justify-end"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.7, delay: index * 0.07 }}
                  className="w-full rounded-t-md bg-gradient-to-t from-orange-500 to-orange-300"
                />
              </div>
            ))}
          </div>

          <div className="mt-2 flex justify-between text-[10px] text-slate-400">
            {["May 22", "23", "24", "25", "26", "27", "28"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
        </div>

        {/* Category chart */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-[#092a61]">
            Service Categories
          </h3>

          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <div
              className="relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#f97316 0% 35%, #38a7fa 35% 60%, #f44e78 60% 80%, #8953f6 80% 92%, #b9d7ff 92% 100%)",
              }}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                <strong className="text-2xl text-[#092a61]">84</strong>
                <span className="text-[10px] text-slate-400">
                  Total Bookings
                </span>
              </div>
            </div>

            <div className="w-full space-y-3">
              {[
                ["Fashion Design", "35%", "bg-orange-500"],
                ["Catering", "25%", "bg-blue-400"],
                ["Photography", "20%", "bg-pink-500"],
                ["Decorations", "12%", "bg-purple-500"],
                ["Others", "8%", "bg-blue-200"],
              ].map(([name, value, color]) => (
                <div key={name} className="flex items-center gap-2 text-xs">
                  <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                  <span className="flex-1 text-slate-500">{name}</span>
                  <strong className="text-emerald-500">{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function SupportBanner() {
  const navigate = useNavigate();

  return (
    <motion.section
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5 shadow-sm"
    >
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
        <Crown size={30} />
      </span>

      <div>
        <h3 className="font-bold text-[#092a61]">
          Support Local Craftsmen
        </h3>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          Every booking helps build a stronger community.
        </p>

        <button
          type="button"
          onClick={() => navigate("/categories")}
          className="mt-3 flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-600"
        >
          Book Now <ArrowRight size={14} />
        </button>
      </div>
    </motion.section>
  );
}

export default function VendorDashboard() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-[1600px] space-y-5"
    >
      {/* Welcome banner */}
      <motion.section
        variants={fadeUp}
        className="relative flex min-h-[125px] items-center overflow-hidden rounded-2xl bg-gradient-to-r from-orange-50 via-orange-50 to-white px-5 py-6 sm:px-8"
      >
        <div className="relative z-10 flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
            <Sun size={24} />
          </span>

          <div>
            <h1 className="text-xl font-bold text-[#092a61] sm:text-2xl">
              Good morning, Adaeze <span>☀️</span>
            </h1>

            <p className="mt-2 text-xs text-blue-600 sm:text-sm">
              Here's what's happening with your business today.
            </p>
          </div>
        </div>

        <div className="absolute inset-y-0 right-0 hidden w-[35%] bg-cover bg-center opacity-90 md:block"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1590736969955-71cc94901144?w=900&q=85')",
            maskImage:
              "linear-gradient(to right, transparent, black 35%)",
          }}
        />
      </motion.section>

      {/* Statistics */}
      <motion.section
        variants={stagger}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </motion.section>

      {/* Main dashboard columns */}
      <div className="grid min-w-0 grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,2fr)_minmax(300px,0.9fr)]">
        <div className="min-w-0 space-y-5">
          <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.9fr)]">
            <RecentBookings />
            <PopularCategories />
          </div>

          <RecentVendors />

          <ActivityOverview />
        </div>

        <div className="min-w-0 space-y-5">
          <RecentActivity />
          <SupportBanner />
        </div>
      </div>
    </motion.div>
  );
}
