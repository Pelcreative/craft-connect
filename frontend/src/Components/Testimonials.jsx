import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "Funmi A.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    review:
      "CraftConnect helped me find the best cake maker for my wedding. The cake was beyond amazing!",
  },
  {
    name: "Tunde O.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    review:
      "I love how easy it is to book trusted artisans. Highly recommended!",
  },
  {
    name: "Bisi K.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
    review:
      "Professional service and excellent customer support. I will definitely use CraftConnect again.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-7 flex items-center justify-between"
        >
          <h2 className="text-2xl font-bold text-[#07162e] sm:text-3xl">
            What Our Clients Say
          </h2>

          <button className="hidden text-sm font-semibold text-[#f36b21] sm:block">
            View all reviews →
          </button>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              whileHover={{ y: -5 }}
              className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar
                        key={star}
                        size={13}
                        className="fill-[#f36b21] text-[#f36b21]"
                      />
                    ))}
                  </div>

                  <p className="mt-1 text-sm font-bold text-[#172033]">
                    {testimonial.name}
                  </p>
                </div>
              </div>

              <p className="mt-4 pr-5 text-sm leading-6 text-gray-600">
                "{testimonial.review}"
              </p>

              <span className="absolute bottom-3 right-5 text-4xl font-bold text-orange-200">
                ”
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;