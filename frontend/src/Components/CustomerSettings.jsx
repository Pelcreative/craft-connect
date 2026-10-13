import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Lock,
  Eye,
  ShieldCheck,
  ChevronRight,
  CalendarDays,
  MapPin,
  Phone,
  Camera,
  Pencil,
  Save,
  HelpCircle,
  Megaphone,
  MessageSquare,
  Star,
  WalletCards,
  CheckCircle2,
  KeyRound,
  Database,
  Ban,
  Settings2,
} from "lucide-react";

const CustomerSettings = () => {
  /* =========================================================
     STATE
  ========================================================= */

  const [activeSection, setActiveSection] = useState("Profile");

  const [profile, setProfile] = useState({
    fullName: "Adaeze Okafor",
    email: "adaeze.okafor@gmail.com",
    phone: "+234 801 234 5678",
    location: "Lagos, Nigeria",
    bio: "Lover of beautiful designs, great food and amazing crafts. Always excited to support local businesses!",
  });

  const [notifications, setNotifications] = useState({
    bookings: true,
    messages: true,
    payments: true,
    reviews: true,
    promotions: false,
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [editing, setEditing] = useState(true);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  /* =========================================================
     RESPONSIVE
  ========================================================= */

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 650;
  const isTablet = windowWidth > 650 && windowWidth <= 1050;

  /* =========================================================
     SETTINGS MENU
  ========================================================= */

  const menuItems = [
    {
      label: "Profile",
      description: "Manage your personal information",
      icon: User,
    },
    {
      label: "Security",
      description: "Password and login settings",
      icon: Shield,
    },
    {
      label: "Notifications",
      description: "Choose what you want to be notified about",
      icon: Bell,
    },
    {
      label: "Payment Methods",
      description: "Manage your payment options",
      icon: CreditCard,
    },
    {
      label: "Privacy & Safety",
      description: "Control your data and account privacy",
      icon: ShieldCheck,
    },
  ];

  /* =========================================================
     STYLES
  ========================================================= */

  const styles = {
    page: {
      width: "100%",
      minHeight: "100vh",
      boxSizing: "border-box",
      padding: isMobile
        ? "16px 12px 30px"
        : isTablet
        ? "20px 16px 30px"
        : "24px 22px 35px",

      background:
        "linear-gradient(135deg, #f8fbfe 0%, #f2f7fb 55%, #f8fbfe 100%)",

      fontFamily:
        "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

      color: "#102f4f",
      overflowX: "hidden",
    },

    header: {
      marginBottom: isMobile ? 15 : 18,
    },

    title: {
      margin: 0,
      fontSize: isMobile ? 26 : 31,
      lineHeight: 1.1,
      fontWeight: 800,
      letterSpacing: "-1px",
      color: "#0c2d50",
    },

    subtitle: {
      margin: "6px 0 0",
      fontSize: isMobile ? 12 : 13,
      lineHeight: 1.5,
      color: "#55708d",
    },

    mainGrid: {
      display: "grid",

      gridTemplateColumns: isMobile
        ? "1fr"
        : isTablet
        ? "210px minmax(0, 1fr)"
        : "260px minmax(0, 1fr) 360px",

      gap: isMobile ? 14 : 16,

      alignItems: "start",
      width: "100%",
      boxSizing: "border-box",
    },

    card: {
      width: "100%",
      boxSizing: "border-box",
      border: "1px solid #dce8f2",
      borderRadius: 12,
      background: "rgba(255,255,255,.96)",
      boxShadow: "0 6px 24px rgba(20,62,95,.035)",
    },

    /* =========================================================
       LEFT MENU
    ========================================================= */

    menuCard: {
      padding: isMobile ? 6 : 8,
      overflow: "hidden",
    },

    menuItem: (active) => ({
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: isMobile ? 9 : 11,

      padding: isMobile
        ? "11px 10px"
        : "13px 11px",

      border: "none",

      borderLeft: active
        ? "3px solid #ff6900"
        : "3px solid transparent",

      borderRadius: 8,

      background: active
        ? "linear-gradient(135deg, #fff5ed, #fff9f5)"
        : "transparent",

      color: active ? "#ff6900" : "#173a5c",

      cursor: "pointer",
      textAlign: "left",

      transition: "all .2s ease",

      boxSizing: "border-box",
      minWidth: 0,
    }),

    menuIcon: (active) => ({
      width: isMobile ? 36 : 38,
      height: isMobile ? 36 : 38,
      minWidth: isMobile ? 36 : 38,

      borderRadius: "50%",

      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      background: active ? "#fff1e6" : "#f2f6fa",
      color: active ? "#ff6900" : "#173b5e",
    }),

    menuText: {
      minWidth: 0,
      flex: 1,
    },

    menuTitle: {
      margin: 0,
      fontSize: isMobile ? 12 : 13,
      lineHeight: 1.3,
      fontWeight: 650,
    },

    menuDescription: {
      margin: "4px 0 0",
      fontSize: isMobile ? 9 : 9.5,
      color: "#7890a7",
      lineHeight: 1.35,
    },

    /* =========================================================
       PROFILE
    ========================================================= */

    profileCard: {
      padding: isMobile ? 14 : 18,
      minWidth: 0,
    },

    cardHeader: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: 18,
    },

    cardHeading: {
      margin: 0,
      fontSize: isMobile ? 16 : 17,
      lineHeight: 1.3,
      fontWeight: 750,
      color: "#143656",
    },

    cardDescription: {
      margin: "4px 0 0",
      fontSize: isMobile ? 9.5 : 10,
      color: "#7a91a8",
      lineHeight: 1.45,
    },

    editButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,

      height: 34,
      padding: "0 11px",

      borderRadius: 8,
      border: "1px solid #dbe6f0",
      background: "#fff",

      color: "#244c70",
      fontSize: 9.5,
      fontWeight: 650,

      cursor: "pointer",
      flexShrink: 0,
    },

    profileTop: {
      display: "flex",
      gap: 18,
      marginBottom: 18,
    },

    avatarWrapper: {
      position: "relative",
      flexShrink: 0,
    },

    avatar: {
      width: isMobile ? 82 : 105,
      height: isMobile ? 82 : 105,

      objectFit: "cover",
      borderRadius: "50%",

      display: "block",

      border: "4px solid #fff",

      boxShadow: "0 5px 18px rgba(20,60,90,.1)",
    },

    cameraButton: {
      position: "absolute",
      right: 0,
      bottom: 0,

      width: 30,
      height: 30,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      borderRadius: "50%",
      border: "2px solid #fff",

      background: "#fff",
      color: "#173d61",

      cursor: "pointer",

      boxShadow: "0 2px 8px rgba(0,0,0,.08)",
    },

    profileName: {
      margin: 0,
      fontSize: isMobile ? 18 : 19,
      fontWeight: 750,
      color: "#112f4e",
    },

    profileEmail: {
      margin: "6px 0",
      fontSize: isMobile ? 10 : 11,
      color: "#6b849d",
      wordBreak: "break-word",
    },

    customerBadge: {
      display: "inline-flex",
      alignItems: "center",

      padding: "5px 11px",

      borderRadius: 14,

      background: "#fff1e5",
      color: "#ff6900",

      fontSize: 9,
      fontWeight: 700,
    },

    /* =========================================================
       INFORMATION STRIP
    ========================================================= */

    infoStrip: {
      display: "grid",

      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(3, 1fr)",

      border: "1px solid #e0eaf2",
      borderRadius: 9,

      background: "#f9fbfd",

      marginBottom: 22,
      overflow: "hidden",
    },

    infoItem: {
      display: "flex",
      alignItems: "center",
      gap: 9,

      padding: "13px 12px",

      minWidth: 0,

      borderRight: isMobile
        ? "none"
        : "1px solid #e3ebf2",

      borderBottom: isMobile
        ? "1px solid #e3ebf2"
        : "none",
    },

    infoIcon: {
      width: 33,
      height: 33,
      minWidth: 33,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      borderRadius: "50%",

      background: "#f0f5fa",
      color: "#284d70",
    },

    infoLabel: {
      margin: 0,
      fontSize: 8.5,
      color: "#58728d",
    },

    infoValue: {
      margin: "5px 0 0",
      fontSize: 9.5,
      color: "#234665",
      fontWeight: 600,
      wordBreak: "break-word",
    },

    /* =========================================================
       FORM
    ========================================================= */

    sectionTitle: {
      margin: "0 0 13px",
      fontSize: 14,
      color: "#173a5c",
      fontWeight: 750,
    },

    formGrid: {
      display: "grid",

      gridTemplateColumns: isMobile
        ? "1fr"
        : "1fr 1fr",

      gap: 15,
    },

    field: {
      minWidth: 0,
    },

    label: {
      display: "block",
      marginBottom: 6,
      fontSize: 9,
      color: "#59738d",
      fontWeight: 600,
    },

    input: {
      width: "100%",
      height: 39,

      padding: "0 12px",

      boxSizing: "border-box",

      border: "1px solid #d8e5ef",
      borderRadius: 8,

      outline: "none",

      background: "#fff",
      color: "#234767",

      fontSize: 10,

      transition: "border .2s ease",
    },

    textarea: {
      width: "100%",
      minHeight: 88,

      padding: 12,

      boxSizing: "border-box",

      border: "1px solid #d8e5ef",
      borderRadius: 8,

      outline: "none",

      resize: "vertical",

      fontFamily: "inherit",

      background: "#fff",
      color: "#234767",

      fontSize: 10,
      lineHeight: 1.5,
    },

    bioField: {
      gridColumn: isMobile ? "auto" : "1 / -1",
    },

    charCount: {
      textAlign: "right",
      marginTop: 5,
      fontSize: 8.5,
      color: "#7d94aa",
    },

    formActions: {
      display: "flex",

      flexDirection: isMobile
        ? "column-reverse"
        : "row",

      justifyContent: "flex-end",

      gap: 9,

      marginTop: 20,
      paddingTop: 17,

      borderTop: "1px solid #edf2f6",
    },

    cancelButton: {
      height: 40,

      width: isMobile ? "100%" : 110,

      borderRadius: 8,

      border: "1px solid #dbe6ef",

      background: "#fff",
      color: "#234968",

      fontSize: 9.5,
      fontWeight: 650,

      cursor: "pointer",
    },

    saveButton: {
      height: 40,

      width: isMobile ? "100%" : "auto",
      minWidth: isMobile ? "100%" : 180,

      padding: "0 18px",

      border: "none",
      borderRadius: 8,

      background: "#ff6900",

      color: "#fff",

      fontSize: 9.5,
      fontWeight: 700,

      cursor: "pointer",

      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",

      gap: 7,
    },

    /* =========================================================
       RIGHT COLUMN
    ========================================================= */

    rightColumn: {
      display: "flex",
      flexDirection: "column",
      gap: 13,

      minWidth: 0,
      width: "100%",
    },

    rightCard: {
      padding: 17,
    },

    rightHeader: {
      display: "flex",
      alignItems: "flex-start",
      gap: 11,

      marginBottom: 13,
    },

    rightHeaderIcon: {
      color: "#173c60",
      flexShrink: 0,
    },

    rightTitle: {
      margin: 0,
      fontSize: 14,
      color: "#143656",
      fontWeight: 750,
      lineHeight: 1.3,
    },

    rightDescription: {
      margin: "4px 0 0",
      fontSize: 9,
      color: "#7a91a8",
      lineHeight: 1.4,
    },

    /* =========================================================
       NOTIFICATIONS
    ========================================================= */

    notificationItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",

      gap: 12,

      padding: "11px 0",

      borderBottom: "1px solid #edf2f6",
    },

    notificationLeft: {
      display: "flex",
      alignItems: "center",

      gap: 10,

      minWidth: 0,
      flex: 1,
    },

    smallIcon: {
      width: 36,
      height: 36,
      minWidth: 36,

      borderRadius: "50%",

      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      background: "#f2f6fa",
      color: "#193e62",
    },

    notificationTitle: {
      margin: 0,
      fontSize: 10,
      color: "#244565",
      fontWeight: 650,
    },

    notificationDescription: {
      margin: "3px 0 0",
      fontSize: 8.5,
      color: "#7d94ab",
      lineHeight: 1.35,
    },

    toggle: (active) => ({
      width: 34,
      height: 19,

      minWidth: 34,

      border: "none",
      borderRadius: 20,

      padding: 2,

      background: active
        ? "#ff6900"
        : "#dce5ed",

      cursor: "pointer",

      display: "flex",
      alignItems: "center",

      justifyContent: active
        ? "flex-end"
        : "flex-start",
    }),

    toggleCircle: {
      width: 15,
      height: 15,

      borderRadius: "50%",

      background: "#fff",

      boxShadow: "0 1px 3px rgba(0,0,0,.15)",
    },

    /* =========================================================
       SECURITY
    ========================================================= */

    securityItem: {
      display: "flex",
      alignItems: "center",

      gap: 10,

      padding: "12px 0",

      borderBottom: "1px solid #edf2f6",

      cursor: "pointer",
    },

    securityText: {
      flex: 1,
      minWidth: 0,
    },

    securityTitle: {
      margin: 0,
      fontSize: 10,
      color: "#244565",
      fontWeight: 650,
    },

    securityDescription: {
      margin: "3px 0 0",
      fontSize: 8.5,
      color: "#7d94ab",
      lineHeight: 1.35,
    },

    /* =========================================================
       QUICK ACTIONS
    ========================================================= */

    quickGrid: {
      display: "grid",

      gridTemplateColumns: "1fr 1fr",

      gap: 9,
    },

    quickButton: {
      minHeight: 58,

      border: "1px solid #dce7f0",
      borderRadius: 8,

      background: "#fff",

      display: "flex",
      alignItems: "center",

      gap: 8,

      padding: "8px 10px",

      color: "#203f5e",

      fontSize: 9,
      fontWeight: 650,

      cursor: "pointer",

      textAlign: "left",
    },

    /* =========================================================
       OTHER SECTIONS
    ========================================================= */

    otherSection: {
      minHeight: isMobile ? 280 : 330,

      padding: isMobile ? 22 : 35,

      display: "flex",
      flexDirection: "column",

      alignItems: "center",
      justifyContent: "center",

      textAlign: "center",
    },

    /* =========================================================
       SUCCESS
    ========================================================= */

    success: {
      position: "fixed",

      zIndex: 100,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      gap: 9,

      padding: "12px 17px",

      borderRadius: 10,

      background: "#103c2d",
      color: "#fff",

      boxShadow: "0 10px 30px rgba(0,0,0,.18)",

      fontSize: 10,
      fontWeight: 650,

      boxSizing: "border-box",
    },
  };

  /* =========================================================
     HANDLERS
  ========================================================= */

  const updateProfile = (key, value) => {
    setProfile((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const toggleNotification = (key) => {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const saveChanges = () => {
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  /* =========================================================
     PROFILE INFORMATION
  ========================================================= */

  const ProfileInformation = () => (
    <motion.section
      key="profile"
      style={styles.card}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div style={styles.profileCard}>

        {/* HEADER */}
        <div style={styles.cardHeader}>
          <div style={{ minWidth: 0 }}>
            <h2 style={styles.cardHeading}>
              Profile Information
            </h2>

            <p style={styles.cardDescription}>
              Update your personal details and profile picture.
            </p>
          </div>

          <motion.button
            type="button"
            style={styles.editButton}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setEditing((previous) => !previous)}
          >
            <Pencil size={12} />

            {editing ? "Editing" : "Edit"}
          </motion.button>
        </div>

        {/* PROFILE TOP */}
        <div
          style={{
            ...styles.profileTop,

            flexDirection: isMobile
              ? "column"
              : "row",

            alignItems: isMobile
              ? "flex-start"
              : "center",
          }}
        >
          <div style={styles.avatarWrapper}>
            <img
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=90"
              alt="Customer profile"
              style={styles.avatar}
            />

            <button
              type="button"
              aria-label="Change profile photo"
              style={styles.cameraButton}
            >
              <Camera size={14} />
            </button>
          </div>

          <div style={{ minWidth: 0 }}>
            <h3 style={styles.profileName}>
              Adaeze Okafor
            </h3>

            <p style={styles.profileEmail}>
              adaeze.okafor@gmail.com
            </p>

            <span style={styles.customerBadge}>
              Customer
            </span>
          </div>
        </div>

        {/* INFORMATION STRIP */}
        <div style={styles.infoStrip}>

          <div style={styles.infoItem}>
            <div style={styles.infoIcon}>
              <Phone size={15} />
            </div>

            <div style={{ minWidth: 0 }}>
              <p style={styles.infoLabel}>
                Phone Number
              </p>

              <p style={styles.infoValue}>
                +234 801 234 5678
              </p>
            </div>
          </div>

          <div style={styles.infoItem}>
            <div style={styles.infoIcon}>
              <MapPin size={15} />
            </div>

            <div style={{ minWidth: 0 }}>
              <p style={styles.infoLabel}>
                Location
              </p>

              <p style={styles.infoValue}>
                Lagos, Nigeria
              </p>
            </div>
          </div>

          <div
            style={{
              ...styles.infoItem,

              borderRight: "none",

              borderBottom: isMobile
                ? "none"
                : "none",
            }}
          >
            <div style={styles.infoIcon}>
              <CalendarDays size={15} />
            </div>

            <div style={{ minWidth: 0 }}>
              <p style={styles.infoLabel}>
                Member Since
              </p>

              <p style={styles.infoValue}>
                May 2025
              </p>
            </div>
          </div>
        </div>

        {/* PERSONAL DETAILS */}
        <h3 style={styles.sectionTitle}>
          Personal Details
        </h3>

        <div style={styles.formGrid}>

          {/* NAME */}
          <div style={styles.field}>
            <label style={styles.label}>
              Full Name
            </label>

            <input
              type="text"
              value={profile.fullName}
              disabled={!editing}
              onChange={(event) =>
                updateProfile(
                  "fullName",
                  event.target.value
                )
              }
              style={{
                ...styles.input,
                background: editing
                  ? "#fff"
                  : "#f8fafc",
              }}
            />
          </div>

          {/* EMAIL */}
          <div style={styles.field}>
            <label style={styles.label}>
              Email Address
            </label>

            <input
              type="email"
              value={profile.email}
              disabled={!editing}
              onChange={(event) =>
                updateProfile(
                  "email",
                  event.target.value
                )
              }
              style={{
                ...styles.input,
                background: editing
                  ? "#fff"
                  : "#f8fafc",
              }}
            />
          </div>

          {/* PHONE */}
          <div style={styles.field}>
            <label style={styles.label}>
              Phone Number
            </label>

            <input
              type="tel"
              value={profile.phone}
              disabled={!editing}
              onChange={(event) =>
                updateProfile(
                  "phone",
                  event.target.value
                )
              }
              style={{
                ...styles.input,
                background: editing
                  ? "#fff"
                  : "#f8fafc",
              }}
            />
          </div>

          {/* LOCATION */}
          <div style={styles.field}>
            <label style={styles.label}>
              Location
            </label>

            <select
              value={profile.location}
              disabled={!editing}
              onChange={(event) =>
                updateProfile(
                  "location",
                  event.target.value
                )
              }
              style={{
                ...styles.input,
                background: editing
                  ? "#fff"
                  : "#f8fafc",
              }}
            >
              <option>Lagos, Nigeria</option>
              <option>Abuja, Nigeria</option>
              <option>Ibadan, Nigeria</option>
              <option>Port Harcourt, Nigeria</option>
              <option>Kano, Nigeria</option>
            </select>
          </div>

          {/* BIO */}
          <div
            style={{
              ...styles.field,
              ...styles.bioField,
            }}
          >
            <label style={styles.label}>
              Bio
            </label>

            <textarea
              value={profile.bio}
              disabled={!editing}
              maxLength={200}
              onChange={(event) =>
                updateProfile(
                  "bio",
                  event.target.value
                )
              }
              style={{
                ...styles.textarea,
                background: editing
                  ? "#fff"
                  : "#f8fafc",
              }}
            />

            <div style={styles.charCount}>
              {profile.bio.length}/200
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div style={styles.formActions}>
          <motion.button
            type="button"
            style={styles.cancelButton}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setEditing(false)}
          >
            Cancel
          </motion.button>

          <motion.button
            type="button"
            style={styles.saveButton}
            whileHover={{
              y: -1,
              boxShadow:
                "0 8px 20px rgba(255,105,0,.22)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={saveChanges}
          >
            <Save size={13} />
            Save Changes
          </motion.button>
        </div>
      </div>
    </motion.section>
  );

  /* =========================================================
     NOTIFICATION PREFERENCES
  ========================================================= */

  const NotificationPreferences = () => {
    const notificationItems = [
      {
        key: "bookings",
        title: "Booking Updates",
        description: "New bookings, status changes",
        icon: CalendarDays,
      },
      {
        key: "messages",
        title: "Messages",
        description: "New messages from vendors",
        icon: MessageSquare,
      },
      {
        key: "payments",
        title: "Payments",
        description: "Payment confirmations, refunds",
        icon: WalletCards,
      },
      {
        key: "reviews",
        title: "Review Reminders",
        description: "Reminders to leave a review",
        icon: Star,
      },
      {
        key: "promotions",
        title: "Promotions",
        description: "Special offers and discounts",
        icon: Megaphone,
      },
    ];

    return (
      <motion.section
        style={{
          ...styles.card,
          ...styles.rightCard,
        }}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -8 }}
        transition={{ duration: 0.3 }}
      >
        <div style={styles.rightHeader}>
          <Bell
            size={19}
            style={styles.rightHeaderIcon}
          />

          <div>
            <h2 style={styles.rightTitle}>
              Notification Preferences
            </h2>

            <p style={styles.rightDescription}>
              Choose what you want to be notified about.
            </p>
          </div>
        </div>

        {notificationItems.map((item, index) => {
          const Icon = item.icon;
          const active = notifications[item.key];

          return (
            <div
              key={item.key}
              style={{
                ...styles.notificationItem,

                borderBottom:
                  index ===
                  notificationItems.length - 1
                    ? "none"
                    : "1px solid #edf2f6",
              }}
            >
              <div style={styles.notificationLeft}>
                <div style={styles.smallIcon}>
                  <Icon size={16} />
                </div>

                <div style={{ minWidth: 0 }}>
                  <p style={styles.notificationTitle}>
                    {item.title}
                  </p>

                  <p
                    style={
                      styles.notificationDescription
                    }
                  >
                    {item.description}
                  </p>
                </div>
              </div>

              <motion.button
                type="button"
                aria-label={`Toggle ${item.title}`}
                style={styles.toggle(active)}
                onClick={() =>
                  toggleNotification(item.key)
                }
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  style={styles.toggleCircle}
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              </motion.button>
            </div>
          );
        })}
      </motion.section>
    );
  };

  /* =========================================================
     PRIVACY & SECURITY
  ========================================================= */

  const PrivacySecurity = () => {
    const items = [
      {
        title: "Two-Factor Authentication",
        description: "Add an extra layer of security",
        icon: KeyRound,
      },
      {
        title: "Data Privacy",
        description: "Control how your data is used",
        icon: Database,
      },
      {
        title: "Blocked Vendors",
        description: "Manage your blocked vendors",
        icon: Ban,
      },
    ];

    return (
      <motion.section
        style={{
          ...styles.card,
          ...styles.rightCard,
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={styles.rightHeader}>
          <Lock
            size={18}
            style={styles.rightHeaderIcon}
          />

          <div>
            <h2 style={styles.rightTitle}>
              Privacy & Security
            </h2>

            <p style={styles.rightDescription}>
              Keep your account safe and your data private.
            </p>
          </div>
        </div>

        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              style={{
                ...styles.securityItem,

                borderBottom:
                  index === items.length - 1
                    ? "none"
                    : "1px solid #edf2f6",
              }}
              whileHover={{ x: 3 }}
            >
              <Icon
                size={17}
                color="#24496b"
              />

              <div style={styles.securityText}>
                <p style={styles.securityTitle}>
                  {item.title}
                </p>

                <p
                  style={
                    styles.securityDescription
                  }
                >
                  {item.description}
                </p>
              </div>

              <ChevronRight
                size={15}
                color="#7d95ac"
              />
            </motion.div>
          );
        })}
      </motion.section>
    );
  };

  /* =========================================================
     QUICK ACTIONS
  ========================================================= */

  const QuickActions = () => (
    <motion.section
      style={{
        ...styles.card,
        ...styles.rightCard,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div style={styles.rightHeader}>
        <Settings2
          size={18}
          style={styles.rightHeaderIcon}
        />

        <div>
          <h2 style={styles.rightTitle}>
            Quick Actions
          </h2>

          <p style={styles.rightDescription}>
            Need to do something fast?
          </p>
        </div>
      </div>

      <div style={styles.quickGrid}>
        <motion.button
          type="button"
          style={styles.quickButton}
          whileHover={{
            y: -2,
            boxShadow:
              "0 5px 15px rgba(20,60,90,.07)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          <div style={styles.smallIcon}>
            <Lock size={15} />
          </div>

          Change Password
        </motion.button>

        <motion.button
          type="button"
          style={styles.quickButton}
          whileHover={{
            y: -2,
            boxShadow:
              "0 5px 15px rgba(20,60,90,.07)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          <div style={styles.smallIcon}>
            <HelpCircle size={15} />
          </div>

          Help & Support
        </motion.button>
      </div>
    </motion.section>
  );

  /* =========================================================
     OTHER SETTINGS SECTIONS
  ========================================================= */

  const OtherSection = ({
    title,
    description,
    icon: Icon,
  }) => (
    <motion.section
      style={{
        ...styles.card,
        ...styles.otherSection,
      }}
      initial={{
        opacity: 0,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.98,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <div
        style={{
          width: 62,
          height: 62,

          borderRadius: "50%",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          background: "#fff2e8",
          color: "#ff6900",

          marginBottom: 15,
        }}
      >
        <Icon size={27} />
      </div>

      <h2
        style={{
          margin: 0,
          color: "#153856",
          fontSize: 18,
          lineHeight: 1.3,
        }}
      >
        {title}
      </h2>

      <p
        style={{
          maxWidth: 420,

          margin: "8px 0 18px",

          color: "#7189a0",

          fontSize: 11,
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>

      <button
        type="button"
        style={{
          ...styles.saveButton,
          width: isMobile ? "100%" : "auto",
          minWidth: isMobile ? "100%" : 170,
        }}
      >
        Manage Settings
        <ChevronRight size={14} />
      </button>
    </motion.section>
  );

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <motion.main
        style={styles.page}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        {/* PAGE HEADER */}
        <motion.header
          style={styles.header}
          initial={{
            opacity: 0,
            y: -12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
          }}
        >
          <h1 style={styles.title}>
            Settings
          </h1>

          <p style={styles.subtitle}>
            Manage your account, preferences and security settings.
          </p>
        </motion.header>

        {/* SETTINGS LAYOUT */}
        <div style={styles.mainGrid}>

          {/* LEFT MENU */}
          <motion.aside
            style={{
              ...styles.card,
              ...styles.menuCard,
            }}
            initial={{
              opacity: 0,
              x: -15,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.35,
            }}
          >
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active =
                activeSection === item.label;

              return (
                <motion.button
                  key={item.label}
                  type="button"
                  style={styles.menuItem(active)}
                  onClick={() =>
                    setActiveSection(item.label)
                  }
                  whileHover={{
                    x: active ? 0 : 2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  <div style={styles.menuIcon(active)}>
                    <Icon size={18} />
                  </div>

                  <div style={styles.menuText}>
                    <p style={styles.menuTitle}>
                      {item.label}
                    </p>

                    <p
                      style={
                        styles.menuDescription
                      }
                    >
                      {item.description}
                    </p>
                  </div>

                  {isMobile && (
                    <ChevronRight
                      size={15}
                      color={
                        active
                          ? "#ff6900"
                          : "#8ca0b4"
                      }
                      style={{
                        marginLeft: "auto",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.aside>

          {/* CENTER / MAIN CONTENT */}
          <div
            style={{
              minWidth: 0,
              width: "100%",
            }}
          >
            <AnimatePresence mode="wait">

              {activeSection === "Profile" && (
                <ProfileInformation />
              )}

              {activeSection === "Security" && (
                <OtherSection
                  title="Security Settings"
                  description="Protect your account with password controls, two-factor authentication and other security options."
                  icon={ShieldCheck}
                />
              )}

              {activeSection === "Notifications" && (
                <NotificationPreferences />
              )}

              {activeSection === "Payment Methods" && (
                <OtherSection
                  title="Payment Methods"
                  description="Manage your saved cards, payment options and preferred payment method for your bookings."
                  icon={CreditCard}
                />
              )}

              {activeSection === "Privacy & Safety" && (
                <OtherSection
                  title="Privacy & Safety"
                  description="Manage your privacy preferences, account visibility and control how your information is handled."
                  icon={Eye}
                />
              )}

            </AnimatePresence>
          </div>

          {/* DESKTOP RIGHT COLUMN */}
          {!isMobile && !isTablet && (
            <motion.aside
              style={styles.rightColumn}
              initial={{
                opacity: 0,
                x: 15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.35,
              }}
            >
              <NotificationPreferences />

              <PrivacySecurity />

              <QuickActions />
            </motion.aside>
          )}
        </div>

        {/* MOBILE PROFILE EXTRAS */}
        {isMobile &&
          activeSection === "Profile" && (
            <motion.div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginTop: 14,
              }}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <NotificationPreferences />

              <PrivacySecurity />

              <QuickActions />
            </motion.div>
          )}

        {/* TABLET EXTRAS */}
        {isTablet &&
          activeSection === "Profile" && (
            <motion.div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: 14,
                marginTop: 14,
              }}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <NotificationPreferences />

              <PrivacySecurity />

              <div
                style={{
                  gridColumn: "1 / -1",
                }}
              >
                <QuickActions />
              </div>
            </motion.div>
          )}
      </motion.main>

      {/* SUCCESS MESSAGE */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            style={{
              ...styles.success,

              left: isMobile
                ? 14
                : "auto",

              right: isMobile
                ? 14
                : 20,

              bottom: isMobile
                ? 14
                : 20,
            }}
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
          >
            <CheckCircle2 size={16} />

            Changes saved successfully.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomerSettings;