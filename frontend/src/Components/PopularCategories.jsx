import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCamera,
  FiMoreHorizontal,
} from "react-icons/fi";
import {
  GiClothes,
  GiCakeSlice,
  GiMeal,
  GiLipstick,
  GiSewingMachine,
  GiPartyHat,
} from "react-icons/gi";

const categories = [
  {
    name: "Fashion Designers",
    icon: GiClothes,
    bg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    name: "Cake Makers",
    icon: GiCakeSlice,
    bg: "bg-green-50",
    iconColor: "text-orange-500",
  },
  {
    name: "Caterers",
    icon: GiMeal,
    bg: "bg-orange-50",
    iconColor: "text-yellow-600",
  },
  {
    name: "Makeup Artists",
    icon: GiLipstick,
    bg: "bg-pink-50",
    iconColor: "text-pink-500",
  },
  {
    name: "Photographers",
    icon: FiCamera,
    bg: "bg-blue-50",
    iconColor: "text-slate-800",
  },
  {
    name: "Decorators",
    icon: GiPartyHat,
    bg: "bg-cyan-50",
    iconColor: "text-pink-500",
  },
  {
    name: "Tailors",
    icon: GiSewingMachine,
    bg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    name: "More",
    icon: FiMoreHorizontal,
    bg: "bg-gray-50",
    iconColor: "text-slate-800",
  },
];

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
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const PopularCategories = () => {
  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center justify-between"
        >
          <h2 className="text-2xl font-bold text-[#07162e] sm:text-3xl">
            Popular Categories
          </h2>

          <button className="group hidden items-center gap-2 text-sm font-semibold text-[#f36b21] sm:flex">
            View all categories
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-8"
        >
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.name}
                variants={itemVariants}
                whileHover={{
                  y: -7,
                  transition: { duration: 0.2 },
                }}
                className="group cursor-pointer text-center"
              >
                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-xl ${category.bg} transition-all duration-300 group-hover:shadow-md sm:h-24 sm:w-24`}
                >
                  <Icon
                    className={`text-4xl ${category.iconColor} transition-transform duration-300 group-hover:scale-110`}
                  />
                </div>

                <p className="mx-auto mt-3 max-w-[110px] text-xs font-semibold leading-4 text-[#172033] sm:text-sm">
                  {category.name}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile link */}
        <div className="mt-7 flex justify-center sm:hidden">
          <button className="flex items-center gap-2 text-sm font-semibold text-[#f36b21]">
            View all categories
            <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;