
import  { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Users,
  UserPlus,
  Star,
  TrendingUp,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Eye,
  Pencil,
  Trash2,
  X,
  Filter,
  Download,
  ArrowUpRight,
  BarChart3,
} from "lucide-react";

// ============================================
// SAMPLE DATA
// ============================================

const initialCustomers = [
  {
    id: 1,
    name: "Chioma Eze",
    email: "chiomaeze@gmail.com",
    phone: "+234 801 234 5678",
    location: "Lagos, Nigeria",
    bookings: 12,
    lastBooking: "May 28, 2025",
    lastSeen: "2 days ago",
    status: "Active",
    segment: "Fashion Lovers",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    joined: "January 12, 2025",
  },
  {
    id: 2,
    name: "Tolu Adeyemi",
    email: "toluade@gmail.com",
    phone: "+234 803 456 7890",
    location: "Abuja, Nigeria",
    bookings: 8,
    lastBooking: "May 25, 2025",
    lastSeen: "5 days ago",
    status: "Active",
    segment: "Food & Catering",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    joined: "February 4, 2025",
  },
  {
    id: 3,
    name: "Amaka Johnson",
    email: "amaka.johnson@gmail.com",
    phone: "+234 806 111 2233",
    location: "Port Harcourt, Nigeria",
    bookings: 15,
    lastBooking: "May 27, 2025",
    lastSeen: "3 days ago",
    status: "Active",
    segment: "Photographers",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150",
    joined: "December 20, 2024",
  },
  {
    id: 4,
    name: "Emeka Nwosu",
    email: "emeka.nwosu@gmail.com",
    phone: "+234 807 222 3344",
    location: "Enugu, Nigeria",
    bookings: 6,
    lastBooking: "May 21, 2025",
    lastSeen: "9 days ago",
    status: "Active",
    segment: "Food & Catering",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
    joined: "March 8, 2025",
  },
  {
    id: 5,
    name: "Zainab Musa",
    email: "zainab.musa@gmail.com",
    phone: "+234 808 333 4455",
    location: "Kano, Nigeria",
    bookings: 11,
    lastBooking: "May 26, 2025",
    lastSeen: "4 days ago",
    status: "Active",
    segment: "Fashion Lovers",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150",
    joined: "January 25, 2025",
  },
  {
    id: 6,
    name: "Daniel Okafor",
    email: "daniel.okafor@gmail.com",
    phone: "+234 809 444 5566",
    location: "Lagos, Nigeria",
    bookings: 4,
    lastBooking: "May 19, 2025",
    lastSeen: "11 days ago",
    status: "Inactive",
    segment: "Event Planners",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    joined: "April 2, 2025",
  },
  {
    id: 7,
    name: "Blessing Uche",
    email: "blessing.uche@gmail.com",
    phone: "+234 810 555 6677",
    location: "Abuja, Nigeria",
    bookings: 9,
    lastBooking: "May 24, 2025",
    lastSeen: "6 days ago",
    status: "Active",
    segment: "Photographers",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    joined: "February 18, 2025",
  },
  {
    id: 8,
    name: "Ifeanyi Chukwudi",
    email: "ifeanyi.chukwudi@gmail.com",
    phone: "+234 811 666 7788",
    location: "Owerri, Nigeria",
    bookings: 7,
    lastBooking: "May 22, 2025",
    lastSeen: "8 days ago",
    status: "Active",
    segment: "Others",
    avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=150",
    joined: "March 12, 2025",
  },
  {
    id: 9,
    name: "Chidinma Nwosu",
    email: "chidinma@gmail.com",
    phone: "+234 812 333 4455",
    location: "Lagos, Nigeria",
    bookings: 3,
    lastBooking: "May 18, 2025",
    lastSeen: "2 days ago",
    status: "New",
    segment: "Fashion Lovers",
    avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150",
    joined: "May 10, 2025",
  },
  {
    id: 10,
    name: "Victor Eze",
    email: "victor.eze@gmail.com",
    phone: "+234 813 222 3344",
    location: "Abuja, Nigeria",
    bookings: 2,
    lastBooking: "May 16, 2025",
    lastSeen: "4 hours ago",
    status: "New",
    segment: "Food & Catering",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    joined: "May 15, 2025",
  },
  {
    id: 11,
    name: "Ngozi Okafor",
    email: "ngozi@gmail.com",
    phone: "+234 814 111 2233",
    location: "Enugu, Nigeria",
    bookings: 5,
    lastBooking: "May 15, 2025",
    lastSeen: "6 hours ago",
    status: "Active",
    segment: "Fashion Lovers",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    joined: "April 15, 2025",
  },
  {
    id: 12,
    name: "Tunde Adebayo",
    email: "tunde@gmail.com",
    phone: "+234 815 444 5566",
    location: "Lagos, Nigeria",
    bookings: 1,
    lastBooking: "May 12, 2025",
    lastSeen: "8 hours ago",
    status: "Inactive",
    segment: "Event Planners",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
    joined: "May 1, 2025",
  },
];

