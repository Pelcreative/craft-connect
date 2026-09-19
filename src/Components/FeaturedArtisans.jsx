import { motion } from "framer-motion";
import { FiArrowRight, FiMapPin, FiStar } from "react-icons/fi";

import artisan1 from "../assets/artisan1.png";
import artisan2 from "../assets/artisan2.png";
import artisan3 from "../assets/artisan3.png";
import artisan4 from "../assets/artisan4.png";
import artisan5 from "../assets/artisan5.png";
import artisan6 from "../assets/artisan6.png";

const artisans = [
  {
    name: "Stitches by Dami",
    category: "Fashion Designer",
    location: "Lagos, Nigeria",
    rating: "4.8",
    reviews: "120",
    image: artisan1,
  },
  {
    name: "Sweet Delights",
    category: "Cake Maker",
    location: "Abuja, Nigeria",
    rating: "4.9",
    reviews: "95",
    image: artisan2,
  },
  {
    name: "Tasty Bites Catering",
    category: "Caterer",
    location: "Ibadan, Nigeria",
    rating: "4.7",
    reviews: "80",
    image: artisan3,
  },
  {
    name: "Glam by Zee",
    category: "Makeup Artist",
    location: "Port Harcourt, Nigeria",
    rating: "4.8",
    reviews: "110",
    image: artisan4,
  },
  {
    name: "Royal Events",
    category: "Event Decorator",
    location: "Lagos, Nigeria",
    rating: "4.8",
    reviews: "70",
    image: artisan5,
  },
  {
    name: "Capture Moments",
    category: "Photographer",
    location: "Benin City, Nigeria",
    rating: "4.9",
    reviews: "60",
    image: artisan6,
  },
];

const FeaturedArtisans = () => {
  return (
    <section className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-7 flex items-center justify-between"
        >
          <h2 className="text-2xl font-bold text-[#07162e] sm:text-3xl">
            Featured Artisans
          </h2>

          <button className="group hidden items-center gap-2 text-sm font-semibold text-[#f36b21] sm:flex">
            View all artisans
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {artisans.map((artisan, index) => (
            <motion.article
              key={artisan.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.2 },
              }}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden sm:h-52 lg:h-32 xl:h-28">
                <img
                  src={artisan.image}
                  alt={artisan.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="truncate text-sm font-bold text-[#172033]">
                  {artisan.name}
                </h3>

                <p className="mt-1 truncate text-xs text-gray-500">
                  {artisan.category}
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                  <FiMapPin className="shrink-0 text-[#f36b21]" />
                  <span className="truncate">{artisan.location}</span>
                </div>

                <div className="mt-2 flex items-center gap-1">
                  <FiStar className="fill-[#f9a825] text-[#f9a825]" size={13} />

                  <span className="text-xs font-semibold text-gray-700">
                    {artisan.rating}
                  </span>

                  <span className="text-xs text-gray-400">
                    ({artisan.reviews})
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile */}
        <div className="mt-7 flex justify-center sm:hidden">
          <button className="flex items-center gap-2 text-sm font-semibold text-[#f36b21]">
            View all artisans
            <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtisans;