import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiArrowRight } from "react-icons/fi";

const NewsletterBanner = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubmitted(true);
    setEmail("");

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-10"
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#111d32] px-5 py-6 sm:px-8 lg:px-10">
        {/* Background dots */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute right-10 top-4 h-2 w-2 rounded-full bg-white shadow-[20px_15px_0_white,40px_2px_0_white,60px_25px_0_white,80px_8px_0_white]" />
        </div>

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Content */}
          <div className="flex items-center gap-4">
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange-500"
            >
              <FiMail
                size={25}
                className="text-white"
              />
            </motion.div>

            <div>
              <h2 className="text-base font-bold text-white sm:text-lg">
                Stay updated with the best artisans and offers
              </h2>

              <p className="mt-1 text-xs text-gray-300 sm:text-sm">
                Subscribe to our newsletter and never miss out.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-xl"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              className="h-12 min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-orange-300"
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              {submitted ? "Subscribed!" : "Subscribe"}

              {!submitted && <FiArrowRight size={17} />}
            </motion.button>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default NewsletterBanner;