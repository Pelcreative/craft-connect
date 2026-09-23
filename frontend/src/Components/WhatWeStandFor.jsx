import { motion } from "framer-motion";
import {
  FiUsers,
  FiShield,
  FiStar,
  FiHeart,
} from "react-icons/fi";

const values = [
  {
    icon: FiUsers,
    title: "People First",
    description:
      "We connect customers with talented people and help professionals build meaningful businesses.",
  },
  {
    icon: FiShield,
    title: "Built on Trust",
    description:
      "Profiles, portfolios, reviews and secure transactions help customers book with confidence.",
  },
  {
    icon: FiStar,
    title: "Quality Matters",
    description:
      "We make it easier for customers to discover professionals whose work speaks for itself.",
  },
  {
    icon: FiHeart,
    title: "Support Local",
    description:
      "Every booking can help talented local professionals and their communities grow.",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 35,
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

const WhatWeStandFor = () => {
  return (
    <section className="bg-[#fffaf2] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

            <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
              What We Stand For
            </span>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight text-[#123b52] sm:text-4xl">
            Built around people, trust{" "}
            <span className="text-orange-500">
              and opportunity.
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <motion.article
                key={value.title}
                variants={card}
                whileHover={{
                  y: -8,
                  boxShadow:
                    "0 20px 45px rgba(18, 59, 82, 0.08)",
                }}
                className="group rounded-2xl border border-slate-100 bg-white p-6 transition-colors duration-300 hover:border-orange-200"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{
                    rotate: [0, -8, 8, 0],
                    scale: 1.08,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500"
                >
                  <Icon size={23} />
                </motion.div>

                <h3 className="mt-6 text-base font-bold text-[#123b52]">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {value.description}
                </p>

                {/* Animated line */}
                <motion.div
                  className="mt-6 h-1 rounded-full bg-orange-500"
                  initial={{ width: 28 }}
                  whileHover={{ width: 55 }}
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeStandFor;