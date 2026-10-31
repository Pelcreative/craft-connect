
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  Lightbulb,
  Star,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ---------------------------------------------
// SAMPLE ANALYTICS DATA
// Replace these arrays with your API response.
// ---------------------------------------------

const revenueData = [
  { day: "May 1", revenue: 12000 },
  { day: "May 3", revenue: 18000 },
  { day: "May 5", revenue: 42000 },
  { day: "May 7", revenue: 32000 },
  { day: "May 9", revenue: 58000 },
  { day: "May 11", revenue: 78000 },
  { day: "May 13", revenue: 74000 },
  { day: "May 15", revenue: 110000 },
  { day: "May 17", revenue: 95000 },
  { day: "May 19", revenue: 102000 },
  { day: "May 21", revenue: 155000 },
  { day: "May 23", revenue: 150000 },
  { day: "May 25", revenue: 185000 },
  { day: "May 27", revenue: 210000 },
  { day: "May 29", revenue: 225000 },
  { day: "May 31", revenue: 320000 },
];

const bookingSources = [
  { name: "Direct Booking", value: 8, color: "#2994F5" },
  { name: "Social Media", value: 5, color: "#FFA51F" },
  { name: "Website", value: 3, color: "#F04470" },
  { name: "Referral", value: 2, color: "#913BEE" },
];

const servicePerformance = [
  {
    name: "Photography",
    bookings: 8,
    revenue: 120000,
    growth: 22,
    color: "#2994F5",
    icon: Camera,
  },
  {
    name: "Catering",
    bookings: 5,
    revenue: 80000,
    growth: 15,
    color: "#9747FF",
    icon: Users,
  },
  {
    name: "Makeup Artistry",
    bookings: 3,
    revenue: 60000,
    growth: 10,
    color: "#F04470",
    icon: Star,
  },
  {
    name: "Event Planning",
    bookings: 2,
    revenue: 40000,
    growth: 8,
    color: "#FFA51F",
    icon: CalendarDays,
  },
];

const customerGrowthData = [
  { day: "May 1", customers: 3, newCustomers: 1 },
  { day: "May 4", customers: 4, newCustomers: 2 },
  { day: "May 7", customers: 5, newCustomers: 2 },
  { day: "May 10", customers: 6, newCustomers: 3 },
  { day: "May 13", customers: 7, newCustomers: 3 },
  { day: "May 16", customers: 9, newCustomers: 4 },
  { day: "May 19", customers: 10, newCustomers: 5 },
  { day: "May 22", customers: 12, newCustomers: 4 },
  { day: "May 25", customers: 14, newCustomers: 6 },
  { day: "May 28", customers: 16, newCustomers: 7 },
  { day: "May 31", customers: 19, newCustomers: 9 },
];

const activities = [
  {
    title: "New booking from Chioma Eze",
    description: "Photography",
    date: "May 28, 2025",
    amount: "₦40,000",
    initials: "CE",
    color: "bg-orange-100 text-orange-600",
    icon: CalendarDays,
  },
  {
    title: "Payment received from Tolu Adeyemi",
    description: "Catering",
    date: "May 27, 2025",
    amount: "₦25,000",
    initials: "TA",
    color: "bg-blue-100 text-blue-600",
    icon: Wallet,
  },
  {
    title: "New review from Amaka Johnson",
    description: "5 stars",
    date: "May 26, 2025",
    amount: "★★★★★",
    initials: "AJ",
    color: "bg-purple-100 text-purple-600",
    icon: Star,
  },
];

const insights = [
  {
    title: "Revenue Increased",
    description:
      "Your revenue grew by 18% compared to last month. Keep up the great work!",
    icon: TrendingUp,
    color: "green",
  },
  {
    title: "More New Customers",
    description:
      "You gained 12 new customers this month. Consider running a referral program to grow faster.",
    icon: Users,
    color: "blue",
  },
  {
    title: "Top Service",
    description:
      "Photography is your best performing service (44% of total bookings).",
    icon: Star,
    color: "purple",
  },
  {
    title: "Peak Booking Day",
    description:
      "Saturday has the highest booking rate (38% of all bookings).",
    icon: Clock3,
    color: "orange",
  },
  {
    title: "Growth Opportunity",
    description:
      "Consider promoting your catering and makeup services — they have high interest but lower bookings.",
    icon: TrendingUp,
    color: "pink",
  },
];

// ---------------------------------------------
// REUSABLE COMPONENTS
// ---------------------------------------------

const cardMotion = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function StatCard({
  title,
  value,
  percentage,
  icon: Icon,
  color,
  negative = false,
  delay = 0,
}) {
  return (
    <motion.div
      variants={cardMotion}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-sm transition-shadow hover:shadow-lg sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${color}`}
          >
            <Icon size={23} strokeWidth={2.4} />
          </div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
        </div>
      </div>

      <div className="mt-3 pl-1 sm:pl-1">
        <h3 className="text-2xl font-bold tracking-tight text-[#08285F]">
          {value}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span
            className={`flex items-center font-semibold ${
              negative ? "text-red-500" : "text-emerald-500"
            }`}
          >
            {negative ? (
              <ArrowDownRight size={15} />
            ) : (
              <ArrowUpRight size={15} />
            )}
            {percentage}
          </span>
          <span className="text-slate-400">from last month</span>
        </div>
      </div>
    </motion.div>
  );
}

function SectionCard({ title, children, action }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="min-w-0 rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-sm sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-bold text-[#09275F]">{title}</h3>
        {action}
      </div>
      {children}
    </motion.section>
  );
}

function InsightCard({ item, index }) {
  const Icon = item.icon;

  const colors = {
    green: "bg-emerald-100 text-emerald-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    pink: "bg-pink-100 text-pink-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ x: 4 }}
      className="flex gap-3 rounded-xl border border-blue-100 bg-white p-3 transition-colors hover:bg-blue-50/50"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          colors[item.color]
        }`}
      >
        <Icon size={20} />
      </div>

      <div>
        <h4 className="text-sm font-semibold text-[#09275F]">
          {item.title}
        </h4>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------
// MAIN VENDOR ANALYSIS COMPONENT
// ---------------------------------------------

export default function VendorAnalysis() {
  const [period, setPeriod] = useState("This Month");
  const [chartType, setChartType] = useState("Revenue");
  const [exporting, setExporting] = useState(false);

  const totalRevenue = 320000;
  const totalBookings = 18;
  const newCustomers = 12;
  const averageRating = 4.8;

  const formatCurrency = (amount) =>
    `₦${Number(amount).toLocaleString("en-NG")}`;

  const handleExport = () => {
    setExporting(true);

    const rows = [
      ["Metric", "Value"],
      ["Total Revenue", totalRevenue],
      ["Total Bookings", totalBookings],
      ["New Customers", newCustomers],
      ["Average Rating", averageRating],
      [],
      ["Service", "Bookings", "Revenue", "Growth"],
      ...servicePerformance.map((service) => [
        service.name,
        service.bookings,
        service.revenue,
        `${service.growth}%`,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "craftconnect-vendor-analysis.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setTimeout(() => setExporting(false), 700);
  };

  const bookingTotal = useMemo(
    () => bookingSources.reduce((sum, item) => sum + item.value, 0),
    []
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="rounded-xl border border-blue-100 bg-white p-3 shadow-xl">
        <p className="mb-1 text-xs font-medium text-slate-500">{label}</p>
        {payload.map((item, index) => (
          <p
            key={index}
            className="text-sm font-bold text-[#09275F]"
          >
            {item.name}:{" "}
            {item.dataKey === "revenue"
              ? formatCurrency(item.value)
              : item.value}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F2F9FD] px-3 py-5 sm:px-5 lg:px-6">
      <div className="mx-auto max-w-[1800px] space-y-5">

        {/* PAGE HEADER */}

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <TrendingUp size={29} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#09275F] sm:text-3xl">
                Analysis
              </h1>
              <p className="mt-1 text-sm text-blue-500">
                Track your performance and make data-driven decisions.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex items-center">
              <CalendarDays
                size={17}
                className="pointer-events-none absolute left-3 text-blue-500"
              />
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full appearance-none rounded-xl border border-blue-100 bg-white py-3 pl-10 pr-10 text-sm text-slate-600 outline-none transition focus:border-blue-400 sm:w-64"
              >
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
                <option>All Time</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 text-blue-500"
              />
            </div>

            <button
              onClick={handleExport}
              disabled={exporting}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg disabled:opacity-60"
            >
              <Download size={17} />
              {exporting ? "Exporting..." : "Export Report"}
            </button>
          </div>
        </motion.div>

        {/* STATISTICS CARDS */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(totalRevenue)}
            percentage="18%"
            icon={Wallet}
            color="bg-emerald-100 text-emerald-500"
            delay={0.05}
          />

          <StatCard
            title="Total Bookings"
            value={totalBookings}
            percentage="12%"
            icon={CalendarDays}
            color="bg-purple-100 text-purple-600"
            delay={0.1}
          />

          <StatCard
            title="New Customers"
            value={newCustomers}
            percentage="24%"
            icon={Users}
            color="bg-blue-100 text-blue-500"
            delay={0.15}
          />

          <StatCard
            title="Average Rating"
            value={averageRating}
            percentage="6%"
            icon={Star}
            color="bg-orange-100 text-orange-600"
            delay={0.2}
          />
        </div>

        {/* MAIN ANALYTICS GRID */}

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">

          {/* LEFT AND CENTER CONTENT */}

          <div className="space-y-4 xl:col-span-8">

            {/* REVENUE AND BOOKING SOURCES */}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">

              {/* REVENUE OVERVIEW */}

              <div className="lg:col-span-3">
                <SectionCard
                  title="Revenue Overview"
                  action={
                    <select
                      value={chartType}
                      onChange={(e) => setChartType(e.target.value)}
                      className="rounded-lg border border-blue-100 bg-white px-3 py-2 text-xs font-medium text-[#09275F] outline-none"
                    >
                      <option>Revenue</option>
                      <option>Bookings</option>
                    </select>
                  }
                >
                  <div className="h-[260px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={revenueData}
                        margin={{
                          top: 10,
                          right: 5,
                          left: -15,
                          bottom: 0,
                        }}
                      >
                        <defs>
                          <linearGradient
                            id="revenueGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#FF7417"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="#FF7417"
                              stopOpacity={0.01}
                            />
                          </linearGradient>
                        </defs>

                        <CartesianGrid
                          stroke="#E8F0FA"
                          strokeDasharray="3 3"
                          vertical={true}
                        />

                        <XAxis
                          dataKey="day"
                          tick={{ fill: "#6482B6", fontSize: 10 }}
                          axisLine={false}
                          tickLine={false}
                          interval={2}
                        />

                        <YAxis
                          tick={{ fill: "#6482B6", fontSize: 10 }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(value) =>
                            `₦${value / 1000}k`
                          }
                        />

                        <Tooltip content={<CustomTooltip />} />

                        <Area
                          type="monotone"
                          dataKey="revenue"
                          name="Revenue"
                          stroke="#FF6A00"
                          strokeWidth={3}
                          fill="url(#revenueGradient)"
                          activeDot={{
                            r: 6,
                            stroke: "#fff",
                            strokeWidth: 2,
                          }}
                          animationDuration={1500}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </SectionCard>
              </div>

              {/* BOOKING SOURCES */}

              <div className="lg:col-span-2">
                <SectionCard
                  title="Booking Sources"
                  action={
                    <span className="rounded-lg border border-blue-100 px-2 py-1 text-xs text-blue-600">
                      {period}
                    </span>
                  }
                >
                  <div className="flex flex-col items-center gap-3 sm:flex-row lg:flex-col xl:flex-row">
                    <div className="relative h-[185px] w-full max-w-[190px] shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={bookingSources}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={55}
                            outerRadius={83}
                            paddingAngle={3}
                            startAngle={90}
                            endAngle={-270}
                            animationDuration={1200}
                          >
                            {bookingSources.map((item, index) => (
                              <Cell
                                key={index}
                                fill={item.color}
                                stroke="none"
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>

                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-[#09275F]">
                          {bookingTotal}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          Total Bookings
                        </span>
                      </div>
                    </div>

                    <div className="w-full space-y-3">
                      {bookingSources.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between gap-2 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-slate-500">
                              {item.name}
                            </span>
                          </div>
                          <span className="font-semibold text-[#09275F]">
                            {item.value} (
                            {Math.round(
                              (item.value / bookingTotal) * 100
                            )}
                            %)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionCard>
              </div>
            </div>

            {/* SERVICE PERFORMANCE AND CUSTOMER GROWTH */}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

              {/* SERVICE PERFORMANCE */}

              <SectionCard
                title="Service Performance"
                action={
                  <span className="rounded-lg border border-blue-100 px-2 py-1 text-xs text-blue-600">
                    {period}
                  </span>
                }
              >
                <div className="mb-3 grid grid-cols-[1fr_55px_85px_55px] gap-2 text-[10px] font-semibold text-slate-500 sm:text-xs">
                  <span>Service</span>
                  <span>Bookings</span>
                  <span>Revenue</span>
                  <span>Growth</span>
                </div>

                <div className="space-y-4">
                  {servicePerformance.map((service, index) => {
                    const Icon = service.icon;

                    return (
                      <motion.div
                        key={service.name}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-blue-50 pb-3 last:border-0"
                      >
                        <div className="grid grid-cols-[1fr_55px_85px_55px] items-center gap-2">
                          <div className="flex min-w-0 items-center gap-2">
                            <div
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                              style={{
                                backgroundColor: `${service.color}20`,
                                color: service.color,
                              }}
                            >
                              <Icon size={16} />
                            </div>

                            <span className="truncate text-xs font-medium text-[#09275F]">
                              {service.name}
                            </span>
                          </div>

                          <span className="text-xs text-slate-600">
                            {service.bookings}
                          </span>

                          <span className="text-xs font-medium text-[#09275F]">
                            ₦{(service.revenue / 1000).toFixed(0)}k
                          </span>

                          <span className="flex items-center text-xs font-semibold text-emerald-500">
                            <ArrowUpRight size={13} />
                            {service.growth}%
                          </span>
                        </div>

                        <div className="ml-10 mt-2 h-1.5 overflow-hidden rounded-full bg-blue-50">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(service.revenue / 120000) * 100}%`,
                            }}
                            transition={{
                              duration: 1,
                              delay: 0.3 + index * 0.1,
                            }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: service.color }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </SectionCard>

              {/* CUSTOMER GROWTH */}

              <SectionCard
                title="Customer Growth"
                action={
                  <span className="rounded-lg border border-blue-100 px-2 py-1 text-xs text-blue-600">
                    {period}
                  </span>
                }
              >
                <div className="mb-3 flex flex-wrap justify-center gap-4 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    Total Customers
                  </span>

                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                    New Customers
                  </span>
                </div>

                <div className="h-[245px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={customerGrowthData}
                      margin={{
                        top: 10,
                        right: 5,
                        left: -25,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid
                        stroke="#E8F0FA"
                        strokeDasharray="3 3"
                      />

                      <XAxis
                        dataKey="day"
                        tick={{ fill: "#6482B6", fontSize: 9 }}
                        axisLine={false}
                        tickLine={false}
                        interval={2}
                      />

                      <YAxis
                        tick={{ fill: "#6482B6", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />

                      <Tooltip content={<CustomTooltip />} />

                      <Bar
                        dataKey="newCustomers"
                        name="New Customers"
                        fill="#A855F7"
                        radius={[3, 3, 0, 0]}
                        barSize={9}
                      />

                      <Line
                        type="monotone"
                        dataKey="customers"
                        name="Total Customers"
                        stroke="#268EFF"
                        strokeWidth={2.5}
                        dot={{
                          r: 2,
                          fill: "#268EFF",
                        }}
                        activeDot={{ r: 5 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </SectionCard>
            </div>

            {/* RECENT ACTIVITY */}

            <SectionCard
              title="Recent Activity"
              action={
                <button
                  type="button"
                  onClick={() =>
                    window.alert("Recent activity page coming soon.")
                  }
                  className="text-xs font-medium text-blue-500 hover:text-orange-500"
                >
                  View All →
                </button>
              }
            >
              <div className="space-y-1">
                {activities.map((activity, index) => {
                  const Icon = activity.icon;

                  return (
                    <motion.div
                      key={activity.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-50 py-3 last:border-0"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${activity.color}`}
                        >
                          <Icon size={18} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-[#09275F] sm:text-sm">
                            {activity.title}
                          </p>

                          <p className="mt-1 text-[10px] text-slate-400">
                            {activity.description} <span>•</span>{" "}
                            {activity.date}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-sm font-bold ${
                          activity.amount.includes("★")
                            ? "text-orange-400"
                            : "text-[#09275F]"
                        }`}
                      >
                        {activity.amount}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </SectionCard>
          </div>

          {/* RIGHT SIDEBAR - INSIGHTS */}

          <div className="space-y-4 xl:col-span-4">
            <SectionCard
              title="Insights & Recommendations"
              action={<Lightbulb size={19} className="text-orange-500" />}
            >
              <div className="space-y-3">
                {insights.map((item, index) => (
                  <InsightCard
                    key={item.title}
                    item={item}
                    index={index}
                  />
                ))}
              </div>
            </SectionCard>

            {/* PROMOTIONAL CARD */}

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative min-h-[205px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#06223D] via-[#0C304D] to-[#33343A] p-5 text-white shadow-lg sm:p-6"
            >
              <div className="absolute -right-8 -top-10 h-44 w-44 rounded-full border-[25px] border-white/5" />

              <div className="absolute -bottom-10 right-5 opacity-20">
                <BarChart3 size={150} />
              </div>

              <div className="relative z-10">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500">
                  <TrendingUp size={23} />
                </div>

                <h3 className="text-lg font-bold">
                  Scale Your Business
                </h3>

                <p className="mt-2 max-w-[250px] text-xs leading-5 text-blue-100">
                  Unlock more insights, attract more customers, and increase
                  your revenue with CraftConnect.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    window.alert("Upgrade options coming soon.")
                  }
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 text-xs font-bold text-white shadow-md transition hover:scale-105 hover:shadow-orange-500/30"
                >
                  Upgrade Now
                  <ArrowUpRight size={15} />
                </button>
              </div>

              <div className="absolute bottom-6 right-6 hidden text-orange-400 sm:block">
                <Zap size={35} />
              </div>
            </motion.div>

            {/* QUICK PERFORMANCE SUMMARY */}

            <SectionCard title="Performance Summary">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet size={17} className="text-emerald-500" />
                    <span className="text-sm text-slate-500">
                      Revenue target
                    </span>
                  </div>
                  <span className="text-sm font-bold text-[#09275F]">
                    80%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-blue-50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ duration: 1.2 }}
                    className="h-full rounded-full bg-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={17}
                      className="text-blue-500"
                    />
                    <span className="text-sm text-slate-500">
                      Booking target
                    </span>
                  </div>
                  <span className="text-sm font-bold text-[#09275F]">
                    90%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-blue-50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "90%" }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="h-full rounded-full bg-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity size={17} className="text-purple-500" />
                    <span className="text-sm text-slate-500">
                      Customer growth
                    </span>
                  </div>
                  <span className="text-sm font-bold text-[#09275F]">
                    75%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-blue-50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="h-full rounded-full bg-purple-500"
                  />
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

        {/* FOOTER */}

        <div className="flex flex-col justify-between gap-2 border-t border-blue-100 py-4 text-xs text-slate-400 sm:flex-row">
          <p>© 2025 CraftConnect. All rights reserved.</p>
          <p>Vendor Analytics Dashboard</p>
        </div>
      </div>
    </div>
  );
}
