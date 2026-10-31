
import  { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Image as ImageIcon,
  Plus,
  Search,
  Eye,
  Heart,
  Share2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Pencil,
  Trash2,
  X,
  Star,
  Crown,
  TrendingUp,
  Camera,
  Palette,
  Utensils,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  BarChart3,
  Upload,
} from "lucide-react";

// --------------------------------------------------
// INITIAL PORTFOLIO DATA
// --------------------------------------------------

const initialPortfolio = [
  {
    id: 1,
    title: "African Print Outfit Collection",
    category: "Fashion Design",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800",
    views: 1200,
    likes: 245,
    shares: 18,
    description:
      "A beautiful collection of contemporary African-inspired fashion designs.",
    date: "May 28, 2025",
  },
  {
    id: 2,
    title: "Wedding Cake Collection",
    category: "Catering",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
    views: 980,
    likes: 180,
    shares: 12,
    description:
      "Elegant wedding cakes designed for unforgettable celebrations.",
    date: "May 25, 2025",
  },
  {
    id: 3,
    title: "Event Photography",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
    views: 1500,
    likes: 320,
    shares: 25,
    description:
      "Professional event photography capturing beautiful memories.",
    date: "May 22, 2025",
  },
  {
    id: 4,
    title: "Event Decoration Setup",
    category: "Decorations",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
    views: 860,
    likes: 142,
    shares: 10,
    description:
      "Creative decoration setups for weddings and special occasions.",
    date: "May 20, 2025",
  },
  {
    id: 5,
    title: "Bridal Makeup Look",
    category: "Makeup Artistry",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
    views: 1100,
    likes: 210,
    shares: 15,
    description:
      "Elegant bridal makeup with a flawless professional finish.",
    date: "May 18, 2025",
  },
  {
    id: 6,
    title: "Food Platter for Events",
    category: "Catering",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
    views: 930,
    likes: 165,
    shares: 11,
    description:
      "Beautifully prepared food platters for parties and corporate events.",
    date: "May 16, 2025",
  },
  {
    id: 7,
    title: "Custom Outfits",
    category: "Fashion Design",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
    views: 750,
    likes: 130,
    shares: 8,
    description:
      "Custom-designed outfits combining traditional and modern styles.",
    date: "May 14, 2025",
  },
  {
    id: 8,
    title: "Lifestyle Photography",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
    views: 680,
    likes: 120,
    shares: 9,
    description:
      "Creative lifestyle photography for individuals and brands.",
    date: "May 12, 2025",
  },
  {
    id: 9,
    title: "Luxury Wedding Styling",
    category: "Decorations",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
    views: 920,
    likes: 195,
    shares: 14,
    description: "Luxury styling for weddings and private celebrations.",
    date: "May 10, 2025",
  },
  {
    id: 10,
    title: "Professional Makeup",
    category: "Makeup Artistry",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800",
    views: 840,
    likes: 170,
    shares: 12,
    description: "Professional beauty and makeup artistry.",
    date: "May 8, 2025",
  },
  {
    id: 11,
    title: "Traditional Fashion",
    category: "Fashion Design",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800",
    views: 1050,
    likes: 230,
    shares: 19,
    description: "Traditional fashion with a modern creative touch.",
    date: "May 6, 2025",
  },
  {
    id: 12,
    title: "Outdoor Event Photography",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-150 wedding?w=800",
    views: 650,
    likes: 115,
    shares: 7,
    description: "Beautiful outdoor photography and event coverage.",
    date: "May 4, 2025",
  },
];

const categories = [
  "All",
  "Fashion Design",
  "Catering",
  "Photography",
  "Decorations",
  "Makeup Artistry",
  "Others",
];

const categoryIcons = {
  "Fashion Design": Palette,
  Catering: Utensils,
  Photography: Camera,
  Decorations: Sparkles,
  "Makeup Artistry": Star,
  Others: ImageIcon,
};

const formatNumber = (num) => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(".0", "")}K`;
  }
  return num.toLocaleString();
};

// --------------------------------------------------
// STATISTIC CARD
// --------------------------------------------------

function PortfolioStat({
  title,
  value,
  percentage,
  icon: Icon,
  iconColor,
  delay,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -5 }}
      className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconColor}`}
        >
          <Icon size={21} />
        </div>
      </div>

      <p className="mt-4 text-xs font-medium text-slate-500 sm:text-sm">
        {title}
      </p>

      <h3 className="mt-1 text-2xl font-bold tracking-tight text-[#09265e]">
        {value}
      </h3>

      <p className="mt-2 flex items-center gap-1 text-[11px] text-slate-400">
        <TrendingUp size={13} className="text-emerald-500" />
        <span className="font-semibold text-emerald-500">
          {percentage}
        </span>
        from last month
      </p>
    </motion.div>
  );
}