// ============================================
// ANIMATION SETTINGS
// ============================================

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// ============================================
// STAT CARD
// ============================================

function StatCard({ icon: Icon, title, value, growth, color, delay }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.45, delay }}
      whileHover={{
        y: -5,
        boxShadow: "0 12px 30px rgba(20,80,150,0.09)",
      }}
      className="bg-white border border-blue-100 rounded-xl p-4 sm:p-5 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${color}`}>
          <Icon size={23} />
        </div>

        <div className="min-w-0">
          <p className="text-sm text-slate-500">{title}</p>
          <h2 className="text-2xl font-bold text-blue-950 mt-1">
            {value}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3 text-xs">
        <span className="flex items-center text-emerald-500 font-semibold">
          <TrendingUp size={14} className="mr-1" />
          {growth}%
        </span>
        <span className="text-blue-400">from last month</span>
      </div>
    </motion.div>
  );
}

// ============================================
// STATUS BADGE
// ============================================

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-100 text-emerald-600",
    New: "bg-blue-100 text-blue-600",
    Inactive: "bg-orange-100 text-orange-600",
    Returning: "bg-purple-100 text-purple-600",
  };

  return (
    <span
      className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
        styles[status] || styles.Active
      }`}
    >
      {status}
    </span>
  );
}

// ============================================
// CUSTOMER GROWTH CHART
// ============================================

function CustomerGrowthChart() {
  const points = [
    [0, 145],
    [40, 120],
    [80, 125],
    [120, 115],
    [160, 85],
    [200, 90],
    [240, 55],
    [280, 55],
    [320, 20],
  ];

  const path = points
    .map((point, index) =>
      `${index === 0 ? "M" : "L"} ${point[0]} ${point[1]}`
    )
    .join(" ");

  const area = `${path} L 320 165 L 0 165 Z`;

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-blue-500 mb-3">
        {["400", "300", "200", "100", "0"].map((value) => (
          <span key={value}>{value}</span>
        ))}
      </div>

      <div className="relative h-36 border-b border-l border-blue-100">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="absolute w-full border-t border-blue-50"
            style={{ top: `${item * 33.3}%` }}
          />
        ))}

        <svg
          viewBox="0 0 320 165"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient
              id="customerGrowthGradient"
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#ff650c" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ff650c" stopOpacity="0" />
            </linearGradient>
          </defs>

          <motion.path
            d={area}
            fill="url(#customerGrowthGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          <motion.path
            d={path}
            fill="none"
            stroke="#ff650c"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />

          {points.map(([x, y], index) => (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill="#ff650c"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + index * 0.12 }}
            />
          ))}
        </svg>
      </div>

      <div className="flex justify-between mt-3 text-xs text-blue-500">
        {["May 1", "May 8", "May 15", "May 22", "May 28"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
    </div>
  );
}

// ============================================
// CUSTOMER SEGMENT CHART
// ============================================

function SegmentChart() {
  const segments = [
    { name: "Fashion Lovers", value: 238, color: "#2595ff" },
    { name: "Food & Catering", value: 142, color: "#ff8500" },
    { name: "Photographers", value: 118, color: "#ff5555" },
    { name: "Event Planners", value: 96, color: "#893cff" },
    { name: "Others", value: 86, color: "#a05cff" },
  ];

  const total = segments.reduce((sum, item) => sum + item.value, 0);
  let offset = 0;

  const gradient = segments.map((item) => {
    const start = offset;
    offset += (item.value / total) * 100;

    return `${item.color} ${start}% ${offset}%`;
  });

  return (
    <div className="flex flex-wrap items-center justify-center gap-5 py-3">
      <div
        className="w-32 h-32 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: `conic-gradient(${gradient.join(", ")})`,
        }}
      >
        <div className="w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
          <span className="text-xl font-bold text-blue-950">680</span>
          <span className="text-[10px] text-blue-400">Total</span>
        </div>
      </div>

      <div className="flex-1 min-w-[150px] space-y-3">
        {segments.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between gap-2 text-xs"
          >
            <div className="flex items-center gap-2 text-blue-600">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </div>

            <span className="font-medium text-blue-900 whitespace-nowrap">
              {item.value} ({Math.round((item.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function VendorCustomer() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [menuCustomer, setMenuCustomer] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [locationFilter, setLocationFilter] = useState("All");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    status: "Active",
  });

  const tabs = ["All", "Active", "New", "Returning", "Inactive"];
  const pageSize = 8;

  // ============================================
  // FILTER CUSTOMERS
  // ============================================

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const query = search.toLowerCase().trim();

      const searchMatch =
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query) ||
        customer.location.toLowerCase().includes(query);

      const tabMatch =
        activeTab === "All" || customer.status === activeTab;

      const locationMatch =
        locationFilter === "All" ||
        customer.location === locationFilter;

      return searchMatch && tabMatch && locationMatch;
    });
  }, [customers, search, activeTab, locationFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / pageSize)
  );

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const counts = useMemo(() => {
    return {
      All: customers.length,
      Active: customers.filter((c) => c.status === "Active").length,
      New: customers.filter((c) => c.status === "New").length,
      Returning: customers.filter((c) => c.status === "Returning").length,
      Inactive: customers.filter((c) => c.status === "Inactive").length,
    };
  }, [customers]);

  const recentCustomers = customers.slice(0, 4);

  // Keep the current page valid after deleting or filtering customers.
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // ============================================
  // MODAL HANDLERS
  // ============================================

  const openAddModal = () => {
    setEditingCustomer(null);

    setForm({
      name: "",
      email: "",
      phone: "",
      location: "",
      status: "Active",
    });

    setShowModal(true);
  };

  const openEditModal = (customer) => {
    setEditingCustomer(customer);

    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      location: customer.location,
      status: customer.status,
    });

    setShowDetails(null);
    setMenuCustomer(null);
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      return;
    }

    if (editingCustomer) {
      setCustomers((previous) =>
        previous.map((customer) =>
          customer.id === editingCustomer.id
            ? { ...customer, ...form }
            : customer
        )
      );
    } else {
      const newCustomer = {
        ...form,
        id: Date.now(),
        bookings: 0,
        lastBooking: "No bookings yet",
        lastSeen: "Just now",
        segment: "Others",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          form.name
        )}&background=fff0e7&color=ff5900`,
        joined: new Date().toLocaleDateString(),
      };

      setCustomers((previous) => [newCustomer, ...previous]);
      setCurrentPage(1);
      setActiveTab("All");
      setSearch("");
      setLocationFilter("All");
    }

    setShowModal(false);
    setEditingCustomer(null);
  };

  // ============================================
  // DELETE CUSTOMER
  // ============================================

  const deleteCustomer = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmed) return;

    setCustomers((previous) =>
      previous.filter((customer) => customer.id !== id)
    );

    setSelectedCustomers((previous) =>
      previous.filter((item) => item !== id)
    );

    setMenuCustomer(null);
  };

  const deleteSelectedCustomers = () => {
    const confirmed = window.confirm(
      `Delete ${selectedCustomers.length} selected customers?`
    );

    if (!confirmed) return;

    setCustomers((previous) =>
      previous.filter(
        (customer) => !selectedCustomers.includes(customer.id)
      )
    );

    setSelectedCustomers([]);
  };

  // ============================================
  // CUSTOMER SELECTION
  // ============================================

  const toggleCustomer = (id) => {
    setSelectedCustomers((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const toggleAll = () => {
    const pageIds = paginatedCustomers.map((customer) => customer.id);

    const allSelected =
      pageIds.length > 0 &&
      pageIds.every((id) => selectedCustomers.includes(id));

    if (allSelected) {
      setSelectedCustomers((previous) =>
        previous.filter((id) => !pageIds.includes(id))
      );
    } else {
      setSelectedCustomers((previous) => [
        ...new Set([...previous, ...pageIds]),
      ]);
    }
  };

  // ============================================
  // CSV EXPORT
  // ============================================

  const exportCustomers = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Location",
      "Bookings",
      "Status",
    ];

    const rows = filteredCustomers.map((customer) => [
      customer.name,
      customer.email,
      customer.phone,
      customer.location,
      customer.bookings,
      customer.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "craftconnect-customers.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <div className="w-full min-h-screen bg-[#f3faff] text-blue-950 p-3 sm:p-5 lg:p-6 overflow-x-hidden">

      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 min-w-14 min-h-14 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
            <Users size={27} />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Customers
            </h1>

            <p className="text-sm text-blue-500 mt-1">
              Manage your customers and build lasting relationships.
            </p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={exportCustomers}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-blue-100 rounded-xl text-sm text-blue-700 hover:bg-blue-50 transition"
          >
            <Download size={17} />
            Export
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl shadow-lg shadow-orange-200 text-sm font-semibold"
          >
            <Plus size={18} />
            Add Customer
          </motion.button>
        </div>
      </motion.div>

      {/* STATISTICS */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5"
      >
        <StatCard
          icon={Users}
          title="Total Customers"
          value={customers.length}
          growth={12}
          color="bg-orange-100 text-orange-600"
          delay={0}
        />

        <StatCard
          icon={UserPlus}
          title="New Customers"
          value={counts.New}
          growth={18}
          color="bg-purple-100 text-purple-600"
          delay={0.08}
        />

        <StatCard
          icon={Star}
          title="Active Customers"
          value={counts.Active}
          growth={15}
          color="bg-emerald-100 text-emerald-500"
          delay={0.16}
        />

        <StatCard
          icon={BarChart3}
          title="Returning Customers"
          value={counts.Returning}
          growth={10}
          color="bg-sky-100 text-sky-500"
          delay={0.24}
        />
      </motion.div>

      {/* MAIN CONTENT */}

      <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1fr)_350px] gap-4 items-start">

        {/* CUSTOMER TABLE */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-blue-100 rounded-xl shadow-sm min-w-0 overflow-visible"
        >
          {/* TABLE HEADER */}

          <div className="p-4 sm:p-5 border-b border-blue-50">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="font-bold text-lg">All Customers</h2>

                <p className="text-xs text-blue-400 mt-1">
                  View, organize and manage your customers.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search customers by name, email, or phone..."
                    className="w-full sm:w-72 lg:w-80 pl-10 pr-4 py-2.5 rounded-xl border border-blue-100 outline-none text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowFilter((previous) => !previous)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-100 text-sm hover:bg-blue-50 w-full justify-center"
                  >
                    <Filter size={15} />
                    Filter
                    <ChevronDown size={14} />
                  </button>

                  <AnimatePresence>
                    {showFilter && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute right-0 top-12 z-30 bg-white border border-blue-100 rounded-xl shadow-xl p-3 w-52"
                      >
                        <p className="text-xs font-semibold mb-2 text-blue-900">
                          Filter by location
                        </p>

                        <select
                          value={locationFilter}
                          onChange={(event) => {
                            setLocationFilter(event.target.value);
                            setCurrentPage(1);
                          }}
                          className="w-full p-2 border border-blue-100 rounded-lg text-sm outline-none"
                        >
                          <option value="All">All Locations</option>

                          {[
                            ...new Set(
                              customers.map((customer) => customer.location)
                            ),
                          ].map((location) => (
                            <option key={location} value={location}>
                              {location}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => {
                            setLocationFilter("All");
                            setShowFilter(false);
                            setCurrentPage(1);
                          }}
                          className="text-orange-600 text-xs mt-3 font-semibold"
                        >
                          Clear filters
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* STATUS TABS */}

            <div className="flex gap-2 overflow-x-auto pb-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-md shadow-orange-100"
                      : "bg-white border border-blue-100 text-blue-600 hover:bg-orange-50"
                  }`}
                >
                  {tab} ({counts[tab]})
                </button>
              ))}
            </div>
          </div>

          {/* SELECTED ACTIONS */}

          <AnimatePresence>
            {selectedCustomers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-orange-50 px-5 py-3 flex items-center justify-between gap-3"
              >
                <span className="text-sm text-orange-700 font-medium">
                  {selectedCustomers.length} customers selected
                </span>

                <button
                  onClick={deleteSelectedCustomers}
                  className="text-red-500 text-sm flex items-center gap-2"
                >
                  <Trash2 size={15} />
                  Delete selected
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TABLE */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-[#f7fbff] text-xs text-blue-950">
                <tr>
                  <th className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={
                        paginatedCustomers.length > 0 &&
                        paginatedCustomers.every((customer) =>
                          selectedCustomers.includes(customer.id)
                        )
                      }
                      onChange={toggleAll}
                      className="accent-orange-500"
                      aria-label="Select all customers on this page"
                    />
                  </th>

                  <th className="px-3 py-4 font-semibold">Customer</th>
                  <th className="px-3 py-4 font-semibold">Email / Phone</th>
                  <th className="px-3 py-4 font-semibold">Total Bookings</th>
                  <th className="px-3 py-4 font-semibold">Last Booking</th>
                  <th className="px-3 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                <AnimatePresence mode="popLayout">
                  {paginatedCustomers.map((customer, index) => (
                    <motion.tr
                      key={customer.id}
                      layout
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        duration: 0.25,
                        delay: index * 0.04,
                      }}
                      className="border-b border-blue-50 hover:bg-blue-50/60 transition-colors"
                    >
                      <td className="px-5 py-3">
                        <input
                          type="checkbox"
                          checked={selectedCustomers.includes(customer.id)}
                          onChange={() => toggleCustomer(customer.id)}
                          className="accent-orange-500"
                          aria-label={`Select ${customer.name}`}
                        />
                      </td>

                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={customer.avatar}
                            alt={customer.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                            loading="lazy"
                          />

                          <div>
                            <p className="text-xs font-semibold text-blue-950">
                              {customer.name}
                            </p>

                            <p className="text-[11px] text-blue-400 mt-1">
                              {customer.location}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-3">
                        <div className="space-y-1.5">
                          <p className="text-[11px] text-blue-500 flex items-center gap-2">
                            <Mail size={12} />
                            {customer.email}
                          </p>

                          <p className="text-[11px] text-blue-500 flex items-center gap-2">
                            <Phone size={12} />
                            {customer.phone}
                          </p>
                        </div>
                      </td>

                      <td className="px-3 py-3 text-sm font-medium text-blue-900">
                        {customer.bookings}
                      </td>

                      <td className="px-3 py-3">
                        <p className="text-xs text-blue-600">
                          {customer.lastBooking}
                        </p>

                        <p className="text-[10px] text-blue-400 mt-1">
                          {customer.lastSeen}
                        </p>
                      </td>

                      <td className="px-3 py-3">
                        <StatusBadge status={customer.status} />
                      </td>

                      <td className="px-5 py-3">
                        <div className="relative flex justify-center">
                          <button
                            onClick={() =>
                              setMenuCustomer(
                                menuCustomer === customer.id
                                  ? null
                                  : customer.id
                              )
                            }
                            className="p-2 rounded-full border border-blue-100 text-blue-500 hover:bg-blue-100 transition"
                            aria-label={`Actions for ${customer.name}`}
                          >
                            <MoreVertical size={16} />
                          </button>

                          <AnimatePresence>
                            {menuCustomer === customer.id && (
                              <motion.div
                                initial={{
                                  opacity: 0,
                                  scale: 0.95,
                                  y: -5,
                                }}
                                animate={{
                                  opacity: 1,
                                  scale: 1,
                                  y: 0,
                                }}
                                exit={{
                                  opacity: 0,
                                  scale: 0.95,
                                }}
                                className="absolute right-8 top-0 z-20 w-40 bg-white border border-blue-100 shadow-xl rounded-xl p-1"
                              >
                                <button
                                  onClick={() => {
                                    setShowDetails(customer);
                                    setMenuCustomer(null);
                                  }}
                                  className="w-full flex items-center gap-2 p-2.5 text-xs hover:bg-blue-50 rounded-lg"
                                >
                                  <Eye size={14} />
                                  View Details
                                </button>

                                <button
                                  onClick={() => openEditModal(customer)}
                                  className="w-full flex items-center gap-2 p-2.5 text-xs hover:bg-blue-50 rounded-lg"
                                >
                                  <Pencil size={14} />
                                  Edit Customer
                                </button>

                                <button
                                  onClick={() => deleteCustomer(customer.id)}
                                  className="w-full flex items-center gap-2 p-2.5 text-xs text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 size={14} />
                                  Delete
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>

            {paginatedCustomers.length === 0 && (
              <div className="py-16 text-center">
                <Users
                  size={35}
                  className="mx-auto text-blue-200 mb-3"
                />

                <h3 className="font-semibold text-blue-950">
                  No customers found
                </h3>

                <p className="text-sm text-blue-400 mt-1">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </div>

          {/* PAGINATION */}

          <div className="px-4 sm:px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-blue-400">
              Showing{" "}
              {filteredCustomers.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}
              {" - "}
              {Math.min(
                currentPage * pageSize,
                filteredCustomers.length
              )}{" "}
              of {filteredCustomers.length} customers
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) => Math.max(1, page - 1))
                }
                className="w-9 h-9 rounded-xl border border-blue-100 flex items-center justify-center text-blue-500 disabled:opacity-40 hover:bg-blue-50"
                aria-label="Previous page"
              >
                <ChevronLeft size={17} />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              )
                .slice(0, 5)
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-xl text-xs font-semibold transition ${
                      currentPage === page
                        ? "bg-orange-600 text-white shadow-md"
                        : "border border-blue-100 text-blue-700 hover:bg-blue-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
                className="w-9 h-9 rounded-xl border border-blue-100 flex items-center justify-center text-blue-500 disabled:opacity-40 hover:bg-blue-50"
                aria-label="Next page"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </motion.section>

        {/* RIGHT SIDEBAR CONTENT */}

        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-4">

          {/* CUSTOMER GROWTH */}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-sm">Customer Growth</h3>

              <select className="text-xs border border-blue-100 rounded-lg p-2 text-blue-700 outline-none">
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>
            </div>

            <CustomerGrowthChart />
          </motion.div>

          {/* CUSTOMER SEGMENTS */}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm">Customer Segments</h3>

              <button className="text-xs text-blue-500 hover:text-orange-600">
                View All →
              </button>
            </div>

            <SegmentChart />
          </motion.div>

          {/* RECENT CUSTOMERS */}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm">Recent Customers</h3>

              <button
                onClick={() => {
                  setActiveTab("All");
                  setCurrentPage(1);
                  setSearch("");
                  setLocationFilter("All");
                }}
                className="text-xs text-blue-500 hover:text-orange-600"
              >
                View All →
              </button>
            </div>

            <div className="space-y-1">
              {recentCustomers.map((customer) => (
                <motion.button
                  key={customer.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setShowDetails(customer)}
                  className="w-full flex items-center gap-3 py-3 border-b border-blue-50 last:border-0 text-left"
                >
                  <div className="relative shrink-0">
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-10 h-10 rounded-full object-cover"
                      loading="lazy"
                    />

                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-blue-950">
                      {customer.name}
                    </p>

                    <p className="text-[10px] text-blue-400 mt-1 truncate">
                      Booked a {customer.segment.toLowerCase()} service
                    </p>
                  </div>

                  <span className="text-[10px] text-blue-400 whitespace-nowrap">
                    {customer.lastSeen}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* PROMOTION CARD */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="relative overflow-hidden rounded-xl p-5 bg-gradient-to-br from-orange-50 via-[#fff4eb] to-white border border-orange-100"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border border-orange-200/60" />
            <div className="absolute -right-2 -bottom-10 w-24 h-24 rounded-full border border-orange-200/60" />

            <div className="relative z-10 flex items-start gap-3">
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                <Users size={28} />
              </div>

              <div>
                <h3 className="font-bold text-sm leading-5">
                  Happy Customers
                  <br />
                  Build a Stronger Business
                </h3>

                <p className="text-xs text-blue-500 mt-2 leading-5">
                  Keep providing great services and watch your customer base grow!
                </p>

                <button
                  onClick={openAddModal}
                  className="mt-4 flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-full px-4 py-2.5 text-xs font-semibold shadow-lg shadow-orange-100 hover:scale-105 transition"
                >
                  Add New Customer
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================================
          ADD / EDIT CUSTOMER MODAL
      ============================================ */}

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setShowModal(false);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 25 }}
              transition={{ type: "spring", damping: 24 }}
              className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center p-5 border-b border-blue-50">
                <div>
                  <h2 className="font-bold text-lg">
                    {editingCustomer
                      ? "Edit Customer"
                      : "Add New Customer"}
                  </h2>

                  <p className="text-xs text-blue-400 mt-1">
                    Enter your customer's information below.
                  </p>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-blue-50 text-blue-500"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {[
                  {
                    label: "Full Name",
                    key: "name",
                    placeholder: "Enter customer name",
                    type: "text",
                  },
                  {
                    label: "Email Address",
                    key: "email",
                    placeholder: "customer@example.com",
                    type: "email",
                  },
                  {
                    label: "Phone Number",
                    key: "phone",
                    placeholder: "+234 800 000 0000",
                    type: "tel",
                  },
                  {
                    label: "Location",
                    key: "location",
                    placeholder: "Lagos, Nigeria",
                    type: "text",
                  },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-blue-900 mb-2">
                      {field.label}
                    </label>

                    <input
                      required
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={(event) =>
                        setForm((previous) => ({
                          ...previous,
                          [field.key]: event.target.value,
                        }))
                      }
                      className="w-full border border-blue-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold text-blue-900 mb-2">
                    Customer Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        status: event.target.value,
                      }))
                    }
                    className="w-full border border-blue-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400"
                  >
                    <option>Active</option>
                    <option>New</option>
                    <option>Returning</option>
                    <option>Inactive</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 border border-blue-100 rounded-xl py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl py-3 text-sm font-semibold shadow-lg shadow-orange-100 hover:opacity-90"
                  >
                    {editingCustomer ? "Save Changes" : "Add Customer"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================
          CUSTOMER DETAILS MODAL
      ============================================ */}

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setShowDetails(null);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setShowDetails(null)}
                  className="p-2 hover:bg-blue-50 rounded-full"
                  aria-label="Close details"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="flex flex-col items-center text-center">
                <img
                  src={showDetails.avatar}
                  alt={showDetails.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-orange-100 shadow-md"
                />

                <h2 className="font-bold text-xl mt-4">
                  {showDetails.name}
                </h2>

                <div className="mt-2">
                  <StatusBadge status={showDetails.status} />
                </div>

                <p className="text-xs text-blue-400 mt-2">
                  Customer since {showDetails.joined}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                    <Mail size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] text-blue-400">
                      Email Address
                    </p>

                    <p className="text-xs font-medium break-all">
                      {showDetails.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                    <Phone size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] text-blue-400">
                      Phone Number
                    </p>

                    <p className="text-xs font-medium">
                      {showDetails.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
                    <MapPin size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] text-blue-400">
                      Location
                    </p>

                    <p className="text-xs font-medium">
                      {showDetails.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-500 shrink-0">
                    <CalendarDays size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] text-blue-400">
                      Total Bookings
                    </p>

                    <p className="text-xs font-medium">
                      {showDetails.bookings} bookings
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-500 shrink-0">
                    <Star size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] text-blue-400">
                      Customer Segment
                    </p>

                    <p className="text-xs font-medium">
                      {showDetails.segment}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openEditModal(showDetails)}
                className="w-full mt-7 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Pencil size={16} />
                Edit Customer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
