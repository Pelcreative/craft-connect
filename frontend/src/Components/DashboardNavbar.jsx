import { motion } from "framer-motion";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";

export default function DashboardNavbar({
  setIsOpen,
}) {
  return (
    <header className="
      sticky top-0 z-30
      border-b border-slate-200/80
      bg-white/90
      backdrop-blur-xl
    ">
      <div className="
        flex h-[78px]
        items-center
        gap-3
        px-4
        sm:gap-5
        sm:px-6
        lg:px-8
      ">

        {/* =====================================
            MOBILE MENU
        ===================================== */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="
            flex h-10 w-10
            shrink-0
            items-center justify-center
            rounded-xl
            bg-slate-100
            text-slate-700
            transition
            hover:bg-orange-50
            hover:text-orange-500
            lg:hidden
          "
        >
          <Menu size={21} />
        </motion.button>

        {/* =====================================
            SEARCH
        ===================================== */}
        <div className="
          relative
          max-w-[540px]
          flex-1
        ">
          <Search
            size={19}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="
              Search for vendors, services, or crafts...
            "
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              pl-11
              pr-4
              text-sm
              text-slate-700
              outline-none
              transition

              placeholder:text-slate-400

              focus:border-orange-400
              focus:ring-4
              focus:ring-orange-500/10
            "
          />
        </div>

        {/* =====================================
            RIGHT SIDE
        ===================================== */}
        <div className="
          ml-auto
          flex
          items-center
          gap-2
          sm:gap-5
        ">

          {/* Notification */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              relative
              flex h-10 w-10
              items-center justify-center
              rounded-full
              text-slate-700
              transition
              hover:bg-slate-100
            "
          >
            <Bell size={21} />

            <span className="
              absolute
              right-0.5
              top-0
              flex h-4 min-w-4
              items-center
              justify-center
              rounded-full
              bg-orange-500
              px-1
              text-[9px]
              font-bold
              text-white
            ">
              2
            </span>
          </motion.button>

          {/* ===================================
              USER PROFILE
          =================================== */}
          <button className="
            flex
            items-center
            gap-2
            rounded-xl
            p-1
            transition
            hover:bg-slate-50
            sm:gap-3
          ">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
              alt="Adaeze Okafor"
              className="
                h-10 w-10
                rounded-full
                object-cover
              "
            />

            <div className="hidden text-left sm:block">
              <p className="
                text-sm
                font-semibold
                text-[#09234a]
              ">
                Adaeze Okafor
              </p>

              <p className="
                text-xs
                text-slate-500
              ">
                Customer
              </p>
            </div>

            <ChevronDown
              size={17}
              className="
                hidden
                text-[#09234a]
                sm:block
              "
            />
          </button>
        </div>
      </div>
    </header>
  );
}