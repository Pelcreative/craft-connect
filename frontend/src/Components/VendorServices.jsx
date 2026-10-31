
import  { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Tag, Plus, Search, SlidersHorizontal, ChevronDown,
  ChevronLeft, ChevronRight, MoreVertical, Camera,
  Palette, Utensils, Sparkles, Star, CalendarDays,
  CalendarCheck, Eye, Pencil, Trash2, X, ToggleLeft,
  ToggleRight
} from "lucide-react";

const initialServices = [
  {
    id: 1,
    name: "Fashion Design & Tailoring",
    category: "Fashion Designers",
    priceMin: 30000,
    priceMax: 150000,
    rating: 4.8,
    reviews: 124,
    bookings: 120,
    status: "Active",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&q=85",
    description: "Custom clothing, alterations and made-to-measure outfits."
  },
  {
    id: 2,
    name: "Event Catering Services",
    category: "Caterers",
    priceMin: 25000,
    priceMax: 100000,
    rating: 4.7,
    reviews: 98,
    bookings: 98,
    status: "Active",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700&q=85",
    description: "Delicious menus and professional catering for every event."
  },
  {
    id: 3,
    name: "Photography & Videography",
    category: "Photographers",
    priceMin: 20000,
    priceMax: 120000,
    rating: 4.9,
    reviews: 87,
    bookings: 76,
    status: "Active",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&q=85",
    description: "Creative photography and video coverage for special moments."
  },
  {
    id: 4,
    name: "Event Decoration",
    category: "Decorators",
    priceMin: 50000,
    priceMax: 200000,
    rating: 4.6,
    reviews: 67,
    bookings: 54,
    status: "Active",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=85",
    description: "Beautiful event styling, floral arrangements and decor."
  },
  {
    id: 5,
    name: "Makeup Artistry",
    category: "Makeup Artists",
    priceMin: 15000,
    priceMax: 80000,
    rating: 4.8,
    reviews: 76,
    bookings: 68,
    status: "Active",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&q=85",
    description: "Professional makeup for weddings, celebrations and shoots."
  },
  {
    id: 6,
    name: "Birthday Party Planning",
    category: "Others",
    priceMin: 40000,
    priceMax: 150000,
    rating: 4.5,
    reviews: 32,
    bookings: 21,
    status: "Inactive",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=700&q=85",
    description: "Thoughtful planning and coordination for memorable parties."
  },
  {
    id: 7,
    name: "Bridal Styling",
    category: "Fashion Designers",
    priceMin: 45000,
    priceMax: 180000,
    rating: 4.9,
    reviews: 41,
    bookings: 34,
    status: "Active",
    image: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=700&q=85",
    description: "Complete bridal styling and custom wedding looks."
  },
  {
    id: 8,
    name: "Private Chef Experience",
    category: "Caterers",
    priceMin: 35000,
    priceMax: 95000,
    rating: 4.7,
    reviews: 29,
    bookings: 18,
    status: "Draft",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=700&q=85",
    description: "Private dining and bespoke chef experiences."
  },
  {
    id: 9,
    name: "Corporate Headshots",
    category: "Photographers",
    priceMin: 18000,
    priceMax: 65000,
    rating: 4.8,
    reviews: 55,
    bookings: 43,
    status: "Active",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&q=85",
    description: "Polished portraits for teams, professionals and brands."
  }
];

const categories = [
  "All Services",
  "Fashion Designers",
  "Caterers",
  "Photographers",
  "Decorators",
  "Makeup Artists",
  "Others"
];

const formatMoney = (value) =>
  `₦${Number(value || 0).toLocaleString("en-NG")}`;

const getCategoryIcon = (category) => {
  if (["Fashion Designers", "Makeup Artists"].includes(category))
    return Palette;
  if (category === "Caterers") return Utensils;
  if (category === "Photographers") return Camera;
  return Sparkles;
};

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700",
  Inactive: "bg-orange-50 text-orange-700",
  Draft: "bg-violet-50 text-violet-700"
};

// STATISTICS CARD
function ServiceStat({ title, value, change, icon: Icon, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -5 }}
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className={`grid h-11 w-11 place-items-center rounded-2xl ${color}`}>
          <Icon size={21} />
        </div>
        <span className={`text-xs font-semibold ${
          change.startsWith("-") ? "text-rose-600" : "text-emerald-600"
        }`}>
          {change.startsWith("-") ? "↓" : "↑"} {change.replace("-", "")}
        </span>
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>
      <h3 className="mt-1 text-2xl font-bold text-slate-900">{value}</h3>
      <p className="mt-1 text-xs text-slate-400">From last month</p>
    </motion.div>
  );
}

// ADD / EDIT SERVICE MODAL
function ServiceModal({ service, onClose, onSave }) {
  const [form, setForm] = useState(
    service || {
      name: "",
      category: "Fashion Designers",
      priceMin: "",
      priceMax: "",
      image: "",
      description: "",
      status: "Active"
    }
  );

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(form.priceMin) > Number(form.priceMax)) {
      alert("Minimum price cannot exceed maximum price.");
      return;
    }

    onSave({
      ...form,
      priceMin: Number(form.priceMin),
      priceMax: Number(form.priceMax)
    });
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.98 }}
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Service Management
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {service ? "Edit Service" : "Add New Service"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter the details customers need to discover your service.
            </p>
          </div>

          <button type="button" onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold text-slate-600">
              Service Name
            </span>
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Wedding Photography"
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
            />
          </label>

          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold text-slate-600">
              Category
            </span>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400"
            >
              {categories.slice(1).map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-semibold text-slate-600">
              Minimum Price (₦)
            </span>
            <input
              required
              min="0"
              type="number"
              value={form.priceMin}
              onChange={(e) => update("priceMin", e.target.value)}
              placeholder="30000"
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-orange-400"
            />
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-semibold text-slate-600">
              Maximum Price (₦)
            </span>
            <input
              required
              min="0"
              type="number"
              value={form.priceMax}
              onChange={(e) => update("priceMax", e.target.value)}
              placeholder="150000"
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-orange-400"
            />
          </label>

          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold text-slate-600">
              Image URL
            </span>
            <input
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-orange-400"
            />
          </label>

          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold text-slate-600">
              Description
            </span>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Describe your service..."
              className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-orange-400"
            />
          </label>

          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold text-slate-600">
              Status
            </span>
            <select
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400"
            >
              <option>Active</option>
              <option>Inactive</option>
              <option>Draft</option>
            </select>
          </label>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700"
          >
            {service ? "Save Changes" : "Create Service"}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}

// MAIN VENDOR SERVICES COMPONENT
export default function VendorServices() {
  const [services, setServices] = useState(initialServices);
  const [activeCategory, setActiveCategory] = useState("All Services");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [menuId, setMenuId] = useState(null);
  const [modalService, setModalService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewService, setViewService] = useState(null);

  const activeCount = services.filter(
    (service) => service.status === "Active"
  ).length;

  const inactiveCount = services.filter(
    (service) => service.status === "Inactive"
  ).length;

  const totalRevenue = services.reduce(
    (sum, service) => sum + service.bookings * service.priceMin,
    0
  );

  const filteredServices = useMemo(() => {
    let result = services.filter((service) =>
      activeCategory === "All Services" ||
      service.category === activeCategory
    );

    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((service) =>
        [service.name, service.category, service.description]
          .some((value) => value.toLowerCase().includes(query))
      );
    }

    if (sortBy === "Name A–Z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.priceMin - b.priceMin);
    }

    if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.priceMin - a.priceMin);
    }

    if (sortBy === "Most Bookings") {
      result.sort((a, b) => b.bookings - a.bookings);
    }

    return result;
  }, [services, activeCategory, search, sortBy]);

  const pageSize = 6;
  const pageCount = Math.max(
    1,
    Math.ceil(filteredServices.length / pageSize)
  );

  const currentServices = filteredServices.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const openAddModal = () => {
    setModalService(null);
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setModalService(service);
    setModalOpen(true);
    setMenuId(null);
  };

  const saveService = (form) => {
    if (modalService) {
      setServices((current) =>
        current.map((service) =>
          service.id === modalService.id
            ? { ...service, ...form }
            : service
        )
      );
    } else {
      setServices((current) => [
        {
          ...form,
          id: Date.now(),
          rating: 0,
          reviews: 0,
          bookings: 0,
          image: form.image ||
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=700&q=85"
        },
        ...current
      ]);

      setActiveCategory("All Services");
      setSearch("");
      setPage(1);
    }

    setModalOpen(false);
  };

  const toggleStatus = (id) => {
    setServices((current) =>
      current.map((service) =>
        service.id === id
          ? {
              ...service,
              status: service.status === "Active"
                ? "Inactive"
                : "Active"
            }
          : service
      )
    );
    setMenuId(null);
  };

  const deleteService = (id) => {
    setServices((current) =>
      current.filter((service) => service.id !== id)
    );
    setMenuId(null);
  };

  return (
    <main className="min-h-screen w-full bg-[#f4f9fd] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">

        {/* PAGE HEADER */}
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-100 text-orange-600">
              <Tag size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Services
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage your services, set prices and attract more customers.
              </p>
            </div>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700"
          >
            <Plus size={17} />
            Add New Service
          </button>
        </motion.header>

        {/* CATEGORY FILTERS */}
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => {
            const count = category === "All Services"
              ? services.length
              : services.filter(
                  (service) => service.category === category
                ).length;

            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setPage(1);
                }}
                className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-semibold transition-all ${
                  activeCategory === category
                    ? "border-orange-600 bg-orange-600 text-white shadow-md"
                    : "border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:text-orange-600"
                }`}
              >
                {category}
                {category === "All Services" && ` (${count})`}
              </button>
            );
          })}
        </div>

        {/* STATISTICS */}
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ServiceStat
            title="Total Services"
            value={services.length}
            change="20%"
            icon={CalendarDays}
            color="bg-violet-50 text-violet-600"
            delay={0.04}
          />

          <ServiceStat
            title="Active Services"
            value={activeCount}
            change="25%"
            icon={Eye}
            color="bg-emerald-50 text-emerald-600"
            delay={0.09}
          />

          <ServiceStat
            title="Inactive Services"
            value={inactiveCount}
            change="-50%"
            icon={ToggleLeft}
            color="bg-orange-50 text-orange-600"
            delay={0.14}
          />

          <ServiceStat
            title="Estimated Revenue"
            value={formatMoney(totalRevenue)}
            change="15%"
            icon={CalendarCheck}
            color="bg-blue-50 text-blue-600"
            delay={0.19}
          />
        </div>

        {/* SEARCH AND SORT */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search your services by name or category..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
            />
          </div>

          <div className="relative sm:w-56">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex h-12 w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:border-slate-300"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal size={16} />
                Sort: {sortBy}
              </span>
              <ChevronDown size={15} />
            </button>

            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 z-30 mt-2 w-full rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
                >
                  {[
                    "Newest",
                    "Name A–Z",
                    "Price: Low to High",
                    "Price: High to Low",
                    "Most Bookings"
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setSortOpen(false);
                      }}
                      className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm hover:bg-slate-50 ${
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

        {/* SERVICE CARDS */}
        <section className="rounded-2xl border border-slate-200/80 bg-white/70 p-3 shadow-sm sm:p-5">
          <AnimatePresence mode="popLayout">
            {currentServices.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3"
              >
                {currentServices.map((service, index) => {
                  const Icon = getCategoryIcon(service.category);

                  return (
                    <motion.article
                      key={service.id}
                      layout
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.045
                      }}
                      whileHover={{ y: -4 }}
                      className="group overflow-visible rounded-2xl border border-slate-200/70 bg-white p-3.5 shadow-sm transition-shadow hover:shadow-lg"
                    >
                      {/* IMAGE AND STATUS */}
                      <div className="flex gap-3">
                        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:w-36">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                              statusStyles[service.status]
                            }`}>
                              {service.status}
                            </span>

                            <div className="relative">
                              <button
                                aria-label="More actions"
                                onClick={() =>
                                  setMenuId(
                                    menuId === service.id ? null : service.id
                                  )
                                }
                                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
                              >
                                <MoreVertical size={17} />
                              </button>

                              <AnimatePresence>
                                {menuId === service.id && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute right-0 top-8 z-30 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
                                  >
                                    <button
                                      onClick={() => {
                                        setViewService(service);
                                        setMenuId(null);
                                      }}
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-slate-600 hover:bg-slate-50"
                                    >
                                      <Eye size={14} /> View Service
                                    </button>

                                    <button
                                      onClick={() => openEditModal(service)}
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-slate-600 hover:bg-slate-50"
                                    >
                                      <Pencil size={14} /> Edit Service
                                    </button>

                                    <button
                                      onClick={() => toggleStatus(service.id)}
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-slate-600 hover:bg-slate-50"
                                    >
                                      {service.status === "Active"
                                        ? <ToggleLeft size={14} />
                                        : <ToggleRight size={14} />}
                                      {service.status === "Active"
                                        ? "Deactivate"
                                        : "Activate"}
                                    </button>

                                    <button
                                      onClick={() => deleteService(service.id)}
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-rose-600 hover:bg-rose-50"
                                    >
                                      <Trash2 size={14} /> Delete Service
                                    </button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                            <Icon size={14} />
                            <span className="truncate">{service.category}</span>
                          </div>
                        </div>
                      </div>

                      {/* SERVICE DETAILS */}
                      <div className="mt-3">
                        <button
                          onClick={() => setViewService(service)}
                          className="text-left text-sm font-bold text-slate-900 transition hover:text-orange-600"
                        >
                          {service.name}
                        </button>

                        <div className="mt-2 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-600">
                          {service.category}
                        </div>
                      </div>

                      <p className="mt-2 text-base font-bold tracking-tight text-slate-900">
                        {formatMoney(service.priceMin)}
                        <span className="mx-1 text-slate-400">–</span>
                        {formatMoney(service.priceMax)}
                      </p>

                      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                        <Star
                          size={14}
                          fill="#f59e0b"
                          className="text-amber-500"
                        />
                        <span className="font-semibold text-slate-700">
                          {service.rating ? service.rating.toFixed(1) : "New"}
                        </span>
                        <span>({service.reviews} reviews)</span>
                      </div>

                      {/* CARD FOOTER */}
                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                        <span className="flex items-center gap-1.5 text-xs text-slate-500">
                          <CalendarDays size={14} className="text-blue-500" />
                          {service.bookings} Bookings
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(service)}
                            className="rounded-xl border border-blue-100 px-4 py-2 text-xs font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-blue-50"
                          >
                            Edit
                          </button>

                          <button
                            aria-label="More options"
                            onClick={() =>
                              setMenuId(
                                menuId === service.id ? null : service.id
                              )
                            }
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-orange-50 text-orange-500">
                  <Search size={23} />
                </div>

                <h3 className="mt-4 font-bold text-slate-800">
                  No Services Found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try another search or category.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All Services");
                    setPage(1);
                  }}
                  className="mt-4 text-sm font-semibold text-orange-600"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* PAGINATION */}
          <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-1 pt-4 sm:flex-row">
            <p className="text-xs text-slate-500">
              Showing{" "}
              {filteredServices.length ? (page - 1) * pageSize + 1 : 0}
              {"–"}
              {Math.min(page * pageSize, filteredServices.length)}
              {" of "}
              {filteredServices.length} services
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((current) => current - 1)}
                className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30"
              >
                <ChevronLeft size={17} />
              </button>

              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => setPage(number)}
                    className={`h-9 min-w-9 rounded-xl px-3 text-xs font-semibold transition ${
                      page === number
                        ? "bg-orange-600 text-white shadow-md"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {number}
                  </button>
                )
              )}

              <button
                disabled={page === pageCount}
                onClick={() => setPage((current) => current + 1)}
                className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ADD / EDIT MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <ServiceModal
            service={modalService}
            onClose={() => setModalOpen(false)}
            onSave={saveService}
          />
        )}
      </AnimatePresence>

      {/* VIEW SERVICE MODAL */}
      <AnimatePresence>
        {viewService && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setViewService(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12 }}
              className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="relative h-52">
                <img
                  src={viewService.image}
                  alt={viewService.name}
                  className="h-full w-full object-cover"
                />

                <button
                  onClick={() => setViewService(null)}
                  className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-700 shadow"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-blue-600">
                    {viewService.category}
                  </span>

                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    statusStyles[viewService.status]
                  }`}>
                    {viewService.status}
                  </span>
                </div>

                <h3 className="mt-2 text-xl font-bold">
                  {viewService.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {viewService.description || "No description added yet."}
                </p>

                <p className="mt-4 text-lg font-bold">
                  {formatMoney(viewService.priceMin)}
                  {" – "}
                  {formatMoney(viewService.priceMax)}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Star size={15} fill="#f59e0b" className="text-amber-500" />
                    {viewService.rating || "New"} rating
                  </span>

                  <span className="text-slate-500">
                    {viewService.bookings} bookings
                  </span>
                </div>

                <button
                  onClick={() => setViewService(null)}
                  className="mt-5 w-full rounded-xl bg-orange-600 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
