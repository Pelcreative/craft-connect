import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  Star,
  MapPin,
  CalendarDays,
  MessageSquare,
  CheckCircle2,
  SlidersHorizontal,
  X,
  RotateCcw,
  Grid3X3,
  Filter,
} from "lucide-react";

const CustomerSavedVendors = () => {
  /* =========================================================
     RESPONSIVE SCREEN SIZE
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

  const [activeCategory, setActiveCategory] = useState("All Saved");
  const [search, setSearch] = useState("");
  const [filterSearch, setFilterSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [serviceCategory, setServiceCategory] =
    useState("All Categories");
  const [rating, setRating] = useState("4+ and above");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [sortBy, setSortBy] = useState("Most Saved");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [favorites, setFavorites] = useState([1, 2, 3, 4, 5, 6]);

  /* =========================================================
     VENDOR DATA
  ========================================================= */

  const vendors = [
    {
      id: 1,
      name: "Zainab's Fashion Hub",
      category: "Tailors",
      service: "Fashion Designer & Tailor",
      rating: 4.8,
      reviews: 124,
      location: "Lagos, Nigeria",
      city: "Lagos",
      badge: "Top Rated",
      badgeColor: "#ff6900",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=90",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=85",
      tags: ["Tailoring", "Fashion Design", "Repairs"],
      verified: true,
    },

    {
      id: 2,
      name: "Tolu Events & Decor",
      category: "Photographers",
      service: "Event Photographer",
      rating: 4.7,
      reviews: 98,
      location: "Lagos, Nigeria",
      city: "Lagos",
      badge: "Popular",
      badgeColor: "#ff6900",
      image:
        "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1000&q=90",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=85",
      tags: ["Photography", "Event Coverage", "Photo Editing"],
      verified: true,
    },

    {
      id: 3,
      name: "Emeka's Photography",
      category: "Photographers",
      service: "Professional Photographer",
      rating: 4.6,
      reviews: 87,
      location: "Abuja, Nigeria",
      city: "Abuja",
      badge: "Rising Star",
      badgeColor: "#7547e8",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=90",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=85",
      tags: ["Portraits", "Weddings", "Events"],
      verified: true,
    },

    {
      id: 4,
      name: "Chinonso's Catering",
      category: "Caterers",
      service: "Catering Services",
      rating: 4.9,
      reviews: 156,
      location: "Port Harcourt, Nigeria",
      city: "Port Harcourt",
      badge: "Trusted",
      badgeColor: "#1bb783",
      image:
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=90",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=85",
      tags: ["Event Catering", "Corporate", "Private Events"],
      verified: true,
    },

    {
      id: 5,
      name: "Glory's Interior Decor",
      category: "Decorators",
      service: "Interior Decorator",
      rating: 4.5,
      reviews: 72,
      location: "Enugu, Nigeria",
      city: "Enugu",
      badge: "Popular",
      badgeColor: "#ff6900",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=90",
      avatar:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=200&q=85",
      tags: ["Home Decor", "Event Decor", "Space Planning"],
      verified: true,
    },

    {
      id: 6,
      name: "Yemi's Hair Studio",
      category: "Others",
      service: "Hair Stylist",
      rating: 4.7,
      reviews: 65,
      location: "Lagos, Nigeria",
      city: "Lagos",
      badge: "New",
      badgeColor: "#277de1",
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=90",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=85",
      tags: ["Braids", "Weaves", "Hair Treatment"],
      verified: true,
    },
  ];

  /* =========================================================
     CATEGORY DATA
  ========================================================= */

  const categories = [
    {
      name: "All Saved",
      count: vendors.length,
    },
    {
      name: "Tailors",
      count: vendors.filter(
        (vendor) => vendor.category === "Tailors"
      ).length,
    },
    {
      name: "Photographers",
      count: vendors.filter(
        (vendor) => vendor.category === "Photographers"
      ).length,
    },
    {
      name: "Decorators",
      count: vendors.filter(
        (vendor) => vendor.category === "Decorators"
      ).length,
    },
    {
      name: "Caterers",
      count: vendors.filter(
        (vendor) => vendor.category === "Caterers"
      ).length,
    },
    {
      name: "Others",
      count: vendors.filter(
        (vendor) => vendor.category === "Others"
      ).length,
    },
  ];

  /* =========================================================
     FILTER VENDORS
  ========================================================= */

  const filteredVendors = useMemo(() => {
    let result = vendors.filter((vendor) =>
      favorites.includes(vendor.id)
    );

    /* CATEGORY */

    if (activeCategory !== "All Saved") {
      result = result.filter(
        (vendor) => vendor.category === activeCategory
      );
    }

    /* MAIN SEARCH */

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      result = result.filter((vendor) => {
        return (
          vendor.name.toLowerCase().includes(query) ||
          vendor.service.toLowerCase().includes(query) ||
          vendor.category.toLowerCase().includes(query) ||
          vendor.city.toLowerCase().includes(query) ||
          vendor.tags.some((tag) =>
            tag.toLowerCase().includes(query)
          )
        );
      });
    }

    /* FILTER SEARCH */

    if (filterSearch.trim()) {
      const query = filterSearch.trim().toLowerCase();

      result = result.filter((vendor) => {
        return (
          vendor.name.toLowerCase().includes(query) ||
          vendor.service.toLowerCase().includes(query) ||
          vendor.category.toLowerCase().includes(query)
        );
      });
    }

    /* LOCATION */

    if (location !== "All Locations") {
      result = result.filter(
        (vendor) => vendor.city === location
      );
    }

    /* SERVICE CATEGORY */

    if (serviceCategory !== "All Categories") {
      result = result.filter(
        (vendor) => vendor.category === serviceCategory
      );
    }

    /* RATING */

    if (rating === "4.5+ and above") {
      result = result.filter(
        (vendor) => vendor.rating >= 4.5
      );
    } else if (rating === "4+ and above") {
      result = result.filter(
        (vendor) => vendor.rating >= 4
      );
    }

    /* VERIFIED */

    if (verifiedOnly) {
      result = result.filter(
        (vendor) => vendor.verified
      );
    }

    /* SORT */

    if (sortBy === "Highest Rated") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "Most Reviewed") {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    if (sortBy === "Most Saved") {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [
    activeCategory,
    search,
    filterSearch,
    location,
    serviceCategory,
    rating,
    verifiedOnly,
    sortBy,
    favorites,
  ]);

  /* =========================================================
     FAVORITES
  ========================================================= */

  const toggleFavorite = (id) => {
    setFavorites((previous) => {
      if (previous.includes(id)) {
        return previous.filter((item) => item !== id);
      }

      return [...previous, id];
    });
  };

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setActiveCategory("All Saved");
    setSearch("");
    setFilterSearch("");
    setLocation("All Locations");
    setServiceCategory("All Categories");
    setRating("4+ and above");
    setVerifiedOnly(false);
    setSortBy("Most Saved");
  };

  /* =========================================================
     ANIMATION VARIANTS
  ========================================================= */

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 25,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  /* =========================================================
     STYLES
  ========================================================= */

  const styles = {
    page: {
      width: "100%",
      minHeight: "100%",
      boxSizing: "border-box",
      padding: isMobile ? "14px" : "20px",
      background:
        "linear-gradient(135deg, #f8fbfe 0%, #f1f7fb 100%)",
      fontFamily:
        "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      color: "#0b2948",
    },

    header: {
      marginBottom: 14,
    },

    title: {
      margin: 0,
      fontSize: isMobile ? 25 : 30,
      fontWeight: 750,
      letterSpacing: "-1px",
      color: "#09294a",
    },

    subtitle: {
      margin: "4px 0 0",
      fontSize: 12,
      color: "#607a94",
    },

    categoriesWrapper: {
      width: "100%",
      overflowX: "auto",
      scrollbarWidth: "none",
      marginBottom: 13,
    },

    categories: {
      minWidth: "max-content",
      display: "flex",
      alignItems: "center",
      gap: 7,
      padding: 6,
      border: "1px solid #dfe9f2",
      borderRadius: 10,
      background: "rgba(255, 255, 255, 0.82)",
    },

    categoryButton: (active) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 3,
      border: "none",
      borderRadius: 18,
      padding: "10px 14px",
      background: active ? "#ff6900" : "transparent",
      color: active ? "#ffffff" : "#173c5e",
      fontSize: 10,
      fontWeight: active ? 700 : 550,
      cursor: "pointer",
      whiteSpace: "nowrap",
      transition: "all 0.2s ease",
    }),

    layout: {
      display: "grid",
      gridTemplateColumns: isTablet
        ? "1fr"
        : "minmax(0, 1fr) 220px",
      gap: 13,
      alignItems: "start",
    },

    main: {
      minWidth: 0,
    },

    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      marginBottom: 12,
      flexWrap: "wrap",
    },

    searchWrapper: {
      width: isMobile ? "100%" : 250,
      height: 40,
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "0 11px",
      boxSizing: "border-box",
      border: "1px solid #dce7f1",
      borderRadius: 9,
      background: "#ffffff",
    },

    input: {
      width: "100%",
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      color: "#173b5d",
      fontSize: 10,
    },

    filterButton: {
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: "0 13px",
      border: "1px solid #dce7f1",
      borderRadius: 9,
      background: "#ffffff",
      color: "#173b5d",
      fontSize: 10,
      fontWeight: 650,
      cursor: "pointer",
    },

    vendorGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : screenWidth <= 1250
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(3, minmax(0, 1fr))",
      gap: 12,
    },

    card: {
      minWidth: 0,
      overflow: "hidden",
      border: "1px solid #dfe8f1",
      borderRadius: 12,
      background: "#ffffff",
      boxShadow: "0 3px 14px rgba(15, 50, 80, 0.035)",
    },

    imageWrapper: {
      position: "relative",
      height: isMobile ? 190 : 140,
      margin: 8,
      overflow: "hidden",
      borderRadius: 9,
    },

    vendorImage: {
      width: "100%",
      height: "100%",
      display: "block",
      objectFit: "cover",
    },

    badge: (color) => ({
      position: "absolute",
      top: 9,
      left: 9,
      display: "flex",
      alignItems: "center",
      gap: 3,
      padding: "5px 8px",
      borderRadius: 8,
      background: color,
      color: "#ffffff",
      fontSize: 8,
      fontWeight: 750,
      boxShadow: "0 3px 10px rgba(0, 0, 0, 0.12)",
    }),

    favoriteButton: (active) => ({
      position: "absolute",
      top: 8,
      right: 8,
      width: 30,
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      borderRadius: "50%",
      background: "#ffffff",
      color: active ? "#ff3b30" : "#536d84",
      cursor: "pointer",
      boxShadow: "0 3px 10px rgba(0, 0, 0, 0.12)",
    }),

    cardBody: {
      padding: "2px 13px 13px",
    },

    identity: {
      display: "flex",
      alignItems: "center",
      gap: 9,
    },

    avatar: {
      width: 42,
      height: 42,
      flexShrink: 0,
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid #ffffff",
      boxShadow: "0 2px 7px rgba(0, 0, 0, 0.1)",
    },

    vendorName: {
      margin: 0,
      fontSize: 12,
      lineHeight: 1.3,
      fontWeight: 750,
      color: "#0b3156",
    },

    service: {
      margin: "3px 0 0",
      fontSize: 9,
      color: "#66819b",
    },

    info: {
      marginTop: 9,
      display: "flex",
      flexDirection: "column",
      gap: 5,
    },

    infoRow: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      color: "#67819a",
      fontSize: 9,
    },

    verified: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 3,
      padding: "4px 7px",
      borderRadius: 10,
      background: "#fff3ed",
      color: "#ff6900",
      fontSize: 8,
      fontWeight: 700,
      whiteSpace: "nowrap",
    },

    tags: {
      display: "flex",
      flexWrap: "wrap",
      gap: 5,
      marginTop: 9,
    },

    tag: {
      padding: "5px 7px",
      borderRadius: 12,
      background: "#f1f6fa",
      color: "#355875",
      fontSize: 8,
      whiteSpace: "nowrap",
    },

    actions: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginTop: 11,
    },

    messageButton: {
      height: 34,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      border: "none",
      borderRadius: 8,
      background: "#ff6900",
      color: "#ffffff",
      fontSize: 9,
      fontWeight: 700,
      cursor: "pointer",
    },

    bookButton: {
      height: 34,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      border: "1px solid #dce7f0",
      borderRadius: 8,
      background: "#ffffff",
      color: "#173b5d",
      fontSize: 9,
      fontWeight: 650,
      cursor: "pointer",
    },

    filterPanel: {
      padding: 14,
      border: "1px solid #dfe8f1",
      borderRadius: 11,
      background: "#ffffff",
      boxShadow: "0 4px 16px rgba(15, 50, 80, 0.035)",
    },

    filterHeading: {
      margin: 0,
      color: "#123555",
      fontSize: 14,
      fontWeight: 750,
    },

    filterSection: {
      marginTop: 19,
    },

    filterLabel: {
      display: "block",
      marginBottom: 8,
      color: "#173b5d",
      fontSize: 10,
      fontWeight: 700,
    },

    select: {
      width: "100%",
      height: 37,
      padding: "0 9px",
      boxSizing: "border-box",
      border: "1px solid #dce7f0",
      borderRadius: 8,
      outline: "none",
      background: "#ffffff",
      color: "#496780",
      fontSize: 9,
      cursor: "pointer",
    },

    stars: {
      display: "flex",
      alignItems: "center",
      gap: 1,
      color: "#ffac00",
    },

    clearButton: {
      width: "100%",
      height: 38,
      marginTop: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      border: "1px solid #ff9960",
      borderRadius: 8,
      background: "#ffffff",
      color: "#365775",
      fontSize: 10,
      fontWeight: 650,
      cursor: "pointer",
    },

    emptyState: {
      padding: 60,
      textAlign: "center",
      border: "1px solid #dfe8f1",
      borderRadius: 12,
      background: "#ffffff",
    },
  };

  /* =========================================================
     VENDOR CARD
  ========================================================= */

  const VendorCard = ({ vendor }) => {
    const isFavorite = favorites.includes(vendor.id);

    return (
      <motion.article
        layout
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        whileHover={{
          y: -4,
          boxShadow: "0 12px 28px rgba(15, 50, 80, 0.1)",
        }}
        style={styles.card}
      >
        {/* IMAGE */}

        <div style={styles.imageWrapper}>
          <motion.img
            src={vendor.image}
            alt={vendor.name}
            style={styles.vendorImage}
            whileHover={{ scale: 1.045 }}
            transition={{ duration: 0.45 }}
          />

          {/* BADGE */}

          <div style={styles.badge(vendor.badgeColor)}>
            <Star size={9} fill="currentColor" />
            {vendor.badge}
          </div>

          {/* FAVORITE */}

          <motion.button
            type="button"
            aria-label={
              isFavorite
                ? "Remove from saved vendors"
                : "Save vendor"
            }
            style={styles.favoriteButton(isFavorite)}
            onClick={() => toggleFavorite(vendor.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85 }}
          >
            <Heart
              size={16}
              fill={isFavorite ? "#ff3b30" : "none"}
            />
          </motion.button>
        </div>

        {/* CONTENT */}

        <div style={styles.cardBody}>
          <div style={styles.identity}>
            <img
              src={vendor.avatar}
              alt={`${vendor.name} profile`}
              style={styles.avatar}
            />

            <div style={{ minWidth: 0 }}>
              <h3 style={styles.vendorName}>
                {vendor.name}
              </h3>

              <p style={styles.service}>
                {vendor.service}
              </p>
            </div>
          </div>

          {/* INFORMATION */}

          <div style={styles.info}>
            <div style={styles.infoRow}>
              <Star
                size={12}
                fill="#ffac00"
                color="#ffac00"
              />

              <strong style={{ color: "#254968" }}>
                {vendor.rating}
              </strong>

              <span>
                ({vendor.reviews} reviews)
              </span>

              {vendor.verified && (
                <span style={styles.verified}>
                  <CheckCircle2 size={9} />
                  Verified
                </span>
              )}
            </div>

            <div style={styles.infoRow}>
              <MapPin size={11} />
              {vendor.location}
            </div>
          </div>

          {/* TAGS */}

          <div style={styles.tags}>
            {vendor.tags.map((tag) => (
              <span key={tag} style={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          {/* ACTIONS */}

          <div style={styles.actions}>
            <motion.button
              type="button"
              style={styles.messageButton}
              whileHover={{
                scale: 1.02,
                boxShadow:
                  "0 7px 18px rgba(255, 105, 0, 0.25)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageSquare size={12} />
              Message Vendor
            </motion.button>

            <motion.button
              type="button"
              style={styles.bookButton}
              whileHover={{
                borderColor: "#ff6900",
                color: "#ff6900",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <CalendarDays size={12} />
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.article>
    );
  };

  /* =========================================================
     FILTER PANEL
  ========================================================= */

  const FilterPanel = () => {
    return (
      <motion.aside
        style={styles.filterPanel}
        initial={{
          opacity: 0,
          x: 20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.35,
        }}
      >
        <h2 style={styles.filterHeading}>
          Filter Vendors
        </h2>

        {/* SEARCH */}

        <div style={styles.filterSection}>
          <label style={styles.filterLabel}>
            Search
          </label>

          <div
            style={{
              ...styles.searchWrapper,
              width: "100%",
            }}
          >
            <Search size={14} color="#66819a" />

            <input
              type="text"
              style={styles.input}
              placeholder="Search by name or service..."
              value={filterSearch}
              onChange={(event) =>
                setFilterSearch(event.target.value)
              }
            />
          </div>
        </div>

        {/* LOCATION */}

        <div style={styles.filterSection}>
          <label style={styles.filterLabel}>
            Location
          </label>

          <div style={{ position: "relative" }}>
            <MapPin
              size={13}
              color="#67839c"
              style={{
                position: "absolute",
                left: 9,
                top: 12,
                pointerEvents: "none",
              }}
            />

            <select
              value={location}
              onChange={(event) =>
                setLocation(event.target.value)
              }
              style={{
                ...styles.select,
                paddingLeft: 28,
              }}
            >
              <option value="All Locations">
                All Locations
              </option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Port Harcourt">
                Port Harcourt
              </option>
              <option value="Enugu">Enugu</option>
            </select>
          </div>
        </div>

        {/* SERVICE CATEGORY */}

        <div style={styles.filterSection}>
          <label style={styles.filterLabel}>
            Service Category
          </label>

          <div style={{ position: "relative" }}>
            <Grid3X3
              size={13}
              color="#67839c"
              style={{
                position: "absolute",
                left: 9,
                top: 12,
                pointerEvents: "none",
              }}
            />

            <select
              value={serviceCategory}
              onChange={(event) =>
                setServiceCategory(event.target.value)
              }
              style={{
                ...styles.select,
                paddingLeft: 28,
              }}
            >
              <option value="All Categories">
                All Categories
              </option>
              <option value="Tailors">Tailors</option>
              <option value="Photographers">
                Photographers
              </option>
              <option value="Decorators">
                Decorators
              </option>
              <option value="Caterers">
                Caterers
              </option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        {/* RATING */}

        <div style={styles.filterSection}>
          <label style={styles.filterLabel}>
            Rating
          </label>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <div style={styles.stars}>
              {[1, 2, 3, 4, 5].map((number) => (
                <Star
                  key={number}
                  size={11}
                  fill="#ffac00"
                  color="#ffac00"
                />
              ))}
            </div>

            <select
              value={rating}
              onChange={(event) =>
                setRating(event.target.value)
              }
              style={{
                ...styles.select,
                flex: 1,
              }}
            >
              <option value="4+ and above">
                4+ and above
              </option>

              <option value="4.5+ and above">
                4.5+ and above
              </option>
            </select>
          </div>
        </div>

        {/* VERIFICATION */}

        <div style={styles.filterSection}>
          <label style={styles.filterLabel}>
            Verification
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#52708d",
              fontSize: 10,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(event) =>
                setVerifiedOnly(event.target.checked)
              }
              style={{
                width: 16,
                height: 16,
                accentColor: "#ff6900",
                cursor: "pointer",
              }}
            />

            Verified only
          </label>
        </div>

        {/* SORT */}

        <div style={styles.filterSection}>
          <label style={styles.filterLabel}>
            Sort By
          </label>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
            style={styles.select}
          >
            <option value="Most Saved">
              Most Saved
            </option>

            <option value="Highest Rated">
              Highest Rated
            </option>

            <option value="Most Reviewed">
              Most Reviewed
            </option>
          </select>
        </div>

        {/* CLEAR FILTERS */}

        <motion.button
          type="button"
          style={styles.clearButton}
          onClick={clearFilters}
          whileHover={{
            background: "#fff7f2",
            borderColor: "#ff6900",
          }}
          whileTap={{
            scale: 0.97,
          }}
        >
          <RotateCcw size={13} />
          Clear Filters
        </motion.button>
      </motion.aside>
    );
  };

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <motion.main
      style={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      {/* PAGE HEADER */}

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
        transition={{
          duration: 0.4,
        }}
      >
        <h1 style={styles.title}>
          Saved Vendors
        </h1>

        <p style={styles.subtitle}>
          Your favorite vendors, always at your fingertips.
        </p>
      </motion.header>

      {/* CATEGORY FILTER */}

      <motion.div
        style={styles.categoriesWrapper}
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
      >
        <div style={styles.categories}>
          {categories.map((category) => {
            const active =
              activeCategory === category.name;

            return (
              <motion.button
                key={category.name}
                type="button"
                style={styles.categoryButton(active)}
                onClick={() =>
                  setActiveCategory(category.name)
                }
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                {category.name}

                <span style={{ opacity: 0.75 }}>
                  ({category.count})
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* MAIN LAYOUT */}

      <div style={styles.layout}>
        <section style={styles.main}>
          {/* TOOLBAR */}

          <div style={styles.toolbar}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: isMobile ? "100%" : "auto",
              }}
            >
              {/* SEARCH */}

              <div
                style={{
                  ...styles.searchWrapper,
                  width: isMobile ? "100%" : 250,
                }}
              >
                <Search
                  size={16}
                  color="#67839c"
                />

                <input
                  type="text"
                  style={styles.input}
                  placeholder="Search saved vendors..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />
              </div>

              {/* MOBILE FILTER */}

              {isTablet && (
                <motion.button
                  type="button"
                  style={styles.filterButton}
                  onClick={() =>
                    setShowMobileFilters(true)
                  }
                  whileTap={{
                    scale: 0.95,
                  }}
                >
                  <SlidersHorizontal size={15} />
                  Filters
                </motion.button>
              )}
            </div>

            <span
              style={{
                color: "#7189a0",
                fontSize: 10,
              }}
            >
              {filteredVendors.length} vendors
            </span>
          </div>

          {/* VENDOR GRID */}

          <AnimatePresence mode="popLayout">
            {filteredVendors.length > 0 ? (
              <motion.div
                layout
                style={styles.vendorGrid}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredVendors.map((vendor) => (
                  <VendorCard
                    key={vendor.id}
                    vendor={vendor}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                layout
                style={styles.emptyState}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
              >
                <Heart
                  size={42}
                  color="#a8bac9"
                  style={{
                    marginBottom: 10,
                  }}
                />

                <h3
                  style={{
                    margin: "0 0 5px",
                    color: "#244967",
                    fontSize: 16,
                  }}
                >
                  No vendors found
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#7890a6",
                    fontSize: 11,
                  }}
                >
                  Try changing your filters or search.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* DESKTOP FILTER */}

        {!isTablet && <FilterPanel />}
      </div>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ===================================================== */}

      <AnimatePresence>
        {showMobileFilters && (
          <>
            {/* BACKDROP */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setShowMobileFilters(false)
              }
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                background: "rgba(5, 25, 43, 0.45)",
                backdropFilter: "blur(3px)",
              }}
            />

            {/* DRAWER */}

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 26,
                stiffness: 280,
              }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 101,
                width: isMobile ? "88%" : 370,
                maxWidth: 390,
                padding: 15,
                boxSizing: "border-box",
                overflowY: "auto",
                background: "#ffffff",
                boxShadow:
                  "-12px 0 35px rgba(0, 0, 0, 0.13)",
              }}
            >
              {/* DRAWER HEADER */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  <Filter
                    size={18}
                    color="#ff6900"
                  />

                  <h2
                    style={{
                      margin: 0,
                      fontSize: 18,
                      color: "#123555",
                    }}
                  >
                    Filter Vendors
                  </h2>
                </div>

                <motion.button
                  type="button"
                  onClick={() =>
                    setShowMobileFilters(false)
                  }
                  whileTap={{
                    scale: 0.9,
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    borderRadius: "50%",
                    background: "#f1f5f8",
                    color: "#355775",
                    cursor: "pointer",
                  }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* FILTER CONTENT */}

              <FilterPanel />

              {/* APPLY */}

              <motion.button
                type="button"
                onClick={() =>
                  setShowMobileFilters(false)
                }
                whileHover={{
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                style={{
                  width: "100%",
                  height: 42,
                  marginTop: 12,
                  border: "none",
                  borderRadius: 9,
                  background: "#ff6900",
                  color: "#ffffff",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Apply Filters
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default CustomerSavedVendors;