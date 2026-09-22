import { motion } from "framer-motion";
import { FiArrowRight, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";



const AboutCTA = () => {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.97,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.7,
        }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#123b52] px-6 py-12 text-center sm:px-10 lg:px-16 lg:py-16"
      >
        {/* Decorative circle */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10"
        />

        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white"
        >
          <FiUsers size={25} />
        </motion.div>

        <div className="relative z-10 mx-auto mt-6 max-w-2xl">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to discover something great?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/60">
            Explore talented professionals around you or join
            CraftConnect and start showcasing your skills.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/artisans"
              className="group flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-400"
            >
              Explore Artisans
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/register"
              className="rounded-lg border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Become a Vendor
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutCTA;