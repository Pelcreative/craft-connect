import { motion } from "framer-motion";
import {
  FiSearch,
  FiCalendar,
  FiCreditCard,
  FiCheck,
} from "react-icons/fi";

const steps = [
  {
    number: "1",
    title: "Search",
    description: "Find the perfect artisan for your needs.",
    icon: FiSearch,
  },
  {
    number: "2",
    title: "Book",
    description: "Choose a date and book easily.",
    icon: FiCalendar,
  },
  {
    number: "3",
    title: "Pay",
    description: "Secure payment made simple.",
    icon: FiCreditCard,
  },
  {
    number: "4",
    title: "Enjoy",
    description: "Sit back and enjoy quality service.",
    icon: FiCheck,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center text-2xl font-bold text-[#07162e] sm:text-3xl"
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[65%] top-9 hidden w-[70%] border-t-2 border-dashed border-gray-300 md:block" />
                )}

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#fff1e8] text-[#f36b21]"
                >
                  <Icon size={30} strokeWidth={1.8} />
                </motion.div>

                {/* Content */}
                <div className="mt-5">
                  <h3 className="text-base font-bold text-[#172033]">
                    {step.number}. {step.title}
                  </h3>

                  <p className="mx-auto mt-2 max-w-[180px] text-xs leading-5 text-gray-500">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;