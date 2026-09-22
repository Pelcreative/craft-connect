import { motion } from "framer-motion";
import {
  FiUsers,
  FiCamera,
  FiStar,
  FiSend,
} from "react-icons/fi";

const benefits = [
  {
    icon: FiUsers,
    title: "Reach More Customers",
    description:
      "Put your work in front of customers actively looking for your services.",
  },
  {
    icon: FiCamera,
    title: "Showcase Your Work",
    description:
      "Create a professional profile that lets your best work speak for you.",
  },
  {
    icon: FiStar,
    title: "Manage Bookings",
    description:
      "Keep your customer requests, orders and appointments organised in one place.",
  },
  {
    icon: FiSend,
    title: "Grow Your Business",
    description:
      "Turn your skills and services into more opportunities, customers and bookings.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const WhyJoin = () => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

            <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
              Why Join?
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#123b52] sm:text-4xl">
            Everything you need to grow.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            CraftConnect gives independent professionals a dedicated place
            to present their work and manage customer relationships.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 45px rgba(18,59,82,0.08)",
                }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-orange-200"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{
                    rotate: [0, -8, 8, 0],
                    scale: 1.08,
                  }}
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500"
                >
                  <Icon size={23} />
                </motion.div>

                <h3 className="text-base font-bold text-[#123b52]">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {benefit.description}
                </p>

                {/* Bottom line */}
                <div className="mt-6 h-1 w-8 rounded-full bg-orange-500 transition-all duration-300 group-hover:w-14" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyJoin;