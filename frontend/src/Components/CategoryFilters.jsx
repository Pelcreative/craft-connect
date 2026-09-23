import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiMapPin,
  FiSliders,
  FiChevronDown,
} from "react-icons/fi";

const CategoryFilters = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSearch) {
      onSearch(search);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 mx-auto -mt-7 max-w-6xl px-4 sm:px-6"
    >
      <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-lg sm:p-4">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.6fr_0.65fr_0.65fr]">
          {/* Search */}
          <form
            onSubmit={handleSubmit}
            className="flex h-14 items-center rounded-xl border border-gray-200 bg-white px-4 transition focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100"
          >
            <FiSearch
              size={20}
              className="mr-3 shrink-0 text-gray-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a category or service..."
              className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
          </form>

          {/* Location */}
          <div className="relative">
            <FiMapPin
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <select
              className="h-14 w-full appearance-none rounded-xl border border-gray-200 bg-white pl-11 pr-10 text-sm text-gray-700 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              defaultValue=""
            >
              <option value="">All Locations</option>
              <option value="lagos">Lagos</option>
              <option value="ibadan">Ibadan</option>
              <option value="abuja">Abuja</option>
              <option value="port-harcourt">
                Port Harcourt
              </option>
            </select>

            <FiChevronDown
              size={17}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <FiSliders
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <select
              className="h-14 w-full appearance-none rounded-xl border border-gray-200 bg-white pl-11 pr-10 text-sm text-gray-700 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              defaultValue="popular"
            >
              <option value="popular">Sort by Popular</option>
              <option value="name">Sort by Name</option>
              <option value="artisans">Most Artisans</option>
              <option value="newest">Newest</option>
            </select>

            <FiChevronDown
              size={17}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CategoryFilters;