import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";

const Newsletter = () => {
  return (
    <section className="bg-[#fff0e5] py-7 sm:py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 sm:px-8 lg:flex-row lg:justify-between">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f36b21] text-white">
            <FiSend size={25} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#172033]">
              Stay Updated
            </h3>

            <p className="max-w-sm text-xs leading-5 text-gray-600">
              Subscribe to our newsletter for tips, offers and updates.
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="h-11 flex-1 rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-[#f36b21] focus:ring-2 focus:ring-orange-100"
          />

          <button
            type="submit"
            className="h-11 rounded-lg bg-[#f36b21] px-7 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#df5b15] hover:shadow-lg active:scale-95"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Newsletter;