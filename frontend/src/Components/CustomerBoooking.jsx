import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  CalendarDays,
  MapPin,
  MoreVertical,
  ArrowLeft,
  Star,
  MessageSquare,
  Phone,
  Trash2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

/* =====================================================
   BOOKING DATA
===================================================== */

const bookings = [
  {
    id: 1,
    title: "Custom Ankara Dress",
    vendor: "Zainab's Fashion Hub",
    date: "May 28, 2025",
    time: "10:00 AM",
    location: "Lagos, Nigeria",
    price: "₦25,000",
    status: "Confirmed",
    rating: "4.8",
    reviews: "124 reviews",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Birthday Cake (2kg)",
    vendor: "Sweet Delights",
    date: "May 30, 2025",
    time: "2:00 PM",
    location: "Lekki, Lagos",
    price: "₦18,000",
    status: "Pending",
    rating: "4.9",
    reviews: "87 reviews",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Portrait Painting",
    vendor: "Art by Tolu",
    date: "June 2, 2025",
    time: "11:00 AM",
    location: "Victoria Island, Lagos",
    price: "₦40,000",
    status: "Confirmed",
    rating: "4.7",
    reviews: "63 reviews",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988f2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Home Decor Consultation",
    vendor: "Design by Chioma",
    date: "June 5, 2025",
    time: "3:00 PM",
    location: "Ikeja, Lagos",
    price: "₦15,000",
    status: "Completed",
    rating: "4.9",
    reviews: "42 reviews",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "Men's Suit Alteration",
    vendor: "Classic Tailors",
    date: "June 10, 2025",
    time: "9:00 AM",
    location: "Yaba, Lagos",
    price: "₦12,000",
    status: "Cancelled",
    rating: "4.6",
    reviews: "38 reviews",
    image:
      "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    title: "Braids Hairstyle",
    vendor: "Glamour Hair Studio",
    date: "June 12, 2025",
    time: "11:00 AM",
    location: "Surulere, Lagos",
    price: "₦8,000",
    status: "Completed",
    rating: "4.8",
    reviews: "91 reviews",
    image:
      "https://images.unsplash.com/photo-1605497788044-5a4d783b9239?auto=format&fit=crop&w=900&q=80",
  },
];

/* =====================================================
   TABS
===================================================== */

