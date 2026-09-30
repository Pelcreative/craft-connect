import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Search,
  SlidersHorizontal,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  MessageSquare,
  Clock3,
  ShieldCheck,
  Users,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const CustomerReview = () => {
  /* =========================================================
     RESPONSIVE SCREEN
  ========================================================= */

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = screenWidth <= 700;
  const isTablet = screenWidth <= 1050;

  /* =========================================================
     STATES
  ========================================================= */

  const [activeTab, setActiveTab] = useState("All Reviews");
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterRating, setFilterRating] = useState("All Ratings");

  const [showWriteReview, setShowWriteReview] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  /* =========================================================
     REVIEW DATA
  ========================================================= */

  const reviews = [
    {
      id: 1,
      vendor: "Zainab's Fashion Hub",
      service: "Fashion Designer & Tailor",
      rating: 5.0,
      date: "May 28, 2025",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=500&q=90",
      text:
        "Absolutely amazing work! Zainab delivered exactly what I wanted. The fit was perfect and the quality is top-notch. I'll definitely be coming back for more.",
      tags: ["Quality Work", "Professional", "Timely Delivery"],
      verified: true,
    },

    {
      id: 2,
      vendor: "Tolu Events & Decor",
      service: "Event Photographer",
      rating: 4.7,
      date: "May 20, 2025",
      image:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=90",
      text:
        "The event photos were beautiful and captured every special moment. Very professional and easy to work with. Highly recommend!",
      tags: ["Professional", "Creative", "Great Communication"],
      verified: true,
    },

    {
      id: 3,
      vendor: "Emeka's Photography",
      service: "Portrait Photographer",
      rating: 4.9,
      date: "May 15, 2025",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=90",
      text:
        "Amazing shots! The photographer was patient, creative and delivered beyond expectations. The pictures came out beautifully.",
      tags: ["Creative", "Professional", "On Time"],
      verified: true,
    },

    {
      id: 4,
      vendor: "Chinonso's Catering",
      service: "Catering Services",
      rating: 4.8,
      date: "May 10, 2025",
      image:
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=500&q=90",
      text:
        "The food was delicious and well presented. Our guests loved it! Great service and very punctual. Would book again.",
      tags: ["Delicious Food", "Punctual", "Excellent Service"],
      verified: true,
    },

    {
      id: 5,
      vendor: "Glory's Interior Decor",
      service: "Interior Decorator",
      rating: 4.6,
      date: "May 6, 2025",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=90",
      text:
        "Glory transformed our living room completely. The attention to detail was excellent and everything looked beautiful.",
      tags: ["Beautiful Design", "Creative", "Professional"],
      verified: true,
    },

    {
      id: 6,
      vendor: "Yemi's Hair Studio",
      service: "Hair Stylist",
      rating: 4.5,
      date: "April 29, 2025",
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=90",
      text:
        "Very neat work and friendly service. My hairstyle came out exactly how I wanted it.",
      tags: ["Neat Work", "Friendly", "Great Service"],
      verified: true,
    },
  ];

  /* =========================================================
     RATING BREAKDOWN
  ========================================================= */

  const ratingBreakdown = [
    {
      rating: 5,
      count: 92,
      percentage: 92,
    },
    {
      rating: 4,
      count: 18,
      percentage: 18,
    },
    {
      rating: 3,
      count: 8,
      percentage: 8,
    },
    {
      rating: 2,
      count: 4,
      percentage: 4,
    },
    {
      rating: 1,
      count: 2,
      percentage: 2,
    },
  ];

  /* =========================================================
     REVIEW BREAKDOWN
  ========================================================= */

  const breakdown = [
    {
      title: "Quality of Service",
      rating: "4.8",
      icon: Users,
    },
    {
      title: "Communication",
      rating: "4.7",
      icon: MessageSquare,
    },
    {
      title: "Timeliness",
      rating: "4.6",
      icon: Clock3,
    },
    {
      title: "Value for Money",
      rating: "4.5",
      icon: ShieldCheck,
    },
  ];

  /* =========================================================
     FILTER REVIEWS
  ========================================================= */

  const filteredReviews = useMemo(() => {
    let result = [...reviews];

    if (activeTab === "My Reviews") {
      result = reviews.slice(0, 2);
    }

    if (activeTab === "Pending") {
      result = [];
    }

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      result = result.filter((review) => {
        return (
          review.vendor.toLowerCase().includes(query) ||
          review.service.toLowerCase().includes(query) ||
          review.text.toLowerCase().includes(query) ||
          review.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      });
    }

    if (filterRating !== "All Ratings") {
      const selected = Number(filterRating.split(" ")[0]);

      result = result.filter((review) => review.rating >= selected);
    }

    return result;
  }, [activeTab, search, filterRating]);

  /* =========================================================
     STYLES
  ========================================================= */

  const styles = {
    page: {
      width: "100%",
      minHeight: "100vh",
      padding: isMobile ? "14px" : "20px",
      boxSizing: "border-box",
      background: "linear-gradient(135deg, #f8fbfe 0%, #f2f7fb 100%)",
      fontFamily:
        "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      color: "#102f4f",
    },

    header: {
      marginBottom: 15,
    },

    title: {
      margin: 0,
      fontSize: isMobile ? 25 : 30,
      fontWeight: 800,
      letterSpacing: "-1px",
      color: "#092b4d",
    },

    subtitle: {
      margin: "4px 0 0",
      fontSize: 12,
      color: "#5d7893",
    },

    topLayout: {
      display: "grid",
      gridTemplateColumns: isTablet
        ? "1fr"
        : "minmax(0, 1fr) 300px",
      gap: 13,
      alignItems: "stretch",
    },

    summaryCard: {
      minWidth: 0,
      padding: isMobile ? 12 : 14,
      borderRadius: 11,
      border: "1px solid #e0eaf2",
      background: "#ffffff",
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "190px minmax(200px, 1fr) 1fr",
      gap: 12,
      boxSizing: "border-box",
    },

    scoreBox: {
      minHeight: 125,
      padding: 13,
      boxSizing: "border-box",
      borderRadius: 9,
      background: "linear-gradient(145deg, #fffaf6, #fffdfb)",
      border: "1px solid #f3ebe4",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },

    score: {
      margin: 0,
      fontSize: isMobile ? 42 : 46,
      lineHeight: 1,
      fontWeight: 500,
      color: "#050505",
    },

    stars: {
      display: "flex",
      alignItems: "center",
      gap: 2,
    },

    star: {
      color: "#ffad00",
      fill: "#ffad00",
    },

    scoreText: {
      margin: "7px 0 0",
      fontSize: 10,
      color: "#334d66",
    },

    bars: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 7,
      padding: isMobile ? "4px 0" : 8,
    },

    barRow: {
      display: "grid",
      gridTemplateColumns: "25px minmax(70px, 1fr) 25px",
      alignItems: "center",
      gap: 7,
    },

    barLabel: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: 2,
      fontSize: 10,
      color: "#1b3b59",
      fontWeight: 600,
    },

    barBackground: {
      height: 9,
      overflow: "hidden",
      borderRadius: 10,
      background: "#e9f0f6",
    },

    barFill: (percentage) => ({
      height: "100%",
      width: `${percentage}%`,
      borderRadius: 10,
      background: "linear-gradient(90deg, #ff6900, #ff720f)",
    }),

    barCount: {
      fontSize: 9,
      color: "#193b5d",
      fontWeight: 600,
    },

    writeBox: {
      minHeight: 125,
      padding: 13,
      borderRadius: 9,
      background: "linear-gradient(135deg, #f5f9fd, #edf5fb)",
      display: "flex",
      alignItems: "center",
      gap: 11,
    },

    writeIcon: {
      width: 49,
      height: 49,
      flexShrink: 0,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #fff0e3, #ffe6d1)",
      color: "#ff6900",
    },

    writeTitle: {
      margin: 0,
      fontSize: 12,
      lineHeight: 1.35,
      color: "#153654",
      fontWeight: 750,
    },

    writeDescription: {
      margin: "4px 0 9px",
      fontSize: 9,
      lineHeight: 1.45,
      color: "#67819a",
    },

    orangeButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      height: 36,
      padding: "0 15px",
      border: "none",
      borderRadius: 9,
      background: "#ff6900",
      color: "#ffffff",
      fontSize: 9,
      fontWeight: 750,
      cursor: "pointer",
    },

    breakdownCard: {
      padding: 14,
      borderRadius: 11,
      border: "1px solid #dfe9f2",
      background: "#ffffff",
    },

    cardHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
    },

    cardTitle: {
      margin: 0,
      fontSize: 15,
      color: "#163654",
      fontWeight: 750,
    },

    viewAll: {
      border: "none",
      background: "transparent",
      color: "#1264b1",
      fontSize: 9,
      cursor: "pointer",
      fontWeight: 600,
    },

    breakdownRow: {
      display: "grid",
      gridTemplateColumns: "36px minmax(0, 1fr) 25px",
      alignItems: "center",
      gap: 9,
      marginBottom: 9,
    },

    breakdownIcon: {
      width: 34,
      height: 34,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f2f7fc",
      color: "#416786",
    },

    breakdownName: {
      marginBottom: 4,
      fontSize: 9,
      color: "#244762",
    },

    breakdownBarBackground: {
      height: 7,
      borderRadius: 10,
      overflow: "hidden",
      background: "#eaf1f7",
    },

    breakdownBar: (rating) => ({
      height: "100%",
      width: `${Number(rating) * 20}%`,
      borderRadius: 10,
      background: "#ff6900",
    }),

    breakdownRating: {
      fontSize: 9,
      color: "#234563",
      fontWeight: 650,
      textAlign: "right",
    },

    contentLayout: {
      display: "grid",
      gridTemplateColumns: isTablet
        ? "1fr"
        : "minmax(0, 1fr) 300px",
      gap: 13,
      marginTop: 13,
      alignItems: "start",
    },

    reviewsPanel: {
      minWidth: 0,
      borderRadius: 11,
      border: "1px solid #dfe9f2",
      background: "#ffffff",
      overflow: "hidden",
    },

    tabsToolbar: {
      minHeight: 58,
      padding: "8px 11px",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      flexWrap: "wrap",
      borderBottom: "1px solid #edf2f6",
    },

    tabs: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      overflowX: "auto",
      maxWidth: isMobile ? "100%" : "auto",
    },

    tab: (active) => ({
      flexShrink: 0,
      height: 34,
      padding: "0 13px",
      border: "1px solid",
      borderColor: active ? "#ff6900" : "#dfe9f2",
      borderRadius: 18,
      background: active ? "#ff6900" : "#ffffff",
      color: active ? "#ffffff" : "#3b5c78",
      fontSize: 9,
      fontWeight: active ? 700 : 550,
      cursor: "pointer",
    }),

    searchArea: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginLeft: "auto",
    },

    searchBox: {
      width: isMobile ? 145 : 185,
      height: 35,
      display: "flex",
      alignItems: "center",
      gap: 7,
      padding: "0 9px",
      border: "1px solid #dce7f0",
      borderRadius: 8,
      background: "#ffffff",
      boxSizing: "border-box",
    },

    input: {
      width: "100%",
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      fontSize: 9,
      color: "#264965",
    },

    filterButton: {
      height: 35,
      display: "flex",
      alignItems: "center",
      gap: 5,
      padding: "0 10px",
      border: "1px solid #dce7f0",
      borderRadius: 8,
      background: "#ffffff",
      color: "#264965",
      fontSize: 9,
      fontWeight: 600,
      cursor: "pointer",
    },

    reviewList: {
      padding: isMobile ? 9 : 11,
      display: "flex",
      flexDirection: "column",
      gap: 7,
    },

    reviewCard: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "104px minmax(0, 1fr) 20px",
      gap: 12,
      padding: 11,
      border: "1px solid #dce8f1",
      borderRadius: 9,
      background: "#ffffff",
    },

    reviewImage: {
      width: isMobile ? "100%" : 104,
      height: isMobile ? 155 : 104,
      objectFit: "cover",
      borderRadius: 8,
      display: "block",
    },

    reviewContent: {
      minWidth: 0,
    },

    reviewVendor: {
      margin: 0,
      fontSize: 12,
      color: "#103252",
      fontWeight: 750,
    },

    reviewService: {
      margin: "2px 0 5px",
      fontSize: 9,
      color: "#66809a",
    },

    reviewMeta: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      flexWrap: "wrap",
    },

    ratingMeta: {
      display: "flex",
      alignItems: "center",
      gap: 1,
      color: "#ffad00",
    },

    reviewDate: {
      paddingLeft: 7,
      borderLeft: "1px solid #d8e3eb",
      color: "#66809a",
      fontSize: 9,
    },

    reviewText: {
      margin: "7px 0",
      color: "#607a94",
      fontSize: 9.5,
      lineHeight: 1.45,
    },

    reviewTags: {
      display: "flex",
      flexWrap: "wrap",
      gap: 5,
    },

    reviewTag: {
      padding: "5px 7px",
      borderRadius: 12,
      background: "#edf5fb",
      color: "#23609a",
      fontSize: 8,
      fontWeight: 550,
    },

    verifiedBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "5px 7px",
      borderRadius: 12,
      background: "#e5f9ef",
      color: "#16a36a",
      fontSize: 8,
      fontWeight: 700,
      whiteSpace: "nowrap",
    },

    recentCard: {
      padding: 13,
      borderRadius: 11,
      border: "1px solid #dfe9f2",
      background: "#ffffff",
    },

    recentItem: {
      display: "grid",
      gridTemplateColumns: "58px minmax(0, 1fr) 15px",
      alignItems: "center",
      gap: 8,
      padding: "9px 0",
      borderBottom: "1px solid #edf2f6",
    },

    recentImage: {
      width: 55,
      height: 55,
      objectFit: "cover",
      borderRadius: "50%",
    },

    recentVendor: {
      margin: 0,
      fontSize: 10,
      fontWeight: 750,
      color: "#123453",
    },

    recentService: {
      margin: "3px 0",
      fontSize: 8,
      color: "#6c849b",
    },

    recentMeta: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      fontSize: 8,
      color: "#69829a",
    },

    miniStars: {
      display: "flex",
      alignItems: "center",
      gap: 1,
      color: "#ffad00",
    },

    recentArrow: {
      color: "#7290a9",
    },

    recentWrite: {
      marginTop: 11,
      padding: 13,
      borderRadius: 10,
      background: "linear-gradient(135deg, #fff5ec, #fff0e4)",
      display: "flex",
      alignItems: "center",
      gap: 10,
    },

    recentWriteIcon: {
      width: 55,
      height: 55,
      flexShrink: 0,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#ffe6d1",
      color: "#ff6900",
    },

    modalOverlay: {
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      background: "rgba(5, 26, 45, .52)",
      backdropFilter: "blur(4px)",
    },

    modal: {
      width: "100%",
      maxWidth: 480,
      padding: 20,
      boxSizing: "border-box",
      borderRadius: 14,
      background: "#ffffff",
      boxShadow: "0 25px 70px rgba(0,0,0,.22)",
    },

    modalHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 17,
    },

    modalTitle: {
      margin: 0,
      fontSize: 19,
      color: "#123453",
    },

    closeButton: {
      width: 32,
      height: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      borderRadius: "50%",
      background: "#f1f5f8",
      color: "#4d687f",
      cursor: "pointer",
    },

    ratingSelector: {
      display: "flex",
      justifyContent: "center",
      gap: 7,
      margin: "15px 0",
    },

    ratingStarButton: (active) => ({
      border: "none",
      background: "transparent",
      color: active ? "#ffad00" : "#c7d3dd",
      cursor: "pointer",
      padding: 3,
    }),

    textarea: {
      width: "100%",
      minHeight: 120,
      padding: 12,
      boxSizing: "border-box",
      border: "1px solid #dbe6ef",
      borderRadius: 9,
      resize: "vertical",
      outline: "none",
      fontFamily: "inherit",
      fontSize: 11,
      color: "#274963",
    },

    modalActions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 8,
      marginTop: 12,
    },

    cancelButton: {
      height: 38,
      padding: "0 15px",
      border: "1px solid #dbe6ef",
      borderRadius: 8,
      background: "#ffffff",
      color: "#49677f",
      fontSize: 10,
      fontWeight: 650,
      cursor: "pointer",
    },
  };

  /* =========================================================
     STAR COMPONENT
  ========================================================= */

  const Stars = ({ rating = 5, size = 13 }) => {
    return (
      <div style={styles.stars}>
        {[1, 2, 3, 4, 5].map((number) => {
          const full = rating >= number;

          return (
            <Star
              key={number}
              size={size}
              style={{
                ...styles.star,
                color: full ? "#ffad00" : "#cdd8e1",
                fill: full ? "#ffad00" : "#cdd8e1",
              }}
            />
          );
        })}
      </div>
    );
  };

  /* =========================================================
     REVIEW CARD
  ========================================================= */

  const ReviewCard = ({ review }) => {
    return (
      <motion.article
        layout
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -10,
        }}
        whileHover={{
          y: -2,
          boxShadow: "0 8px 24px rgba(16,49,77,.07)",
        }}
        transition={{
          duration: 0.3,
        }}
        style={styles.reviewCard}
      >
        <img
          src={review.image}
          alt={review.vendor}
          style={styles.reviewImage}
          loading="lazy"
        />

        <div style={styles.reviewContent}>
          <h3 style={styles.reviewVendor}>{review.vendor}</h3>

          <p style={styles.reviewService}>{review.service}</p>

          <div style={styles.reviewMeta}>
            <div style={styles.ratingMeta}>
              <Stars rating={review.rating} size={11} />
            </div>

            <span
              style={{
                color: "#244661",
                fontSize: 9,
                fontWeight: 650,
              }}
            >
              {review.rating}
            </span>

            <span style={styles.reviewDate}>{review.date}</span>
          </div>

          <p style={styles.reviewText}>{review.text}</p>

          <div style={styles.reviewTags}>
            {review.tags.map((tag) => (
              <span key={tag} style={styles.reviewTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 8,
          }}
        >
          {review.verified && (
            <span style={styles.verifiedBadge}>
              <CheckCircle2 size={10} />
              Verified Buyer
            </span>
          )}

          <motion.button
            type="button"
            aria-label={`More options for ${review.vendor}`}
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
            style={{
              border: "none",
              background: "transparent",
              color: "#1d496d",
              cursor: "pointer",
            }}
          >
            <MoreVertical size={16} />
          </motion.button>
        </div>
      </motion.article>
    );
  };

  /* =========================================================
     WRITE REVIEW MODAL
  ========================================================= */

  const WriteReviewModal = () => {
    const handleSubmit = () => {
      if (selectedRating === 0 || !reviewText.trim()) {
        return;
      }

      setReviewText("");
      setSelectedRating(0);
      setShowWriteReview(false);
    };

    return (
      <AnimatePresence>
        {showWriteReview && (
          <motion.div
            style={styles.modalOverlay}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setShowWriteReview(false)}
          >
            <motion.div
              style={styles.modal}
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.92,
                y: 20,
              }}
              transition={{
                type: "spring",
                damping: 22,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div style={styles.modalHeader}>
                <div>
                  <h2 style={styles.modalTitle}>Write a Review</h2>

                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 10,
                      color: "#71889e",
                    }}
                  >
                    Share your experience with the community.
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Close review modal"
                  style={styles.closeButton}
                  onClick={() => setShowWriteReview(false)}
                >
                  <X size={17} />
                </button>
              </div>

              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    color: "#48657d",
                    fontWeight: 600,
                  }}
                >
                  How would you rate your experience?
                </p>

                <div style={styles.ratingSelector}>
                  {[1, 2, 3, 4, 5].map((number) => (
                    <motion.button
                      type="button"
                      key={number}
                      aria-label={`Rate ${number} star${
                        number > 1 ? "s" : ""
                      }`}
                      style={styles.ratingStarButton(
                        selectedRating >= number
                      )}
                      onClick={() => setSelectedRating(number)}
                      whileHover={{
                        scale: 1.15,
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                    >
                      <Star
                        size={27}
                        fill={
                          selectedRating >= number
                            ? "#ffad00"
                            : "none"
                        }
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              <textarea
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                placeholder="Tell us about your experience..."
                style={styles.textarea}
              />

              {selectedRating === 0 && reviewText.trim() && (
                <p
                  style={{
                    margin: "7px 0 0",
                    color: "#d95d00",
                    fontSize: 9,
                  }}
                >
                  Please select a rating.
                </p>
              )}

              <div style={styles.modalActions}>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={() => setShowWriteReview(false)}
                >
                  Cancel
                </button>

                <motion.button
                  type="button"
                  style={{
                    ...styles.orangeButton,
                    opacity:
                      selectedRating === 0 || !reviewText.trim()
                        ? 0.55
                        : 1,
                    cursor:
                      selectedRating === 0 || !reviewText.trim()
                        ? "not-allowed"
                        : "pointer",
                  }}
                  disabled={
                    selectedRating === 0 || !reviewText.trim()
                  }
                  whileHover={
                    selectedRating > 0 && reviewText.trim()
                      ? {
                          boxShadow:
                            "0 7px 18px rgba(255,105,0,.25)",
                        }
                      : {}
                  }
                  whileTap={
                    selectedRating > 0 && reviewText.trim()
                      ? {
                          scale: 0.96,
                        }
                      : {}
                  }
                  onClick={handleSubmit}
                >
                  Submit Review
                  <ArrowRight size={13} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <>
      <motion.main
        style={styles.page}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.45,
        }}
      >
        {/* HEADER */}

        <motion.header
          style={styles.header}
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <h1 style={styles.title}>Vendor Reviews</h1>

          <p style={styles.subtitle}>
            Share your experience and help others find the best local
            artisans.
          </p>
        </motion.header>

        {/* =====================================================
            TOP SECTION
        ===================================================== */}

        <div style={styles.topLayout}>
          {/* SUMMARY */}

          <motion.section
            style={styles.summaryCard}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            {/* SCORE */}

            <div style={styles.scoreBox}>
              <h2 style={styles.score}>4.8</h2>

              <div style={{ marginTop: 8 }}>
                <Stars rating={4.8} size={22} />
              </div>

              <p style={styles.scoreText}>Based on 124 reviews</p>
            </div>

            {/* RATING BARS */}

            <div style={styles.bars}>
              {ratingBreakdown.map((item) => (
                <div key={item.rating} style={styles.barRow}>
                  <span style={styles.barLabel}>
                    {item.rating}

                    <Star
                      size={10}
                      fill="#ffad00"
                      color="#ffad00"
                    />
                  </span>

                  <div style={styles.barBackground}>
                    <motion.div
                      style={styles.barFill(item.percentage)}
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${item.percentage}%`,
                      }}
                      transition={{
                        duration: 0.7,
                        delay: item.rating * 0.08,
                      }}
                    />
                  </div>

                  <span style={styles.barCount}>{item.count}</span>
                </div>
              ))}
            </div>

            {/* WRITE REVIEW */}

            <div style={styles.writeBox}>
              <div style={styles.writeIcon}>
                <Star size={25} fill="#ff6900" />
              </div>

              <div>
                <h3 style={styles.writeTitle}>
                  Your feedback helps
                  <br />
                  small businesses grow!
                </h3>

                <p style={styles.writeDescription}>
                  Take a moment to share your experience.
                </p>

                <motion.button
                  type="button"
                  style={styles.orangeButton}
                  onClick={() => setShowWriteReview(true)}
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      "0 8px 20px rgba(255,105,0,.22)",
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                >
                  Write a Review
                  <ArrowRight size={12} />
                </motion.button>
              </div>
            </div>
          </motion.section>

          {/* REVIEW BREAKDOWN */}

          <motion.section
            style={styles.breakdownCard}
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
          >
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Review Breakdown</h2>

              <button
                type="button"
                style={styles.viewAll}
                onClick={() => {
                  setActiveTab("All Reviews");
                  setFilterRating("All Ratings");
                  setSearch("");
                }}
              >
                View All
              </button>
            </div>

            {breakdown.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  style={styles.breakdownRow}
                >
                  <div style={styles.breakdownIcon}>
                    <Icon size={16} />
                  </div>

                  <div>
                    <div style={styles.breakdownName}>
                      {item.title}
                    </div>

                    <div
                      style={styles.breakdownBarBackground}
                    >
                      <motion.div
                        style={styles.breakdownBar(item.rating)}
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: `${
                            Number(item.rating) * 20
                          }%`,
                        }}
                        transition={{
                          duration: 0.8,
                        }}
                      />
                    </div>
                  </div>

                  <span style={styles.breakdownRating}>
                    {item.rating}
                  </span>
                </div>
              );
            })}
          </motion.section>
        </div>

        {/* =====================================================
            REVIEWS + RECENT REVIEWS
        ===================================================== */}

        <div style={styles.contentLayout}>
          {/* REVIEWS */}

          <section style={styles.reviewsPanel}>
            {/* TOOLBAR */}

            <div style={styles.tabsToolbar}>
              <div style={styles.tabs}>
                {[
                  "All Reviews",
                  "My Reviews",
                  "Pending",
                ].map((tab) => {
                  const active = activeTab === tab;

                  return (
                    <motion.button
                      type="button"
                      key={tab}
                      style={styles.tab(active)}
                      onClick={() => setActiveTab(tab)}
                      whileTap={{
                        scale: 0.95,
                      }}
                    >
                      {tab}

                      {tab === "All Reviews" && " (124)"}
                      {tab === "My Reviews" && " (6)"}
                      {tab === "Pending" && " (2)"}
                    </motion.button>
                  );
                })}
              </div>

              <div style={styles.searchArea}>
                <div style={styles.searchBox}>
                  <Search
                    size={14}
                    color="#6d879e"
                  />

                  <input
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search vendors..."
                    style={styles.input}
                  />
                </div>

                <motion.button
                  type="button"
                  style={styles.filterButton}
                  onClick={() =>
                    setShowFilter((previous) => !previous)
                  }
                  whileTap={{
                    scale: 0.95,
                  }}
                >
                  <SlidersHorizontal size={13} />

                  {!isMobile && "Filter"}
                </motion.button>
              </div>
            </div>

            {/* FILTER */}

            <AnimatePresence>
              {showFilter && (
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  style={{
                    overflow: "hidden",
                    borderBottom: "1px solid #edf2f6",
                  }}
                >
                  <div
                    style={{
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      flexWrap: "wrap",
                    }}
                  >
                    {[
                      "All Ratings",
                      "5 and above",
                      "4 and above",
                      "3 and above",
                    ].map((filter) => (
                      <button
                        type="button"
                        key={filter}
                        onClick={() =>
                          setFilterRating(filter)
                        }
                        style={{
                          padding: "7px 10px",
                          border: "1px solid",
                          borderColor:
                            filterRating === filter
                              ? "#ff6900"
                              : "#dce7f0",
                          borderRadius: 16,
                          background:
                            filterRating === filter
                              ? "#fff1e8"
                              : "#ffffff",
                          color:
                            filterRating === filter
                              ? "#ff6900"
                              : "#49677f",
                          fontSize: 8,
                          cursor: "pointer",
                        }}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* REVIEW LIST */}

            <motion.div style={styles.reviewList} layout>
              <AnimatePresence mode="popLayout">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                    />
                  ))
                ) : (
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    style={{
                      padding: 45,
                      textAlign: "center",
                    }}
                  >
                    <MessageSquare
                      size={40}
                      color="#afc0cf"
                    />

                    <h3
                      style={{
                        margin: "10px 0 4px",
                        fontSize: 15,
                        color: "#294963",
                      }}
                    >
                      No reviews found
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        fontSize: 10,
                        color: "#758da3",
                      }}
                    >
                      Try another search or filter.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </section>

          {/* RECENT REVIEWS */}

          <section style={styles.recentCard}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>
                Recent Reviews
              </h2>
            </div>

            {reviews.slice(0, 4).map((review) => (
              <motion.div
                key={review.id}
                style={styles.recentItem}
                whileHover={{
                  x: 3,
                }}
              >
                <img
                  src={review.image}
                  alt={review.vendor}
                  style={styles.recentImage}
                  loading="lazy"
                />

                <div style={{ minWidth: 0 }}>
                  <h3 style={styles.recentVendor}>
                    {review.vendor}
                  </h3>

                  <p style={styles.recentService}>
                    {review.service}
                  </p>

                  <div style={styles.recentMeta}>
                    <div style={styles.miniStars}>
                      <Star
                        size={10}
                        fill="#ffad00"
                        color="#ffad00"
                      />

                      <strong
                        style={{
                          color: "#284964",
                        }}
                      >
                        {review.rating}
                      </strong>
                    </div>

                    <span>•</span>

                    <span>{review.date}</span>
                  </div>
                </div>

                <ChevronRight
                  size={16}
                  style={styles.recentArrow}
                />
              </motion.div>
            ))}

            {/* WRITE REVIEW CARD */}

            <div style={styles.recentWrite}>
              <div style={styles.recentWriteIcon}>
                <MessageSquare size={27} />
              </div>

              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 7px",
                    marginBottom: 5,
                    borderRadius: 10,
                    background: "#ffe5d3",
                    color: "#ff6900",
                    fontSize: 8,
                    fontWeight: 700,
                  }}
                >
                  <Sparkles size={9} />
                  Loved your experience?
                </div>

                <p
                  style={{
                    margin: "0 0 9px",
                    fontSize: 9,
                    lineHeight: 1.45,
                    color: "#536d84",
                  }}
                >
                  Leave a review and help others make the right
                  choice.
                </p>

                <motion.button
                  type="button"
                  style={styles.orangeButton}
                  onClick={() => setShowWriteReview(true)}
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  Write a Review
                  <ArrowRight size={12} />
                </motion.button>
              </div>
            </div>
          </section>
        </div>
      </motion.main>

      {/* WRITE REVIEW MODAL */}

      <WriteReviewModal />
    </>
  );
};

export default CustomerReview;