// --------------------------------------------------
// PORTFOLIO FORM MODAL
// --------------------------------------------------

function PortfolioModal({ item, onClose, onSave }) {
  const [form, setForm] = useState(
    item || {
      title: "",
      category: "Fashion Design",
      image: "",
      description: "",
    }
  );

  const [preview, setPreview] = useState(item?.image || "");

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    update("image", imageUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.image) {
      alert("Please provide a portfolio image.");
      return;
    }

    onSave(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15 }}
        className="my-auto w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Portfolio Management
            </span>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {item ? "Edit Portfolio Item" : "Add Portfolio Item"}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Showcase your best work to attract more customers.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-600">
              Portfolio Title
            </span>

            <input
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. Wedding Photography Collection"
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
            />
          </label>

          <label className="block">
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

          <div>
            <span className="mb-2 block text-xs font-semibold text-slate-600">
              Portfolio Image
            </span>

            <label className="flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-orange-300 hover:bg-orange-50/30">
              {preview ? (
                <img
                  src={preview}
                  alt="Portfolio preview"
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center py-9">
                  <Upload size={25} className="text-orange-500" />
                  <span className="mt-2 text-sm font-semibold text-slate-600">
                    Click to upload image
                  </span>
                  <span className="mt-1 text-xs text-slate-400">
                    PNG, JPG or WEBP
                  </span>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>

            <div className="mt-2">
              <input
                value={form.image.startsWith("blob:") ? "" : form.image}
                onChange={(e) => {
                  update("image", e.target.value);
                  setPreview(e.target.value);
                }}
                placeholder="Or paste an image URL..."
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-orange-400"
              />
            </div>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-600">
              Description
            </span>

            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Tell customers about this project..."
              className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-orange-400"
            />
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
            {item ? "Save Changes" : "Publish Portfolio"}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}

// --------------------------------------------------
// PORTFOLIO DETAILS MODAL
// --------------------------------------------------

function PortfolioDetails({ item, onClose, onEdit }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="relative h-64">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />

          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            {item.category}
          </span>

          <h2 className="mt-3 text-xl font-bold text-slate-900">
            {item.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {item.description || "No description available."}
          </p>

          <div className="mt-5 grid grid-cols-3 gap-3 border-y border-slate-100 py-4">
            <div className="text-center">
              <Eye size={17} className="mx-auto text-blue-500" />
              <p className="mt-2 font-bold">{formatNumber(item.views)}</p>
              <p className="text-xs text-slate-400">Views</p>
            </div>

            <div className="text-center">
              <Heart size={17} className="mx-auto text-rose-500" />
              <p className="mt-2 font-bold">{formatNumber(item.likes)}</p>
              <p className="text-xs text-slate-400">Likes</p>
            </div>

            <div className="text-center">
              <Share2 size={17} className="mx-auto text-blue-500" />
              <p className="mt-2 font-bold">{item.shares}</p>
              <p className="text-xs text-slate-400">Shares</p>
            </div>
          </div>

          <button
            onClick={onEdit}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-3 text-sm font-semibold text-white hover:bg-orange-700"
          >
            <Pencil size={16} />
            Edit Portfolio Item
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --------------------------------------------------
// RIGHT SIDE STATISTICS PANEL
// --------------------------------------------------

function PortfolioStatistics({ portfolio }) {
  const stats = categories.slice(1).map((category, index) => {
    const colors = [
      "#1685f8",
      "#ff9c19",
      "#ff514b",
      "#9146f5",
      "#c34df4",
      "#14b8a6",
    ];

    return {
      category,
      count: portfolio.filter((item) => item.category === category).length,
      color: colors[index],
    };
  });

  const total = portfolio.length;
  const segments = stats.filter((item) => item.count > 0);

  let accumulated = 0;

  const gradient = segments.map((item) => {
    const start = (accumulated / Math.max(total, 1)) * 100;
    accumulated += item.count;
    const end = (accumulated / Math.max(total, 1)) * 100;

    return `${item.color} ${start}% ${end}%`;
  });

  return (
    <section className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#09265e]">
          Portfolio Statistics
        </h3>

        <button className="text-[10px] font-medium text-blue-600">
          This Month⌄
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div
          className="relative grid h-32 w-32 shrink-0 place-items-center rounded-full"
          style={{
            background:
              total > 0
                ? `conic-gradient(${gradient.join(", ")})`
                : "#e2e8f0",
          }}
        >
          <div className="grid h-[94px] w-[94px] place-items-center rounded-full bg-white">
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#09265e]">
                {total}
              </h3>
              <p className="text-[9px] text-slate-400">Total Items</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2.5">
          {stats.map((item) => (
            <div
              key={item.category}
              className="flex items-center justify-between gap-2 text-xs"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate text-slate-500">
                  {item.category}
                </span>
              </div>

              <span className="font-semibold text-[#09265e]">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------
// TOP PERFORMING PORTFOLIO
// --------------------------------------------------

function TopPerforming({ portfolio, onViewAll, onViewItem }) {
  const topItems = [...portfolio]
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  return (
    <section className="rounded-xl border border-blue-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-4">
        <h3 className="text-sm font-bold text-[#09265e]">
          Top Performing Portfolio
        </h3>

        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-[10px] font-medium text-blue-600 hover:text-orange-600"
        >
          View All <ArrowRight size={12} />
        </button>
      </div>

      <div className="space-y-4 p-4">
        {topItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onViewItem(item)}
            className="flex w-full items-center gap-3 text-left transition hover:translate-x-1"
          >
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[#09265e]">
                {item.title}
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                {formatNumber(item.views)} views
                <span className="mx-1.5">•</span>
                {formatNumber(item.likes)} likes
              </p>
            </div>

            {index === 0 && (
              <Crown size={15} className="shrink-0 text-amber-500" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

// --------------------------------------------------
// MAIN VENDOR PORTFOLIO COMPONENT
// --------------------------------------------------

export default function VendorPortfolio() {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [menuId, setMenuId] = useState(null);

  const pageSize = 8;

  // Calculate statistics
  const totalViews = portfolio.reduce(
    (sum, item) => sum + item.views,
    0
  );

  const totalLikes = portfolio.reduce(
    (sum, item) => sum + item.likes,
    0
  );

  const totalShares = portfolio.reduce(
    (sum, item) => sum + item.shares,
    0
  );

  // Filter portfolio
  const filteredPortfolio = useMemo(() => {
    return portfolio.filter((item) => {
      const matchesCategory =
        activeCategory === "All" ||
        item.category === activeCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [portfolio, activeCategory, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPortfolio.length / pageSize)
  );

  const currentItems = filteredPortfolio.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Add or update item
  const saveItem = (form) => {
    if (editingItem) {
      setPortfolio((current) =>
        current.map((item) =>
          item.id === editingItem.id
            ? { ...item, ...form }
            : item
        )
      );
    } else {
      setPortfolio((current) => [
        {
          ...form,
          id: Date.now(),
          views: 0,
          likes: 0,
          shares: 0,
          date: new Date().toLocaleDateString(),
        },
        ...current,
      ]);

      setActiveCategory("All");
      setSearch("");
      setPage(1);
    }

    setModalOpen(false);
    setEditingItem(null);
  };

  // Open add modal
  const openAddModal = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (item) => {
    setEditingItem(item);
    setModalOpen(true);
    setViewItem(null);
    setMenuId(null);
  };

  // Delete portfolio item
  const deleteItem = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this portfolio item?"
    );

    if (!confirmed) return;

    setPortfolio((current) =>
      current.filter((item) => item.id !== id)
    );

    setMenuId(null);
  };

  return (
    <main className="min-h-screen w-full bg-[#f3f9fd] px-3 py-5 text-slate-900 sm:px-5 lg:px-6">
      <div className="mx-auto max-w-[1700px]">

        {/* -------------------------------------- */}
        {/* PORTFOLIO HEADER BANNER */}
        {/* -------------------------------------- */}

        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-4 flex min-h-[90px] items-center overflow-hidden rounded-xl bg-gradient-to-r from-orange-50 via-orange-50 to-[#fff1e5] px-5 py-5 sm:px-7"
        >
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <ImageIcon size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#09265e]">
                Portfolio
              </h1>

              <p className="mt-1 text-xs text-blue-600 sm:text-sm">
                Showcase your best work and attract more customers.
              </p>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 hidden w-[48%] sm:block">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000"
              alt=""
              className="h-full w-full object-cover opacity-80"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-orange-50/30 to-transparent" />
          </div>
        </motion.header>

        {/* -------------------------------------- */}
        {/* STATISTICS */}
        {/* -------------------------------------- */}

        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <PortfolioStat
            title="Total Portfolio Items"
            value={portfolio.length}
            percentage="12%"
            icon={CalendarDays}
            iconColor="bg-orange-100 text-orange-600"
            delay={0.05}
          />

          <PortfolioStat
            title="Total Views"
            value={formatNumber(totalViews)}
            percentage="18%"
            icon={Eye}
            iconColor="bg-violet-100 text-violet-600"
            delay={0.1}
          />

          <PortfolioStat
            title="Total Likes"
            value={formatNumber(totalLikes)}
            percentage="24%"
            icon={Heart}
            iconColor="bg-emerald-100 text-emerald-500"
            delay={0.15}
          />

          <PortfolioStat
            title="Total Shares"
            value={formatNumber(totalShares)}
            percentage="16%"
            icon={Share2}
            iconColor="bg-blue-100 text-blue-500"
            delay={0.2}
          />
        </div>

        {/* -------------------------------------- */}
        {/* MAIN CONTENT AND RIGHT SIDEBAR */}
        {/* -------------------------------------- */}

        <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">

          {/* PORTFOLIO COLLECTION */}
          <section className="min-w-0 rounded-xl border border-blue-100 bg-white/80 p-3 shadow-sm sm:p-4">

            {/* COLLECTION HEADER */}
            <div className="mb-4 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
              <h2 className="text-base font-bold text-[#09265e]">
                My Portfolio
              </h2>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1 lg:w-52">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search your portfolio..."
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <button
                  onClick={openAddModal}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 text-xs font-semibold text-white shadow-md shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700"
                >
                  <Plus size={15} />
                  Add Item
                </button>
              </div>
            </div>

            {/* CATEGORY TABS */}
            <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setPage(1);
                  }}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-[11px] font-medium transition-all ${
                    activeCategory === category
                      ? "border-orange-600 bg-orange-600 text-white shadow-md"
                      : "border-blue-100 bg-white text-blue-600 hover:border-orange-300 hover:bg-orange-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* PORTFOLIO GRID */}
            <AnimatePresence mode="wait">
              {currentItems.length > 0 ? (
                <motion.div
                  key={`${activeCategory}-${search}-${page}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
                >
                  {currentItems.map((item, index) => {
                    const Icon =
                      categoryIcons[item.category] || ImageIcon;

                    return (
                      <motion.article
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: index * 0.045,
                        }}
                        whileHover={{ y: -4 }}
                        className="group relative min-w-0 overflow-visible rounded-xl border border-slate-100 bg-white p-1.5 shadow-sm transition-shadow hover:shadow-lg"
                      >
                        {/* IMAGE */}
                        <div
                          className="relative h-36 cursor-pointer overflow-hidden rounded-lg bg-slate-100 sm:h-32 lg:h-28 2xl:h-28"
                          onClick={() => setViewItem(item)}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

                          <div className="absolute left-2 top-2 rounded-md bg-black/40 p-1.5 text-white backdrop-blur-sm">
                            <ImageIcon size={13} />
                          </div>
                        </div>

                        {/* CARD TITLE */}
                        <div className="relative px-1.5 pb-1 pt-2">
                          <div className="flex items-start justify-between gap-2">
                            <button
                              onClick={() => setViewItem(item)}
                              className="min-w-0 truncate text-left text-[11px] font-bold text-[#09265e] transition hover:text-orange-600"
                            >
                              {item.title}
                            </button>

                            <div className="relative shrink-0">
                              <button
                                onClick={() =>
                                  setMenuId(
                                    menuId === item.id ? null : item.id
                                  )
                                }
                                className="rounded-md p-0.5 text-blue-500 hover:bg-blue-50"
                              >
                                <MoreVertical size={16} />
                              </button>

                              <AnimatePresence>
                                {menuId === item.id && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute right-0 top-6 z-30 w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
                                  >
                                    <button
                                      onClick={() => {
                                        setViewItem(item);
                                        setMenuId(null);
                                      }}
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-600 hover:bg-slate-50"
                                    >
                                      <Eye size={13} />
                                      View Item
                                    </button>

                                    <button
                                      onClick={() => openEditModal(item)}
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-600 hover:bg-slate-50"
                                    >
                                      <Pencil size={13} />
                                      Edit Item
                                    </button>

                                    <button
                                      onClick={() => deleteItem(item.id)}
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-rose-600 hover:bg-rose-50"
                                    >
                                      <Trash2 size={13} />
                                      Delete Item
                                    </button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                          {/* CATEGORY */}
                          <div className="mt-1">
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-[9px] font-medium text-blue-600">
                              <Icon size={10} />
                              {item.category}
                            </span>
                          </div>

                          {/* ENGAGEMENT */}
                          <div className="mt-3 flex items-center gap-3 text-[10px] text-slate-500">
                            <span className="flex items-center gap-1">
                              <Eye size={12} className="text-blue-500" />
                              {formatNumber(item.views)}
                            </span>

                            <span className="flex items-center gap-1">
                              <Heart size={12} className="text-blue-500" />
                              {formatNumber(item.likes)}
                            </span>

                            <span className="flex items-center gap-1">
                              <Share2 size={12} className="text-blue-500" />
                              {item.shares}
                            </span>
                          </div>

                          {/* ACTIONS */}
                          <div className="mt-3 flex justify-end border-t border-slate-100 pt-2">
                            <button
                              onClick={() => openEditModal(item)}
                              className="rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-[10px] font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-blue-50"
                            >
                              Edit
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
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <ImageIcon size={27} />
                  </div>

                  <h3 className="mt-4 font-bold text-slate-800">
                    No portfolio items found
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Try another search or upload a new portfolio item.
                  </p>

                  <button
                    onClick={openAddModal}
                    className="mt-4 rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-orange-700"
                  >
                    Add Portfolio Item
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* PAGINATION */}
            <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row">
              <p className="text-[11px] text-blue-500">
                Showing{" "}
                {filteredPortfolio.length
                  ? (page - 1) * pageSize + 1
                  : 0}
                {" - "}
                {Math.min(page * pageSize, filteredPortfolio.length)}
                {" of "}
                {filteredPortfolio.length} items
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() =>
                    setPage((current) => Math.max(1, current - 1))
                  }
                  className="grid h-8 w-8 place-items-center rounded-lg border border-blue-100 text-blue-500 transition hover:bg-blue-50 disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, i) => i + 1
                ).map((number) => (
                  <button
                    key={number}
                    onClick={() => setPage(number)}
                    className={`h-8 min-w-8 rounded-lg px-2 text-xs font-semibold transition ${
                      page === number
                        ? "bg-orange-600 text-white shadow-md"
                        : "border border-blue-100 bg-white text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage((current) =>
                      Math.min(totalPages, current + 1)
                    )
                  }
                  className="grid h-8 w-8 place-items-center rounded-lg border border-blue-100 text-blue-500 transition hover:bg-blue-50 disabled:opacity-30"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* -------------------------------------- */}
          {/* RIGHT CONTENT PANELS */}
          {/* -------------------------------------- */}

          <aside className="flex min-w-0 flex-col gap-3">

            <PortfolioStatistics portfolio={portfolio} />

            <TopPerforming
              portfolio={portfolio}
              onViewAll={() => {
                setActiveCategory("All");
                setSearch("");
                setPage(1);
              }}
              onViewItem={setViewItem}
            />

            {/* EXPOSURE PROMO */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative overflow-hidden rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 to-[#fff4e9] p-5"
            >
              <div className="absolute -right-5 -top-8 h-24 w-24 rounded-full border border-orange-200/60" />
              <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full border border-orange-200/60" />

              <div className="relative z-10 flex items-start gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                  <Crown size={25} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#09265e]">
                    Get More Exposure
                  </h3>

                  <p className="mt-2 text-[11px] leading-5 text-slate-500">
                    Keep updating your portfolio to attract more customers and grow your business.
                  </p>

                  <button
                    onClick={openAddModal}
                    className="mt-3 flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2.5 text-[10px] font-semibold text-white transition hover:bg-orange-700"
                  >
                    Add New Portfolio Item
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </motion.section>
          </aside>
        </div>
      </div>

      {/* -------------------------------------- */}
      {/* ADD / EDIT MODAL */}
      {/* -------------------------------------- */}

      <AnimatePresence>
        {modalOpen && (
          <PortfolioModal
            item={editingItem}
            onClose={() => {
              setModalOpen(false);
              setEditingItem(null);
            }}
            onSave={saveItem}
          />
        )}
      </AnimatePresence>

      {/* -------------------------------------- */}
      {/* VIEW DETAILS MODAL */}
      {/* -------------------------------------- */}

      <AnimatePresence>
        {viewItem && (
          <PortfolioDetails
            item={viewItem}
            onClose={() => setViewItem(null)}
            onEdit={() => openEditModal(viewItem)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