const tabs = [
  { label: "All Bookings", value: "All" },
  { label: "Confirmed", value: "Confirmed" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

/* =====================================================
   STATUS COLORS
===================================================== */

const statusColors = {
  Confirmed: {
    background: "#e2f8ed",
    color: "#07945b",
  },

  Pending: {
    background: "#fff0df",
    color: "#f47717",
  },

  Completed: {
    background: "#e5f1ff",
    color: "#1675dd",
  },

  Cancelled: {
    background: "#ffe8e8",
    color: "#ef4444",
  },
};

/* =====================================================
   MAIN COMPONENT
===================================================== */

function CustomerBooking() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(bookings[0]);

  /* Filter bookings without useMemo */
  const filteredBookings = bookings.filter((booking) => {
    const matchesTab =
      activeTab === "All" || booking.status === activeTab;

    const searchText = search.toLowerCase();

    const matchesSearch =
      booking.title.toLowerCase().includes(searchText) ||
      booking.vendor.toLowerCase().includes(searchText) ||
      booking.location.toLowerCase().includes(searchText);

    return matchesTab && matchesSearch;
  });

  /* Count bookings */
  const getBookingCount = (status) => {
    if (status === "All") {
      return bookings.length;
    }

    return bookings.filter(
      (booking) => booking.status === status
    ).length;
  };

  return (
    <>
      <div className="customer-booking">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <motion.div
          className="booking-heading"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h1>My Bookings</h1>

            <p>
              View and manage all your bookings in one place.
            </p>
          </div>

          <div className="booking-decoration">
            <span className="orange-circle"></span>

            <div className="decoration-content">
              <Sparkles size={24} />

              <div>
                <strong>Great things</strong>
                <span>are booked here</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="booking-layout">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <section className="booking-section">

            {/* TABS + SEARCH */}

            <div className="booking-toolbar">

              <div className="booking-tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    className={
                      activeTab === tab.value
                        ? "booking-tab active"
                        : "booking-tab"
                    }
                    onClick={() => setActiveTab(tab.value)}
                  >
                    {tab.label} ({getBookingCount(tab.value)})
                  </button>
                ))}
              </div>

              <div className="booking-tools">

                <div className="booking-search">
                  <Search size={17} />

                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                  />
                </div>

                <button className="filter-button">
                  <SlidersHorizontal size={16} />
                  <span>Filter</span>
                </button>

              </div>
            </div>

            {/* BOOKING LIST */}

            <div className="booking-list">

              <AnimatePresence>
                {filteredBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    selected={
                      selectedBooking.id === booking.id
                    }
                    onSelect={() =>
                      setSelectedBooking(booking)
                    }
                  />
                ))}
              </AnimatePresence>

              {filteredBookings.length === 0 && (
                <div className="empty-state">
                  <Search size={35} />

                  <h3>No bookings found</h3>

                  <p>
                    Try another search or category.
                  </p>
                </div>
              )}

            </div>
          </section>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <AnimatePresence mode="wait">

            <BookingDetails
              key={selectedBooking.id}
              booking={selectedBooking}
            />

          </AnimatePresence>

        </div>
      </div>

      {/* =====================================================
          ALL CSS IS HERE
      ===================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .customer-booking {
          width: 100%;
          min-height: 100%;
          padding: 30px 35px 45px;
          background: #f7f9fc;
          color: #102a43;
          font-family: Inter, Arial, sans-serif;
        }

        /* =================================================
           HEADER
        ================================================= */

        .booking-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .booking-heading h1 {
          margin: 0 0 6px;
          color: #102a43;
          font-size: 29px;
          font-weight: 750;
          letter-spacing: -0.6px;
        }

        .booking-heading p {
          margin: 0;
          color: #5e7691;
          font-size: 14px;
        }

        .booking-decoration {
          position: relative;
          min-width: 290px;
        }

        .orange-circle {
          position: absolute;
          left: 0;
          top: 0;
          width: 10px;
          height: 10px;
          border: 1.5px solid #ff7518;
          border-radius: 50%;
        }

        .decoration-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 12px 22px;
          border-radius: 20px;
          background: linear-gradient(
            135deg,
            #fff7f0,
            #fff0e7
          );
        }

        .decoration-content svg {
          color: #ff6712;
        }

        .decoration-content div {
          display: flex;
          flex-direction: column;
          color: #132d48;
          font-size: 13px;
          line-height: 1.5;
        }

        /* =================================================
           LAYOUT
        ================================================= */

        .booking-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 370px;
          gap: 22px;
          align-items: start;
        }

        /* =================================================
           LEFT SECTION
        ================================================= */

        .booking-section {
          min-width: 0;
          padding: 16px;
          border: 1px solid #e5ebf2;
          border-radius: 18px;
          background: white;
          box-shadow: 0 5px 25px rgba(15, 39, 65, 0.03);
        }

        .booking-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          margin-bottom: 16px;
        }

        .booking-tabs {
          display: flex;
          gap: 7px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .booking-tabs::-webkit-scrollbar {
          display: none;
        }

        .booking-tab {
          padding: 11px 17px;
          border: 1px solid #e3eaf2;
          border-radius: 24px;
          background: #f8fafc;
          color: #29435f;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .booking-tab:hover {
          border-color: #ff7518;
          color: #ff6712;
        }

        .booking-tab.active {
          border-color: #ff6712;
          background: #ff6712;
          color: white;
          box-shadow: 0 7px 18px rgba(255, 103, 18, 0.18);
        }

        /* =================================================
           SEARCH
        ================================================= */

        .booking-tools {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .booking-search {
          width: 185px;
          height: 38px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 12px;
          border: 1px solid #dfe7ef;
          border-radius: 9px;
          background: white;
        }

        .booking-search svg {
          flex-shrink: 0;
          color: #8ba0b5;
        }

        .booking-search input {
          width: 100%;
          border: 0;
          outline: 0;
          color: #102a43;
          background: transparent;
          font-size: 12px;
        }

        .booking-search input::placeholder {
          color: #9aabbd;
        }

        .filter-button {
          height: 38px;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 14px;
          border: 1px solid #dfe7ef;
          border-radius: 9px;
          background: white;
          color: #29435f;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .filter-button:hover {
          border-color: #ff7518;
          color: #ff6712;
        }

        /* =================================================
           BOOKING LIST
        ================================================= */

        .booking-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .booking-card {
          display: grid;
          grid-template-columns:
            96px
            minmax(180px, 1fr)
            90px
            105px
            25px;

          align-items: center;
          gap: 15px;

          padding: 12px;

          border: 1px solid #e5edf4;
          border-radius: 14px;

          background: white;

          cursor: pointer;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .booking-card:hover {
          transform: translateY(-2px);
          border-color: #ffd0b5;
          box-shadow: 0 10px 25px rgba(20, 50, 80, 0.06);
        }

        .booking-card.selected {
          border-color: #ffb58b;
          box-shadow: 0 8px 25px rgba(255, 103, 18, 0.08);
        }

        .booking-image {
          width: 96px;
          height: 88px;
          object-fit: cover;
          border-radius: 12px;
        }

        .booking-info {
          min-width: 0;
        }

        .booking-info h3 {
          margin: 0 0 4px;
          color: #102f52;
          font-size: 14px;
          font-weight: 750;
        }

        .booking-vendor {
          margin: 0 0 8px;
          color: #70869d;
          font-size: 11px;
        }

        .booking-meta {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 5px;
          color: #66809b;
          font-size: 10px;
        }

        .booking-meta svg {
          color: #708aa4;
        }

        /* =================================================
           STATUS
        ================================================= */

        .status {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: max-content;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
        }

        /* =================================================
           PRICE
        ================================================= */

        .booking-price {
          color: #102f52;
          font-size: 13px;
          font-weight: 750;
          white-space: nowrap;
          text-align: center;
        }

        /* =================================================
           DETAILS BUTTON
        ================================================= */

        .details-button {
          height: 36px;
          padding: 0 16px;
          border: 1px solid #dce5ee;
          border-radius: 20px;
          background: white;
          color: #193b5e;
          font-size: 10px;
          font-weight: 650;
          cursor: pointer;
          white-space: nowrap;
          transition: 0.25s ease;
        }

        .details-button:hover {
          border-color: #ff6712;
          background: #ff6712;
          color: white;
        }

        .more-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 35px;
          padding: 0;
          border: 0;
          background: transparent;
          color: #29435f;
          cursor: pointer;
        }

        .more-button:hover {
          color: #ff6712;
        }

        /* =================================================
           EMPTY
        ================================================= */

        .empty-state {
          min-height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #8ba0b4;
          text-align: center;
        }

        .empty-state h3 {
          margin: 12px 0 5px;
          color: #173653;
        }

        .empty-state p {
          margin: 0;
          font-size: 12px;
        }

        /* =================================================
           DETAILS PANEL
        ================================================= */

        .booking-details {
          position: sticky;
          top: 20px;
          overflow: hidden;
          border: 1px solid #e3eaf1;
          border-radius: 18px;
          background: white;
          box-shadow: 0 7px 30px rgba(15, 39, 65, 0.04);
        }

        .details-image {
          position: relative;
          height: 190px;
          margin: 10px;
          overflow: hidden;
          border-radius: 12px;
        }

        .details-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .back-button {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;

          display: flex;
          align-items: center;
          gap: 5px;

          padding: 8px 10px;

          border: 0;
          border-radius: 20px;

          background: rgba(20, 29, 39, 0.6);
          backdrop-filter: blur(8px);

          color: white;
          font-size: 10px;
          cursor: pointer;
        }

        .details-content {
          padding: 3px 15px 17px;
        }

        .details-content h2 {
          margin: 8px 0 4px;
          color: #102f52;
          font-size: 17px;
        }

        .details-vendor {
          margin: 0 0 8px;
          color: #71869d;
          font-size: 11px;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 9px;
          color: #ff9f00;
          font-size: 11px;
        }

        .rating span {
          color: #7b8da0;
        }

        .details-location {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #5c748e;
          font-size: 11px;
        }

        .details-price {
          margin-left: auto;
          color: #102f52;
          font-size: 14px;
          font-weight: 750;
        }

        /* =================================================
           APPOINTMENT
        ================================================= */

        .appointment-box {
          margin-top: 18px;
          padding: 13px;
          border: 1px solid #e3eaf1;
          border-radius: 11px;
          background: #f9fbfd;
        }

        .appointment-item {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          margin-bottom: 12px;
          color: #4e6985;
          font-size: 10px;
          line-height: 1.5;
        }

        .appointment-item:last-child {
          margin-bottom: 0;
        }

        .appointment-item svg {
          flex-shrink: 0;
          color: #193a5b;
        }

        /* =================================================
           TIMELINE
        ================================================= */

        .timeline-section {
          margin-top: 20px;
        }

        .timeline-section h3 {
          margin: 0 0 12px;
          color: #102f52;
          font-size: 13px;
        }

        .timeline {
          position: relative;
          padding-left: 6px;
        }

        .timeline::before {
          content: "";
          position: absolute;
          left: 6px;
          top: 8px;
          bottom: 8px;
          width: 1px;
          background: #d9e1e9;
        }

        .timeline-item {
          position: relative;
          display: flex;
          gap: 13px;
          min-height: 52px;
        }

        .timeline-dot {
          position: relative;
          z-index: 2;
          width: 12px;
          height: 12px;
          margin-top: 3px;
          border-radius: 50%;
          background: #d6e0ea;
        }

        .timeline-item.active .timeline-dot {
          background: #ff6712;
          box-shadow: 0 0 0 4px #fff0e7;
        }

        .timeline-item strong {
          display: block;
          margin-bottom: 3px;
          color: #173c60;
          font-size: 10px;
        }

        .timeline-item span {
          color: #8aa0b7;
          font-size: 9px;
        }

        /* =================================================
           ACTION BUTTONS
        ================================================= */

        .details-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 10px;
        }

        .details-actions button {
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 9px;
          font-size: 11px;
          font-weight: 650;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .message-button {
          border: 1px solid #ff6712;
          background: #ff6712;
          color: white;
        }

        .message-button:hover {
          background: #e85b0b;
          transform: translateY(-1px);
        }

        .call-button {
          border: 1px solid #dce5ee;
          background: white;
          color: #193b5e;
        }

        .call-button:hover {
          border-color: #ff6712;
          color: #ff6712;
        }

        .cancel-button {
          border: 1px solid #dce5ee;
          background: white;
          color: #ef4444;
        }

        .cancel-button:hover {
          border-color: #ef4444;
          background: #fff7f7;
        }

        /* =================================================
           TABLET
        ================================================= */

        @media (max-width: 1100px) {

          .customer-booking {
            padding: 25px;
          }

          .booking-layout {
            grid-template-columns: 1fr;
          }

          .booking-details {
            position: relative;
            top: 0;
          }

          .booking-decoration {
            display: none;
          }
        }

        /* =================================================
           SMALL TABLET
        ================================================= */

        @media (max-width: 800px) {

          .booking-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .booking-tabs {
            width: 100%;
          }

          .booking-tools {
            width: 100%;
          }

          .booking-search {
            width: 100%;
            flex: 1;
          }

          .booking-card {
            grid-template-columns:
              85px
              minmax(0, 1fr)
              90px;

            gap: 12px;
          }

          .booking-image {
            width: 85px;
            height: 80px;
          }

          .booking-price {
            grid-column: 2;
            grid-row: 2;
            text-align: left;
          }

          .details-button {
            grid-column: 3;
            grid-row: 1 / span 2;
          }

          .more-button {
            display: none;
          }
        }

        /* =================================================
           MOBILE
        ================================================= */

        @media (max-width: 600px) {

          .customer-booking {
            padding: 20px 12px 35px;
          }

          .booking-heading h1 {
            font-size: 24px;
          }

          .booking-heading p {
            font-size: 12px;
          }

          .booking-section {
            padding: 11px;
            border-radius: 14px;
          }

          .booking-tabs {
            gap: 5px;
          }

          .booking-tab {
            padding: 9px 12px;
            font-size: 10px;
          }

          .filter-button {
            width: 40px;
            justify-content: center;
            padding: 0;
          }

          .filter-button span {
            display: none;
          }

          .booking-card {
            grid-template-columns:
              72px
              minmax(0, 1fr);

            gap: 10px;
          }

          .booking-image {
            width: 72px;
            height: 75px;
            grid-row: span 3;
          }

          .booking-info h3 {
            font-size: 12px;
          }

          .booking-vendor {
            font-size: 9px;
          }

          .booking-meta {
            font-size: 9px;
          }

          .booking-price {
            grid-column: 2;
            grid-row: auto;
            text-align: left;
          }

          .details-button {
            grid-column: 1 / -1;
            width: 100%;
          }

          .booking-details {
            border-radius: 14px;
          }

          .details-image {
            height: 210px;
          }
        }

      `}</style>
    </>
  );
}

/* =====================================================
   BOOKING CARD
===================================================== */

function BookingCard({ booking, selected, onSelect }) {
  return (
    <motion.article
      className={
        selected
          ? "booking-card selected"
          : "booking-card"
      }
      onClick={onSelect}
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -10,
      }}
      transition={{
        duration: 0.25,
      }}
      layout
    >

      <img
        className="booking-image"
        src={booking.image}
        alt={booking.title}
      />

      <div className="booking-info">

        <h3>{booking.title}</h3>

        <p className="booking-vendor">
          By {booking.vendor}
        </p>

        <div className="booking-meta">
          <CalendarDays size={13} />
          {booking.date}
          <span>•</span>
          {booking.time}
        </div>

        <div className="booking-meta">
          <MapPin size={13} />
          {booking.location}
        </div>

      </div>

      <span
        className="status"
        style={statusColors[booking.status]}
      >
        {booking.status}
      </span>

      <div className="booking-price">
        {booking.price}
      </div>

      <button
        className="details-button"
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
      >
        View Details
      </button>

      <button
        className="more-button"
        onClick={(event) => event.stopPropagation()}
      >
        <MoreVertical size={18} />
      </button>

    </motion.article>
  );
}

/* =====================================================
   BOOKING DETAILS
===================================================== */

function BookingDetails({ booking }) {
  return (
    <motion.aside
      className="booking-details"
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: 20,
      }}
      transition={{
        duration: 0.3,
      }}
    >

      {/* IMAGE */}

      <div className="details-image">

        <img
          src={booking.image}
          alt={booking.title}
        />

        <button className="back-button">
          <ArrowLeft size={14} />
          Back to Bookings
        </button>

      </div>

      {/* CONTENT */}

      <div className="details-content">

        <span
          className="status"
          style={statusColors[booking.status]}
        >
          {booking.status}
        </span>

        <h2>{booking.title}</h2>

        <p className="details-vendor">
          By {booking.vendor}
        </p>

        {/* RATING */}

        <div className="rating">

          <Star
            size={15}
            fill="currentColor"
          />

          <strong>{booking.rating}</strong>

          <span>
            ({booking.reviews})
          </span>

        </div>

        {/* LOCATION + PRICE */}

        <div className="details-location">

          <MapPin size={15} />

          <span>
            {booking.location}
          </span>

          <strong className="details-price">
            {booking.price}
          </strong>

        </div>

        {/* APPOINTMENT */}

        <div className="appointment-box">

          <div className="appointment-item">

            <CalendarDays size={16} />

            <span>
              {booking.date} • {booking.time}
            </span>

          </div>

          <div className="appointment-item">

            <MapPin size={16} />

            <span>
              {booking.location}
            </span>

          </div>

          <div className="appointment-item">

            <CheckCircle2 size={16} />

            <span>
              Elegant service booked for your special occasion.
            </span>

          </div>

        </div>

        {/* TIMELINE */}

        <div className="timeline-section">

          <h3>Booking Timeline</h3>

          <div className="timeline">

            <TimelineItem
              active
              title="Booking Confirmed"
              date="May 24, 2025 • 9:12 AM"
            />

            <TimelineItem
              title="In Progress"
              date={`${booking.date} • ${booking.time}`}
            />

            <TimelineItem
              title="Completed"
              date="N/A"
            />

          </div>

        </div>

        {/* ACTIONS */}

        <div className="details-actions">

          <button className="message-button">
            <MessageSquare size={16} />
            Message Vendor
          </button>

          <button className="call-button">
            <Phone size={16} />
            Call Vendor
          </button>

          <button className="cancel-button">
            <Trash2 size={15} />
            Cancel Booking
          </button>

        </div>

      </div>

    </motion.aside>
  );
}

/* =====================================================
   TIMELINE ITEM
===================================================== */

function TimelineItem({
  active = false,
  title,
  date,
}) {
  return (
    <div
      className={
        active
          ? "timeline-item active"
          : "timeline-item"
      }
    >

      <div className="timeline-dot">
        {active && (
          <CheckCircle2 size={12} />
        )}
      </div>

      <div>
        <strong>{title}</strong>
        <span>{date}</span>
      </div>

    </div>
  );
}

export default CustomerBooking;