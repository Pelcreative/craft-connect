import { motion } from "framer-motion";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";

const RequestBanner = ({ onRequest }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"
    >
      <div className="overflow-hidden rounded-2xl border border-orange-100 bg-[#fff5ed]">
        <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 lg:px-10">
          {/* Left */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-gray-900 bg-orange-500"
            >
              <FiShoppingBag
                size={25}
                className="text-white"
              />
            </motion.div>

            <div>
              <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                Can't find what you're looking for?
              </h2>

              <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                Tell us what you need and we'll help you
                find the right artisan.
              </p>
            </div>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onRequest}
            className="flex items-center justify-center gap-3 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-orange-600"
          >
            Post a Request

            <FiArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default RequestBanner;