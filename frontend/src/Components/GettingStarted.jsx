import { motion } from "framer-motion";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Create your vendor account",
    description: "Sign up and set up your professional account.",
  },
  {
    number: "02",
    title: "Complete your business profile",
    description: "Add your business information and profile details.",
  },
  {
    number: "03",
    title: "Add your services and portfolio",
    description: "Show customers what you can do and what you offer.",
  },
  {
    number: "04",
    title: "Start receiving customer requests",
    description: "Connect with customers and start growing your business.",
  },
];

const GettingStarted = () => {
  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#103b53]">

        <div className="relative px-5 py-12 sm:px-8 md:py-16 lg:px-12">

          {/* Decorative circles */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full border border-white/10"
          />

          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full border border-white/5"
          />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-400">
              Getting Started
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Start your CraftConnect journey.
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-white/60">
              It is simple, fast and free to get started.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="relative z-10 mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -5,
                }}
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition hover:border-orange-400/50 hover:bg-white/[0.06]"
              >
                {/* Number */}
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                    {step.number}
                  </span>

                  <FiCheck
                    className="text-white/20 transition group-hover:text-orange-400"
                    size={18}
                  />
                </div>

                <h3 className="text-sm font-bold leading-5 text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-white/50">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.4,
            }}
            className="relative z-10 mt-10 flex justify-center"
          >
            <Link
              to="/register"
              className="group flex items-center gap-3 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-orange-400"
            >
              Become a Vendor

              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default GettingStarted;