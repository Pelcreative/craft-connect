import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiMapPin, FiStar } from "react-icons/fi";

import { getFeaturedArtisans } from "../api/directory.js";
import fallbackImage from "../assets/artisan1.png";

const FeaturedArtisans = () => {
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getFeaturedArtisans()
      .then((data) => {
        if (isMounted) setArtisans(data);
      })
      .catch((requestError) => {
        if (isMounted) setError(requestError.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
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

        {error && (
          <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
        )}

        {!error && artisans.length === 0 && (
          <p className="text-sm text-gray-500">
            No artisan profiles are available yet.
          </p>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {artisans.map((artisan, index) => (
            <motion.article
              key={artisan.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden sm:h-52 lg:h-32 xl:h-28">
                <img
                  src={artisan.profileImageUrl || fallbackImage}
                  alt={artisan.businessName}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-3">
                <h3 className="truncate text-sm font-bold text-[#172033]">
                  {artisan.businessName}
                </h3>

                <p className="mt-1 truncate text-xs text-gray-500">
                  {artisan.categories[0]?.name || "Artisan"}
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                  <FiMapPin className="shrink-0 text-[#f36b21]" />
                  <span className="truncate">
                    {artisan.city}
                    {artisan.state ? `, ${artisan.state}` : ""}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-1">
                  <FiStar
                    className="fill-[#f9a825] text-[#f9a825]"
                    size={13}
                  />

                  <span className="text-xs font-semibold text-gray-700">
                    {artisan.averageRating.toFixed(1)}
                  </span>

                  <span className="text-xs text-gray-400">
                    ({artisan.reviewCount})
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtisans;