import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";

function DashboardNavbar({ setIsOpen }) {
  const reduceMotion = useReducedMotion();

  const tapAnimation = reduceMotion
    ? {}
    : { whileTap: { scale: 0.97 } };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white">
      <div className="flex h-[70px] min-w-0 items-center gap-2 px-3 sm:h-[78px] sm:gap-4 sm:px-5 lg:px-8">

        {/* Mobile Menu */}
        <motion.button
          {...tapAnimation}
          type="button"
          onClick={() => setIsOpen?.(true)}
          aria-label="Open navigation menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-500 md:hidden"
        >
          <Menu size={21} />
        </motion.button>

        {/* Search */}
        <div className="relative min-w-0 max-w-[540px] flex-1">
          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 sm:left-4"
          />

          <input
            type="search"
            aria-label="Search vendors and services"
            placeholder="Search vendors, services..."
            className="h-10 w-full min-w-0 rounded-xl border border-slate-200 bg-white pl-9 pr-2 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 sm:h-11 sm:pl-11 sm:pr-4 sm:text-sm"
          />
        </div>

        {/* Right Side */}
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-4">

          {/* Notifications */}
          <motion.button
            {...tapAnimation}
            type="button"
            aria-label="Notifications, 2 unread"
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 sm:h-10 sm:w-10"
          >
            <Bell size={20} />

            <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold text-white">
              2
            </span>
          </motion.button>

          {/* Profile */}
          <button
            type="button"
            aria-label="Customer profile"
            className="flex min-w-0 max-w-[155px] items-center gap-2 rounded-xl p-1 transition-colors hover:bg-slate-50 sm:max-w-[230px] sm:gap-3"
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=70"
              alt=""
              width="40"
              height="40"
              decoding="async"
              className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
            />

            <div className="hidden min-w-0 flex-1 text-left sm:block">
              <p className="truncate text-sm font-semibold text-[#09234a]">
                Adaeze Okafor
              </p>

              <p className="truncate text-xs text-slate-500">
                Customer
              </p>
            </div>

            <ChevronDown
              size={16}
              aria-hidden="true"
              className="hidden shrink-0 text-[#09234a] sm:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default memo(DashboardNavbar);