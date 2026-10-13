import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiCamera,
  FiGrid,
  FiScissors,
  FiTool,
  FiVideo,
  FiZap,
} from "react-icons/fi";
import {
  GiBroom,
  GiCakeSlice,
  GiChefToque,
  GiClothes,
  GiHairStrands,
  GiHammerNails,
  GiLipstick,
  GiOfficeChair,
  GiSewingMachine,
} from "react-icons/gi";
import { getCategories } from "../api/directory";

const categoryVisuals = {
  "fashion-designers": { icon: GiClothes, bg: "bg-red-50" },
  "cake-makers": { icon: GiCakeSlice, bg: "bg-orange-50" },
  caterers: { icon: GiChefToque, bg: "bg-yellow-50" },
  "makeup-artists": { icon: GiLipstick, bg: "bg-pink-50" },
  photographers: { icon: FiCamera, bg: "bg-blue-50" },
  "event-decorators": { icon: FiGrid, bg: "bg-teal-50" },
  tailors: { icon: GiSewingMachine, bg: "bg-purple-50" },
  "furniture-makers": { icon: GiOfficeChair, bg: "bg-amber-50" },
  carpenters: { icon: GiHammerNails, bg: "bg-blue-50" },
  electricians: { icon: FiZap, bg: "bg-teal-50" },
  plumbers: { icon: FiTool, bg: "bg-red-50" },
  barbers: { icon: FiScissors, bg: "bg-purple-50" },
  "hair-stylists": { icon: GiHairStrands, bg: "bg-pink-50" },
  videographers: { icon: FiVideo, bg: "bg-green-50" },
  "cleaning-services": { icon: GiBroom, bg: "bg-yellow-50" },
};

const defaultVisual = { icon: FiGrid, bg: "bg-gray-100" };

const CategoryGrid = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((requestError) => setError(requestError.message));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
      {error && <p className="text-center text-red-600">{error}</p>}

      {!error && categories.length === 0 && (
        <p className="text-center text-gray-500">No service categories are available yet.</p>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8"
      >
        {categories.map((category) => {
          const visual = categoryVisuals[category.slug] || defaultVisual;
          const Icon = visual.icon;

          return (
            <motion.button
              key={category.id}
              type="button"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ y: -7, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={() => onCategoryClick?.(category)}
              className="group flex min-h-[155px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${visual.bg} transition-transform duration-300 group-hover:scale-110`}>
                <Icon size={30} className="text-gray-900" />
              </div>
              <h3 className="text-sm font-semibold leading-5 text-gray-900">{category.name}</h3>
              {category.description && (
                <p className="mt-1 text-xs text-gray-500">{category.description}</p>
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </section>
  );
};

export default CategoryGrid;
