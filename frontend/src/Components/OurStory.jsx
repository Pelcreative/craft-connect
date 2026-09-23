import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

import Story from "../assets/artisan4.png";

const OurStory = () => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_1.45fr]">
          
          {/* IMAGE */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative min-h-[350px] overflow-hidden rounded-2xl sm:min-h-[450px] lg:min-h-full"
          >
            <motion.img
              src={Story}
              alt="Craft professional working"
              className="absolute inset-0 h-full w-full object-cover"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6 }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#123b52]/20 to-transparent" />
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
            className="grid gap-5 sm:grid-cols-[1fr_0.7fr]"
          >
            {/* Story */}
            <div className="rounded-2xl border border-slate-100 bg-[#fffaf2] p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

                <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
                  Our Story
                </span>
              </div>

              <h2 className="text-2xl font-extrabold leading-tight text-[#123b52]">
                Making local services easier to discover.
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-6 text-slate-500">
                <p>
                  Finding a good fashion designer, cake maker, caterer,
                  photographer or other skilled professional should not
                  require endless searching through social media and
                  personal recommendations.
                </p>

                <p>
                  CraftConnect brings these professionals into one
                  organised marketplace where customers can discover
                  their work, compare services, make bookings and
                  communicate directly.
                </p>

                <p>
                  At the same time, artisans get the tools they need
                  to present their work professionally and reach more
                  customers.
                </p>
              </div>

              <motion.div
                whileHover={{ x: 5 }}
                className="mt-6 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-orange-500"
              >
                Discover our story
                <FiArrowUpRight />
              </motion.div>
            </div>

            {/* Mission */}
            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl bg-[#fffaf2] p-6 sm:p-8"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                <FiArrowUpRight size={20} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#123b52]">
                Our Mission
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Give skilled people a better way to be discovered,
                booked and trusted.
              </p>

              <p className="mt-4 text-xs leading-5 text-slate-400">
                We believe talented local professionals deserve
                visibility and growth opportunities. CraftConnect
                is built to create a simple bridge between people
                who need great work and the professionals ready
                to deliver it.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;