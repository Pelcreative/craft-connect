
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  CalendarCheck,
  Clock3,
  CheckCircle2,
  Wallet,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Camera,
  Palette,
  Utensils,
  Sparkles,
  Plus,
  TrendingUp,
  X,
} from "lucide-react";

// ==========================================
// SAMPLE BOOKING DATA
// ==========================================

const initialBookings = [
  { id: 1, customer: "Chioma Eze", phone: "+234 801 234 5678", service: "Portrait Photography", category: "Photography", date: "May 28, 2025", time: "10:00 AM", status: "Confirmed", amount: 80000, avatar: "https://i.pravatar.cc/100?img=47" },
  { id: 2, customer: "Tolu Adeyemi", phone: "+234 803 456 7890", service: "Event Catering", category: "Catering", date: "May 28, 2025", time: "2:00 PM", status: "Pending", amount: 45000, avatar: "https://i.pravatar.cc/100?img=12" },
  { id: 3, customer: "Amaka Johnson", phone: "+234 806 111 2233", service: "Bridal Makeup", category: "Makeup", date: "May 27, 2025", time: "11:00 AM", status: "Completed", amount: 70000, avatar: "https://i.pravatar.cc/100?img=44" },
  { id: 4, customer: "Emeka Nwosu", phone: "+234 807 222 3344", service: "Event Photography", category: "Photography", date: "May 27, 2025", time: "4:00 PM", status: "Completed", amount: 120000, avatar: "https://i.pravatar.cc/100?img=13" },
  { id: 5, customer: "Zainab Musa", phone: "+234 808 333 4455", service: "Custom Outfit", category: "Fashion Design", date: "May 26, 2025", time: "1:00 PM", status: "Confirmed", amount: 90000, avatar: "https://i.pravatar.cc/100?img=49" },
  { id: 6, customer: "Daniel Okafor", phone: "+234 809 444 5566", service: "Event Decoration", category: "Decorations", date: "May 26, 2025", time: "3:30 PM", status: "Cancelled", amount: 60000, avatar: "https://i.pravatar.cc/100?img=11" },
  { id: 7, customer: "Blessing Uche", phone: "+234 810 555 6677", service: "Food & Drinks", category: "Catering", date: "May 25, 2025", time: "12:00 PM", status: "Completed", amount: 50000, avatar: "https://i.pravatar.cc/100?img=45" },
  { id: 8, customer: "Ibrahim Bello", phone: "+234 812 444 3322", service: "Birthday Photography", category: "Photography", date: "May 24, 2025", time: "9:00 AM", status: "Confirmed", amount: 65000, avatar: "https://i.pravatar.cc/100?img=60" },
  { id: 9, customer: "Ngozi Obi", phone: "+234 814 555 2211", service: "Bridal Makeup", category: "Makeup", date: "May 23, 2025", time: "1:30 PM", status: "Pending", amount: 55000, avatar: "https://i.pravatar.cc/100?img=32" },
  { id: 10, customer: "Femi Williams", phone: "+234 816 333 1122", service: "Custom Suit", category: "Fashion Design", date: "May 22, 2025", time: "11:00 AM", status: "Completed", amount: 150000, avatar: "https://i.pravatar.cc/100?img=14" },
];

const tabs = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

const money = (amount) =>
  `₦${Number(amount).toLocaleString("en-NG")}`;

const statusStyles = {
  Confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  Pending: "bg-orange-50 text-orange-700 ring-orange-100",
  Completed: "bg-sky-50 text-sky-700 ring-sky-100",
  Cancelled: "bg-rose-50 text-rose-700 ring-rose-100",
};

const getServiceIcon = (category) => {
  if (category === "Photography") return Camera;
  if (category === "Catering") return Utensils;
  if (category === "Fashion Design" || category === "Decorations")
    return Sparkles;
  return Palette;
};

// ==========================================
// REUSABLE COMPONENTS
// ==========================================

function StatCard({ title, value, change, icon: Icon, tone, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -5 }}
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div className={`grid h-11 w-11 place-items-center rounded-2xl ${tone}`}>
          <Icon size={21} />
        </div>

        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
          <TrendingUp size={14} />
          {change}
        </span>
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>

      <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        Compared with last week
      </p>
    </motion.div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

// ==========================================
// MAIN VENDOR BOOKING COMPONENT
// ==========================================

export default function VendorBooking() {
  const [bookings, setBookings] = useState(initialBookings);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [menuId, setMenuId] = useState(null);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const [newBooking, setNewBooking] = useState({
    customer: "",
    phone: "",
    service: "",
    category: "Photography",
    date: "",
    time: "",
    amount: "",
  });

  // ========================================
  // BOOKING COUNTS
  // ========================================

  const counts = useMemo(
    () => ({
      All: bookings.length,
      Pending: bookings.filter((b) => b.status === "Pending").length,
      Confirmed: bookings.filter((b) => b.status === "Confirmed").length,
      Completed: bookings.filter((b) => b.status === "Completed").length,
      Cancelled: bookings.filter((b) => b.status === "Cancelled").length,
    }),
    [bookings]
  );

  const totalRevenue = bookings
    .filter((b) => b.status !== "Cancelled")
    .reduce((sum, b) => sum + b.amount, 0);

  // ========================================
  // SEARCH, FILTER AND SORT
  // ========================================

  const filteredBookings = useMemo(() => {
    let result = bookings.filter(
      (booking) =>
        activeTab === "All" || booking.status === activeTab
    );

    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((booking) =>
        [
          booking.customer,
          booking.phone,
          booking.service,
          booking.category,
        ].some((value) => value.toLowerCase().includes(query))
      );
    }

    if (sortBy === "Highest amount") {
      result = [...result].sort((a, b) => b.amount - a.amount);
    }

    if (sortBy === "Lowest amount") {
      result = [...result].sort((a, b) => a.amount - b.amount);
    }

    if (sortBy === "Customer A–Z") {
      result = [...result].sort((a, b) =>
        a.customer.localeCompare(b.customer)
      );
    }

    return result;
  }, [bookings, activeTab, search, sortBy]);

  // ========================================
  // PAGINATION
  // ========================================

  const pageSize = 7;
  const pageCount = Math.max(
    1,
    Math.ceil(filteredBookings.length / pageSize)
  );

  const visibleBookings = filteredBookings.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // ========================================
  // UPDATE BOOKING STATUS
  // ========================================

  const updateStatus = (id, status) => {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );

    setSelectedBooking((current) =>
      current?.id === id ? { ...current, status } : current
    );

    setMenuId(null);
  };

  // ========================================
  // ADD NEW BOOKING
  // ========================================

  const addBooking = (event) => {
    event.preventDefault();

    const booking = {
      ...newBooking,
      id: Date.now(),
      date: new Date(newBooking.date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      amount: Number(newBooking.amount),
      status: "Pending",
      avatar: `https://i.pravatar.cc/100?u=${encodeURIComponent(
        newBooking.customer
      )}`,
    };

    setBookings((current) => [booking, ...current]);

    setNewBooking({
      customer: "",
      phone: "",
      service: "",
      category: "Photography",
      date: "",
      time: "",
      amount: "",
    });

    setShowAdd(false);
    setActiveTab("All");
    setSearch("");
    setPage(1);
  };

  // ========================================
  // MAIN RENDER
  // ========================================

  return (
    <div className="min-h-screen w-full bg-[#f5f9fd] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">

        {/* PAGE HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-100 text-orange-600">
              <CalendarDays size={27} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Bookings
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your customer bookings and keep track of your schedule.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700"
          >
            <Plus size={18} />
            Add Booking
          </button>
        </motion.div>

        {/* STATISTICS CARDS */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Bookings"
            value={counts.All}
            change="12%"
            icon={CalendarCheck}
            tone="bg-orange-50 text-orange-600"
            delay={0.05}
          />

          <StatCard
            title="Pending"
            value={counts.Pending}
            change="8%"
            icon={Clock3}
            tone="bg-violet-50 text-violet-600"
            delay={0.1}
          />

          <StatCard
            title="Completed"
            value={counts.Completed}
            change="21%"
            icon={CheckCircle2}
            tone="bg-emerald-50 text-emerald-600"
            delay={0.15}
          />

          <StatCard
            title="Total Revenue"
            value={money(totalRevenue)}
            change="15%"
            icon={Wallet}
            tone="bg-sky-50 text-sky-600"
            delay={0.2}
          />
        </div>

        {/* BOOKINGS SECTION */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
        >

          {/* TABLE HEADER */}

          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
              <div>
                <h2 className="text-lg font-bold">All Bookings</h2>

                <p className="mt-1 text-sm text-slate-500">
                  View and manage all your customer bookings.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">

                {/* SEARCH */}

                <div className="relative sm:w-72">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search customer, service..."
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                  />
                </div>

                {/* SORT DROPDOWN */}

                <div className="relative">
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium transition hover:bg-slate-50 sm:w-auto"
                  >
                    <SlidersHorizontal size={16} />
                    Filter
                    <ChevronDown size={15} />
                  </button>

                  <AnimatePresence>
                    {filterOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute right-0 z-30 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
                      >
                        {[
                          "Newest",
                          "Highest amount",
                          "Lowest amount",
                          "Customer A–Z",
                        ].map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setSortBy(option);
                              setFilterOpen(false);
                            }}
                            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-slate-50 ${
                              sortBy === option
                                ? "font-semibold text-orange-600"
                                : "text-slate-600"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* STATUS TABS */}

            <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setPage(1);
                  }}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    activeTab === tab
                      ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:text-orange-600"
                  }`}
                >
                  {tab} ({counts[tab]})
                </button>
              ))}
            </div>
          </div>

          {/* DESKTOP BOOKINGS TABLE */}

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  {[
                    "Customer",
                    "Service",
                    "Date & Time",
                    "Status",
                    "Amount",
                    "Action",
                  ].map((heading) => (
                    <th key={heading} className="px-5 py-4">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                <AnimatePresence mode="popLayout">
                  {visibleBookings.map((booking, index) => {
                    const Icon = getServiceIcon(booking.category);

                    return (
                      <motion.tr
                        key={booking.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ delay: index * 0.035 }}
                        className="group transition-colors hover:bg-orange-50/30"
                      >
                        {/* CUSTOMER */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={booking.avatar}
                              alt={booking.customer}
                              className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                            />

                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {booking.customer}
                              </p>

                              <p className="mt-0.5 text-xs text-slate-400">
                                {booking.phone}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* SERVICE */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <span className="grid h-8 w-8 place-items-center rounded-xl bg-sky-50 text-sky-600">
                              <Icon size={15} />
                            </span>

                            <div>
                              <p className="text-sm font-medium text-slate-700">
                                {booking.category}
                              </p>

                              <p className="mt-0.5 text-xs text-slate-400">
                                {booking.service}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* DATE */}

                        <td className="px-5 py-4">
                          <p className="text-sm text-slate-600">
                            {booking.date}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {booking.time}
                          </p>
                        </td>

                        {/* STATUS */}

                        <td className="px-5 py-4">
                          <StatusBadge status={booking.status} />
                        </td>

                        {/* AMOUNT */}

                        <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                          {money(booking.amount)}
                        </td>

                        {/* ACTIONS */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                            >
                              View
                            </button>

                            <div className="relative">
                              <button
                                onClick={() =>
                                  setMenuId(
                                    menuId === booking.id ? null : booking.id
                                  )
                                }
                                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                              >
                                <MoreVertical size={17} />
                              </button>

                              <AnimatePresence>
                                {menuId === booking.id && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.96, y: 5 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    className="absolute right-0 z-30 mt-1 w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
                                  >
                                    {[
                                      "Confirmed",
                                      "Completed",
                                      "Cancelled",
                                    ].map((status) => (
                                      <button
                                        key={status}
                                        onClick={() =>
                                          updateStatus(booking.id, status)
                                        }
                                        className="block w-full rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50"
                                      >
                                        Mark {status}
                                      </button>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* MOBILE BOOKING CARDS */}

          <div className="grid gap-3 p-4 md:hidden">
            <AnimatePresence mode="popLayout">
              {visibleBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border border-slate-100 p-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={booking.avatar}
                      alt={booking.customer}
                      className="h-11 w-11 rounded-full object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {booking.customer}
                      </p>

                      <p className="text-xs text-slate-400">
                        {booking.phone}
                      </p>
                    </div>

                    <StatusBadge status={booking.status} />
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <div>
                      <p className="text-sm font-medium">
                        {booking.service}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {booking.date} · {booking.time}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold">
                        {money(booking.amount)}
                      </p>

                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="mt-1 text-xs font-semibold text-orange-600"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* EMPTY STATE */}

          {visibleBookings.length === 0 && (
            <div className="px-6 py-16 text-center">
              <Search
                className="mx-auto text-slate-300"
                size={30}
              />

              <p className="mt-3 font-semibold text-slate-700">
                No bookings found
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Try another search or status filter.
              </p>
            </div>
          )}

          {/* PAGINATION */}

          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row">
            <p className="text-xs text-slate-400">
              Showing{" "}
              {filteredBookings.length
                ? (page - 1) * pageSize + 1
                : 0}
              –{Math.min(page * pageSize, filteredBookings.length)} of{" "}
              {filteredBookings.length} bookings
            </p>

            <div className="flex items-center gap-1.5">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from(
                { length: pageCount },
                (_, index) => index + 1
              ).map((number) => (
                <button
                  key={number}
                  onClick={() => setPage(number)}
                  className={`h-9 min-w-9 rounded-lg px-3 text-xs font-semibold transition ${
                    page === number
                      ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                      : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                disabled={page === pageCount}
                onClick={() => setPage((p) => p + 1)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.section>

        {/* =====================================
            BOOKING DETAILS MODAL
        ===================================== */}

        <AnimatePresence>
          {selectedBooking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBooking(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                      Booking Details
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      {selectedBooking.customer}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <img
                    src={selectedBooking.avatar}
                    alt={selectedBooking.customer}
                    className="h-14 w-14 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold">
                      {selectedBooking.phone}
                    </p>

                    <p className="text-sm text-slate-500">
                      {selectedBooking.category}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4 rounded-xl bg-slate-50 p-4">
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-500">Service</span>
                    <span className="text-right font-medium">
                      {selectedBooking.service}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-500">Date</span>
                    <span className="font-medium">
                      {selectedBooking.date}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-500">Time</span>
                    <span className="font-medium">
                      {selectedBooking.time}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-500">Amount</span>
                    <span className="font-bold">
                      {money(selectedBooking.amount)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-500">Status</span>
                    <StatusBadge status={selectedBooking.status} />
                  </div>
                </div>

                <button
                  onClick={() => setSelectedBooking(null)}
                  className="mt-5 w-full rounded-xl bg-orange-600 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
                >
                  Close Details
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =====================================
            ADD BOOKING MODAL
        ===================================== */}

        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdd(false)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
            >
              <motion.form
                onSubmit={addBooking}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12 }}
                className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                      New Booking
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      Add a Booking
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAdd(false)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ["Customer Name", "customer", "text"],
                    ["Phone Number", "phone", "tel"],
                    ["Service Name", "service", "text"],
                    ["Amount (₦)", "amount", "number"],
                    ["Booking Date", "date", "date"],
                    ["Booking Time", "time", "time"],
                  ].map(([label, key, type]) => (
                    <label key={key} className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                        {label}
                      </span>

                      <input
                        required
                        type={type}
                        min={type === "number" ? "0" : undefined}
                        value={newBooking[key]}
                        onChange={(e) =>
                          setNewBooking((current) => ({
                            ...current,
                            [key]: e.target.value,
                          }))
                        }
                        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                      />
                    </label>
                  ))}

                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Category
                    </span>

                    <select
                      value={newBooking.category}
                      onChange={(e) =>
                        setNewBooking((current) => ({
                          ...current,
                          category: e.target.value,
                        }))
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400"
                    >
                      <option>Photography</option>
                      <option>Catering</option>
                      <option>Makeup</option>
                      <option>Fashion Design</option>
                      <option>Decorations</option>
                    </select>
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-xl bg-orange-600 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700"
                >
                  Create Booking
                </button>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
