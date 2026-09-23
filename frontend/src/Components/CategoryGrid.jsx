import { motion } from "framer-motion";
import {
  FiCamera,
  FiScissors,
  FiTool,
  FiZap,
  FiVideo,
  FiGrid,
} from "react-icons/fi";

import {
  GiClothes,
  GiCakeSlice,
  GiChefToque,
  GiLipstick,
  GiBroom,
  GiHairStrands,
  GiSewingMachine,
  GiOfficeChair,
  GiHammerNails,
} from "react-icons/gi";

const categories = [
  {
    name: "Fashion Designers",
    count: "1,248 artisans",
    icon: GiClothes,
    bg: "bg-red-50",
  },
  {
    name: "Cake Makers",
    count: "856 artisans",
    icon: GiCakeSlice,
    bg: "bg-orange-50",
  },
  {
    name: "Caterers",
    count: "1,367 artisans",
    icon: GiChefToque,
    bg: "bg-yellow-50",
  },
  {
    name: "Makeup Artists",
    count: "912 artisans",
    icon: GiLipstick,
    bg: "bg-pink-50",
  },
  {
    name: "Photographers",
    count: "1,098 artisans",
    icon: FiCamera,
    bg: "bg-blue-50",
  },
  {
    name: "Event Decorators",
    count: "743 artisans",
    icon: FiGrid,
    bg: "bg-teal-50",
  },
  {
    name: "Tailors",
    count: "1,102 artisans",
    icon: GiSewingMachine,
    bg: "bg-purple-50",
  },
  {
    name: "Furniture Makers",
    count: "612 artisans",
    icon: GiOfficeChair,
    bg: "bg-amber-50",
  },
  {
    name: "Carpenters",
    count: "1,453 artisans",
    icon: GiHammerNails,
    bg: "bg-blue-50",
  },
  {
    name: "Electricians",
    count: "892 artisans",
    icon: FiZap,
    bg: "bg-teal-50",
  },
  {
    name: "Plumbers",
    count: "678 artisans",
    icon: FiTool,
    bg: "bg-red-50",
  },
  {
    name: "Barbers",
    count: "1,223 artisans",
    icon: FiScissors,
    bg: "bg-purple-50",
  },
  {
    name: "Hair Stylists",
    count: "884 artisans",
    icon: GiHairStrands,
    bg: "bg-pink-50",
  },
  {
    name: "Videographers",
    count: "576 artisans",
    icon: FiVideo,
    bg: "bg-green-50",
  },
  {
    name: "Cleaning Services",
    count: "1,034 artisans",
    icon: GiBroom,
    bg: "bg-yellow-50",
  },
  {
    name: "More",
    count: "Explore more",
    icon: FiGrid,
    bg: "bg-gray-100",
  },
];

const CategoryGrid = ({ onCategoryClick }) => {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.06,
            },
          },
        }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8"
      >
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <motion.button
              key={category.name}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                  scale: 0.96,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                },
              }}
              whileHover={{
                y: -7,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              onClick={() =>
                onCategoryClick?.(category)
              }
              className="group flex min-h-[155px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-xl"
            >
              {/* Icon */}
              <div
                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${category.bg} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon
                  size={30}
                  className="text-gray-900"
                />
              </div>

              {/* Name */}
              <h3 className="text-sm font-semibold leading-5 text-gray-900">
                {category.name}
              </h3>

              {/* Count */}
              <p className="mt-1 text-xs text-gray-500">
                {category.count}
              </p>
            </motion.button>
          );
        })}
      </motion.div>
    </section>
  );
};

export default CategoryGrid;