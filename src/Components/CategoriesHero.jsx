import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

const CategoriesHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#fff8f2]">
      {/* Decorative circles */}
      <motion.div
        className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-[#f3dcc8]/50"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute right-[35%] top-20 h-40 w-40 rounded-full bg-[#ffe4d2]/70"
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto flex min-h-[260px] max-w-7xl items-center px-5 py-12 sm:px-8 lg:px-10">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-xl"
        >
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
            <span>Home</span>

            <FiChevronRight size={15} />

            <span className="font-medium text-orange-600">
              Categories
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl font-bold tracking-tight text-[#14213d] sm:text-5xl"
          >
            All Categories
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 max-w-lg text-sm leading-6 text-orange-600 sm:text-base"
          >
            Discover and connect with skilled artisans for all
            your needs. Choose a category to get started.
          </motion.p>
        </motion.div>

        {/* Decorative image */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="absolute right-0 bottom-0 hidden h-full w-[48%] lg:block"
        >
          <img
            src="/images/categories-hero.jpg"
            alt="CraftConnect categories"
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#fff8f2] via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};
    
export default CategoriesHero;