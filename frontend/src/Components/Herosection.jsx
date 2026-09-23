import {
  FiSearch,
  FiMapPin,
  FiGrid,
  FiChevronDown,
  FiShield,
  FiCreditCard,
  FiHeadphones,
  FiStar,
} from "react-icons/fi";

// import heroImage from "../../assets/images/hero-artisan.jpg";
import Tailorshop from "../assets/Tailorshop.png"

const Hero = () => {
  const popularSearches = [
    "Fashion Designer",
    "Baker",
    "Caterer",
    "Makeup Artist",
    "Photographer",
  ];

  const features = [
    {
      icon: <FiShield />,
      title: "Verified Artisans",
      text: "Trusted & reviewed",
    },
    {
      icon: <FiCreditCard />,
      title: "Secure Payments",
      text: "Safe & reliable",
    },
    {
      icon: <FiHeadphones />,
      title: "24/7 Support",
      text: "We're here to help",
    },
    {
      icon: <FiStar />,
      title: "Quality Guarantee",
      text: "Your satisfaction matters",
    },
  ];

  return (
    <section className="w-full overflow-hidden bg-[#fffaf6]">

      {/* =================================================
          HERO
      ================================================= */}
      <div className="relative">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-100/50 blur-3xl" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 md:py-16 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}
          <div className="relative z-10 w-full">

            {/* Label */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3.5 py-2 text-xs font-medium text-orange-500 shadow-sm sm:px-4 sm:text-sm">
              <span>✦</span>
              Handcrafted
              <span className="text-gray-300">•</span>
              Authentic
              <span className="text-gray-300">•</span>
              Local
            </div>

            {/* Heading */}
            <h1 className="max-w-2xl text-[42px] font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[64px]">
              Find Trusted
              <span className="block text-orange-500">
                Local Artisans
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-[15px] leading-6 text-slate-600 sm:text-base sm:leading-7 lg:text-lg">
              Book the best artisans for your events and projects
              with ease and confidence.
            </p>

            {/* =================================================
                SEARCH BOX
            ================================================= */}
            <div className="mt-7 w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-orange-100/30 sm:mt-8">

              {/* Search input */}
              <div className="flex min-h-[52px] items-center gap-3 border-b border-gray-100 px-3 sm:px-4 lg:border-b-0 lg:border-r">

                <FiSearch
                  size={20}
                  className="flex-shrink-0 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex">

                {/* Location */}
                <button className="flex min-h-[52px] items-center justify-between gap-3 border-b border-gray-100 px-3 text-left sm:border-r sm:px-4 lg:w-[175px] lg:border-b-0">
                  <div className="flex min-w-0 items-center gap-2">
                    <FiMapPin
                      size={18}
                      className="flex-shrink-0 text-slate-400"
                    />

                    <span className="truncate text-sm text-slate-700">
                      All Locations
                    </span>
                  </div>

                  <FiChevronDown
                    size={15}
                    className="flex-shrink-0 text-slate-500"
                  />
                </button>

                {/* Category */}
                <button className="flex min-h-[52px] items-center justify-between gap-3 border-b border-gray-100 px-3 text-left sm:px-4 lg:w-[175px] lg:border-b-0">
                  <div className="flex min-w-0 items-center gap-2">
                    <FiGrid
                      size={18}
                      className="flex-shrink-0 text-slate-400"
                    />

                    <span className="truncate text-sm text-slate-700">
                      All Categories
                    </span>
                  </div>

                  <FiChevronDown
                    size={15}
                    className="flex-shrink-0 text-slate-500"
                  />
                </button>

                {/* Search button */}
                <button className="mt-2 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 text-sm font-semibold text-white transition hover:bg-orange-600 sm:col-span-2 lg:mt-0 lg:w-auto lg:flex-1">
                  <FiSearch size={18} />
                  Search
                </button>
              </div>
            </div>

            {/* =================================================
                POPULAR SEARCHES
            ================================================= */}
            <div className="mt-5 flex flex-wrap items-center gap-2">

              <span className="mr-1 text-xs font-semibold text-slate-700 sm:text-sm">
                Popular Searches:
              </span>

              {popularSearches.map((search) => (
                <button
                  key={search}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-500 sm:text-xs"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* =================================================
              HERO IMAGE
          ================================================= */}
          <div className="relative mx-auto mt-2 w-full max-w-[620px] lg:mt-0 lg:max-w-none">

            <div className="relative h-[330px] overflow-hidden rounded-[24px] sm:h-[400px] sm:rounded-[28px] md:h-[450px] lg:h-[500px] lg:rounded-[32px]">

              <img
                src={Tailorshop}
                alt="Fashion designer working on clothing"
                className="h-full w-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

              {/* =================================================
                  SUPPORT BADGE
              ================================================= */}
              <div className="absolute right-3 top-3 rounded-xl bg-white/95 px-3 py-3 shadow-lg backdrop-blur-sm sm:right-5 sm:top-5 sm:rounded-2xl sm:px-5 sm:py-4">

                <p className="font-serif text-base italic text-slate-800 sm:text-xl">
                  Support
                </p>

                <p className="font-serif text-base italic text-orange-500 sm:text-xl">
                  Local Talent
                </p>

                <div className="mt-1 h-[2px] w-16 bg-orange-500 sm:w-24" />
              </div>

              {/* =================================================
                  CLIENT BADGE
              ================================================= */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 shadow-xl sm:bottom-6 sm:left-6 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3">

                <div className="flex -space-x-2">
                  <div className="h-7 w-7 rounded-full border-2 border-white bg-slate-300 sm:h-9 sm:w-9" />
                  <div className="h-7 w-7 rounded-full border-2 border-white bg-orange-200 sm:h-9 sm:w-9" />
                  <div className="h-7 w-7 rounded-full border-2 border-white bg-slate-500 sm:h-9 sm:w-9" />
                </div>

                <div>
                  <p className="text-base font-bold text-slate-900 sm:text-lg">
                    10K+
                  </p>

                  <p className="text-[9px] text-slate-500 sm:text-[11px]">
                    Happy and Satisfied Clients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          TRUST FEATURES
      ================================================= */}
      <div className="border-t border-gray-100 bg-white">

        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 py-4 sm:px-6 sm:py-5 lg:grid-cols-4 lg:px-8">

          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex items-center gap-3 px-2 py-4 sm:gap-4 sm:px-4 lg:px-5 ${
                index >= 2
                  ? "border-t border-gray-100 lg:border-t-0"
                  : ""
              } ${
                index % 2 === 1
                  ? "border-l border-gray-100"
                  : ""
              } ${
                index !== 0
                  ? "lg:border-l lg:border-gray-100"
                  : ""
              }`}
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500 sm:h-12 sm:w-12">
                {feature.icon}
              </div>

              <div className="min-w-0">
                <h3 className="text-xs font-bold text-slate-900 sm:text-sm">
                  {feature.title}
                </h3>

                <p className="mt-1 hidden text-xs text-slate-500 sm:block">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Hero;