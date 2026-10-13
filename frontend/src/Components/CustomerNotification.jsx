import  { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  BellRing,
  CalendarCheck,
  CalendarX,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  HelpCircle,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Smartphone,
   X,
  Check,
} from "lucide-react";

const CustomerNotification = () => {
  /* =========================================================
     STATE
  ========================================================= */

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsEnabled, setNotificationsEnabled] =
    useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Booking Confirmed",
      message:
        "Your booking with Zainab's Fashion Hub for Custom Ankara Dress has been confirmed.",
      date: "May 28, 2025",
      time: "10:24 AM",
      type: "Booking",
      read: false,
      highlighted: true,
      icon: CalendarCheck,
      iconColor: "#ff6900",
      iconBackground: "#fff0e4",
    },

    {
      id: 2,
      title: "New Message",
      message:
        "Zainab's Fashion Hub sent you a message: “Hi Adaeze, I've received your order...”",
      date: "May 28, 2025",
      time: "09:12 AM",
      type: "Message",
      read: false,
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=90",
      icon: MessageSquare,
      iconColor: "#1683ff",
      iconBackground: "#eaf4ff",
    },

    {
      id: 3,
      title: "Payment Successful",
      message:
        "Your payment of ₦25,000 for Custom Ankara Dress was successful.",
      date: "May 27, 2025",
      time: "04:30 PM",
      type: "Payment",
      read: true,
      icon: CreditCard,
      iconColor: "#1683ff",
      iconBackground: "#eaf4ff",
    },

    {
      id: 4,
      title: "Review Reminder",
      message:
        "Don't forget to leave a review for your recent booking with Tolu Events & Decor.",
      date: "May 26, 2025",
      time: "11:15 AM",
      type: "Review",
      read: true,
      icon: Star,
      iconColor: "#ff6900",
      iconBackground: "#fff4e8",
    },

    {
      id: 5,
      title: "System Update",
      message:
        "We've improved our platform for a better experience. Check out the new features!",
      date: "May 25, 2025",
      time: "06:45 PM",
      type: "System",
      read: true,
      icon: Settings,
      iconColor: "#173b60",
      iconBackground: "#edf3f9",
    },

    {
      id: 6,
      title: "New Message",
      message:
        "Emeka's Photography sent you a message: “The photos are ready, check your inbox.”",
      date: "May 24, 2025",
      time: "02:20 PM",
      type: "Message",
      read: false,
      icon: MessageSquare,
      iconColor: "#1683ff",
      iconBackground: "#eaf4ff",
    },

    {
      id: 7,
      title: "Booking Cancelled",
      message:
        "Your booking with Chinonso's Catering has been cancelled by the vendor.",
      date: "May 22, 2025",
      time: "09:10 AM",
      type: "Booking",
      read: true,
      icon: CalendarX,
      iconColor: "#ff4141",
      iconBackground: "#fff0f0",
    },

    {
      id: 8,
      title: "New Review",
      message:
        "You received a 5-star review from Chidimma for your service.",
      date: "May 21, 2025",
      time: "07:32 PM",
      type: "Review",
      read: true,
      icon: Star,
      iconColor: "#ffad00",
      iconBackground: "#fff8e8",
    },

    {
      id: 9,
      title: "Booking Reminder",
      message:
        "Your appointment with Glory's Interior Decor is tomorrow at 10:00 AM.",
      date: "May 20, 2025",
      time: "08:00 AM",
      type: "Booking",
      read: true,
      icon: Clock3,
      iconColor: "#ff6900",
      iconBackground: "#fff0e4",
    },

    {
      id: 10,
      title: "Payment Reminder",
      message:
        "Your outstanding payment for your recent booking is due soon.",
      date: "May 19, 2025",
      time: "01:45 PM",
      type: "Payment",
      read: true,
      icon: CreditCard,
      iconColor: "#7b45e8",
      iconBackground: "#f3ebff",
    },

    {
      id: 11,
      title: "New Message",
      message:
        "Yemi's Hair Studio replied to your booking inquiry.",
      date: "May 18, 2025",
      time: "10:10 AM",
      type: "Message",
      read: true,
      icon: MessageSquare,
      iconColor: "#1683ff",
      iconBackground: "#eaf4ff",
    },

    {
      id: 12,
      title: "Security Update",
      message:
        "Your account security settings have been successfully updated.",
      date: "May 17, 2025",
      time: "03:22 PM",
      type: "System",
      read: true,
      icon: ShieldCheck,
      iconColor: "#16865b",
      iconBackground: "#e9f8f1",
    },
  ]);

  /* =========================================================
     CONSTANTS
  ========================================================= */

  const tabs = [
    { label: "All", type: "All" },
    { label: "Bookings", type: "Booking" },
    { label: "Messages", type: "Message" },
    { label: "Payments", type: "Payment" },
    { label: "Reviews", type: "Review" },
    { label: "System", type: "System" },
  ];

  const itemsPerPage = 8;

  /* =========================================================
     COUNTS
  ========================================================= */

  const totalCount = notifications.length;

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const readCount = notifications.filter(
    (item) => item.read
  ).length;

  const getTabCount = (type) => {
    if (type === "All") return notifications.length;

    return notifications.filter(
      (item) => item.type === type
    ).length;
  };

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredNotifications = useMemo(() => {
    let result = [...notifications];

    if (activeTab !== "All") {
      result = result.filter(
        (notification) =>
          notification.type === activeTab
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((notification) => {
        return (
          notification.title
            .toLowerCase()
            .includes(query) ||
          notification.message
            .toLowerCase()
            .includes(query) ||
          notification.type
            .toLowerCase()
            .includes(query)
        );
      });
    }

    return result;
  }, [notifications, activeTab, search]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredNotifications.length / itemsPerPage
    )
  );

  const safePage = Math.min(
    currentPage,
    totalPages
  );

  const displayedNotifications =
    filteredNotifications.slice(
      (safePage - 1) * itemsPerPage,
      safePage * itemsPerPage
    );

  /* =========================================================
     ACTIONS
  ========================================================= */

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              read: true,
            }
          : item
      )
    );
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  /* =========================================================
     STYLES
  ========================================================= */

  const styles = {
    page: {
      width: "100%",
      minHeight: "100%",
      boxSizing: "border-box",
      padding: "22px",
      background:
        "linear-gradient(135deg, #f8fbfe 0%, #f2f7fb 100%)",
      fontFamily:
        "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      color: "#102f4f",
    },

    pageInner: {
      width: "100%",
      maxWidth: "1500px",
      margin: "0 auto",
    },

    header: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "20px",
      marginBottom: "18px",
    },

    titleBlock: {
      minWidth: 0,
    },

    title: {
      margin: 0,
      fontSize: "30px",
      lineHeight: 1.1,
      fontWeight: 800,
      letterSpacing: "-0.8px",
      color: "#092b4d",
    },

    subtitle: {
      margin: "6px 0 0",
      fontSize: "13px",
      lineHeight: 1.5,
      color: "#607b96",
    },

    markReadButton: {
      border: "none",
      background: "transparent",
      color: "#ff6900",
      display: "flex",
      alignItems: "center",
      gap: "7px",
      fontSize: "12px",
      fontWeight: 650,
      cursor: "pointer",
      padding: "8px 4px",
      whiteSpace: "nowrap",
    },

    layout: {
      display: "grid",
      gridTemplateColumns:
        "minmax(0, 1fr) 340px",
      gap: "18px",
      alignItems: "start",
    },

    mainCard: {
      minWidth: 0,
      background: "#ffffff",
      border: "1px solid #dfebf4",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow:
        "0 5px 25px rgba(25, 63, 91, 0.025)",
    },

    tabsWrapper: {
      padding: "14px 15px",
      borderBottom:
        "1px solid #edf2f6",
      overflowX: "auto",
    },

    tabs: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      minWidth: "max-content",
    },

    tab: (active) => ({
      height: "38px",
      padding: "0 16px",
      borderRadius: "20px",
      border: active
        ? "1px solid #ff6900"
        : "1px solid #dce7f1",
      background: active
        ? "#ff6900"
        : "#ffffff",
      color: active
        ? "#ffffff"
        : "#234667",
      fontSize: "11px",
      fontWeight: active ? 700 : 550,
      cursor: "pointer",
      whiteSpace: "nowrap",
      transition: "all .2s ease",
    }),

    searchWrapper: {
      padding: "13px 15px",
      display: "flex",
      gap: "10px",
      borderBottom:
        "1px solid #edf2f6",
    },

    searchBox: {
      flex: 1,
      minWidth: 0,
      height: "38px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "0 11px",
      border: "1px solid #dce7f1",
      borderRadius: "8px",
      background: "#ffffff",
      boxSizing: "border-box",
    },

    searchInput: {
      width: "100%",
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      fontSize: "11px",
      color: "#274964",
    },

    notificationsList: {
      padding: "10px 14px",
      display: "flex",
      flexDirection: "column",
      gap: "7px",
    },

    notification: (highlighted, read) => ({
      position: "relative",
      display: "grid",
      gridTemplateColumns:
        "58px minmax(0, 1fr) auto",
      alignItems: "center",
      gap: "12px",
      minHeight: "84px",
      padding: "10px 12px",
      borderRadius: "9px",
      border: highlighted
        ? "1px solid #ffe0ca"
        : "1px solid #deebf4",
      background: highlighted
        ? "linear-gradient(135deg, #fff9f4, #fff4ed)"
        : "#ffffff",
      opacity: read ? 0.92 : 1,
      boxSizing: "border-box",
      transition:
        "background .2s ease, box-shadow .2s ease",
    }),

    iconCircle: (background, color) => ({
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background,
      color,
      flexShrink: 0,
      overflow: "hidden",
    }),

    avatar: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      objectFit: "cover",
      display: "block",
    },

    notificationContent: {
      minWidth: 0,
    },

    notificationTitle: {
      margin: 0,
      fontSize: "12px",
      lineHeight: 1.3,
      fontWeight: 750,
      color: "#0e3155",
    },

    notificationMessage: {
      margin: "4px 0 5px",
      fontSize: "10px",
      lineHeight: 1.45,
      color: "#66819e",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
    },

    meta: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "6px",
      color: "#7690a8",
      fontSize: "8px",
    },

    metaIcon: {
      display: "inline-flex",
      alignItems: "center",
      gap: "3px",
    },

    rightSide: {
      minWidth: "75px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "8px",
    },

    typeBadge: (type) => {
      const colors = {
        Booking: {
          background: "#e7f8ee",
          color: "#13945b",
        },
        Message: {
          background: "#e7f3ff",
          color: "#1476db",
        },
        Payment: {
          background: "#f1e9ff",
          color: "#7a3ee3",
        },
        Review: {
          background: "#fff5dc",
          color: "#d89200",
        },
        System: {
          background: "#edf2f6",
          color: "#62778b",
        },
      };

      return {
        padding: "5px 10px",
        borderRadius: "14px",
        background:
          colors[type]?.background ||
          "#edf2f6",
        color:
          colors[type]?.color ||
          "#62778b",
        fontSize: "8px",
        fontWeight: 700,
        whiteSpace: "nowrap",
      };
    },

    unreadDot: {
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      background: "#ff6900",
      flexShrink: 0,
    },

    arrow: {
      color: "#7994ad",
      flexShrink: 0,
    },

    paginationFooter: {
      padding: "10px 15px 14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      color: "#5e7893",
      fontSize: "9px",
    },

    pagination: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },

    pageButton: (active) => ({
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      border: active
        ? "1px solid #ff6900"
        : "1px solid transparent",
      background: active
        ? "#ff6900"
        : "transparent",
      color: active
        ? "#ffffff"
        : "#2b4d6d",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "10px",
      fontWeight: active ? 700 : 550,
      cursor: "pointer",
    }),

    navigationButton: {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      border: "1px solid #dfe8ef",
      background: "#ffffff",
      color: "#59748e",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },

    sidebar: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      minWidth: 0,
    },

    sideCard: {
      background: "#ffffff",
      border: "1px solid #dfe9f2",
      borderRadius: "12px",
      padding: "16px",
      boxSizing: "border-box",
    },

    sideTitle: {
      margin: 0,
      fontSize: "15px",
      fontWeight: 750,
      color: "#102f50",
    },

    sideHeader: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "16px",
    },

    sideTitleIcon: {
      color: "#ff6900",
    },

    summaryGrid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(3, 1fr)",
      border: "1px solid #edf2f6",
      borderRadius: "9px",
      overflow: "hidden",
    },

    summaryItem: {
      minHeight: "70px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
      borderRight:
        "1px solid #edf2f6",
      position: "relative",
    },

    summaryNumber: {
      fontSize: "19px",
      lineHeight: 1,
      fontWeight: 750,
      color: "#102f52",
    },

    summaryLabel: {
      fontSize: "9px",
      color: "#6e87a0",
    },

    unreadIndicator: {
      position: "absolute",
      top: "12px",
      right: "14px",
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: "#ff6900",
    },

    quickItem: {
      display: "flex",
      alignItems: "center",
      gap: "11px",
      padding: "12px 0",
      borderBottom:
        "1px solid #edf2f6",
      cursor: "pointer",
    },

    quickIcon: {
      width: "38px",
      height: "38px",
      borderRadius: "50%",
      background: "#f3f7fb",
      color: "#173c60",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },

    quickContent: {
      flex: 1,
      minWidth: 0,
    },

    quickTitle: {
      margin: 0,
      fontSize: "10px",
      fontWeight: 700,
      color: "#183957",
    },

    quickDescription: {
      margin: "4px 0 0",
      fontSize: "8px",
      lineHeight: 1.35,
      color: "#7690aa",
    },

    quickArrow: {
      color: "#8199ae",
      flexShrink: 0,
    },

    promo: {
      padding: "17px",
      borderRadius: "11px",
      background:
        "linear-gradient(135deg, #fff7ef, #fff0e4)",
      border: "1px solid #ffeadb",
    },

    promoIconWrapper: {
      width: "100px",
      height: "100px",
      margin: "0 auto 12px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background:
        "radial-gradient(circle, #ffe7d2 0%, #fff3e8 70%)",
      color: "#ff6900",
    },

    promoTitle: {
      margin: 0,
      fontSize: "17px",
      lineHeight: 1.2,
      fontWeight: 750,
      color: "#153655",
    },

    promoText: {
      margin: "7px 0 13px",
      fontSize: "10px",
      lineHeight: 1.5,
      color: "#526e88",
    },

    orangeButton: {
      height: "36px",
      padding: "0 16px",
      border: "none",
      borderRadius: "8px",
      background: "#ff6900",
      color: "#ffffff",
      fontSize: "10px",
      fontWeight: 700,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
    },

    emptyState: {
      padding: "55px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      color: "#718ba2",
    },
  };

  /* =========================================================
     COMPONENTS
  ========================================================= */

  const NotificationIcon = ({ notification }) => {
    if (notification.avatar) {
      return (
        <img
          src={notification.avatar}
          alt=""
          style={styles.avatar}
        />
      );
    }

    const Icon = notification.icon;

    return (
      <div
        style={styles.iconCircle(
          notification.iconBackground,
          notification.iconColor
        )}
      >
        <Icon size={23} strokeWidth={2.2} />
      </div>
    );
  };

  const NotificationCard = ({
    notification,
    index,
  }) => {
    return (
      <motion.article
        layout
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
          duration: 0.28,
          delay: index * 0.035,
        }}
        whileHover={{
          y: -2,
          boxShadow:
            "0 8px 25px rgba(19, 55, 85, .07)",
        }}
        onClick={() =>
          !notification.read &&
          markAsRead(notification.id)
        }
        style={styles.notification(
          notification.highlighted,
          notification.read
        )}
      >
        <NotificationIcon
          notification={notification}
        />

        <div style={styles.notificationContent}>
          <h3
            style={styles.notificationTitle}
          >
            {notification.title}
          </h3>

          <p
            style={styles.notificationMessage}
          >
            {notification.message}
          </p>

          <div style={styles.meta}>
            <span style={styles.metaIcon}>
              <Clock3 size={10} />
              {notification.date}
            </span>

            <span>•</span>

            <span>{notification.time}</span>
          </div>
        </div>

        <div style={styles.rightSide}>
          <span
            style={styles.typeBadge(
              notification.type
            )}
          >
            {notification.type}
          </span>

          {!notification.read && (
            <motion.span
              style={styles.unreadDot}
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.7,
              }}
            />
          )}

          <ChevronRight
            size={16}
            style={styles.arrow}
          />
        </div>
      </motion.article>
    );
  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
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
      <div style={styles.pageInner}>
        {/* =====================================================
            HEADER
        ===================================================== */}

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
          <div style={styles.titleBlock}>
            <h1 style={styles.title}>
              Notifications
            </h1>

            <p style={styles.subtitle}>
              Stay updated with your bookings,
              messages, payments and more.
            </p>
          </div>

          <motion.button
            style={styles.markReadButton}
            onClick={markAllAsRead}
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            <CheckCircle2 size={15} />
            Mark all as read
          </motion.button>
        </motion.header>

        {/* =====================================================
            MAIN LAYOUT
        ===================================================== */}

        <div style={styles.layout}>
          {/* ===================================================
              NOTIFICATION LIST
          =================================================== */}

          <motion.section
            style={styles.mainCard}
            initial={{
              opacity: 0,
              x: -15,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
          >
            {/* TABS */}

            <div
              style={styles.tabsWrapper}
            >
              <div style={styles.tabs}>
                {tabs.map((tab) => {
                  const active =
                    activeTab === tab.type;

                  return (
                    <motion.button
                      key={tab.type}
                      style={styles.tab(
                        active
                      )}
                      onClick={() =>
                        handleTabChange(
                          tab.type
                        )
                      }
                      whileHover={{
                        y: -1,
                      }}
                      whileTap={{
                        scale: 0.96,
                      }}
                    >
                      {tab.label} (
                      {getTabCount(
                        tab.type
                      )}
                      )
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* SEARCH */}

            <div
              style={styles.searchWrapper}
            >
              <div
                style={styles.searchBox}
              >
                <Search
                  size={15}
                  color="#6f89a2"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    handleSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search notifications..."
                  style={
                    styles.searchInput
                  }
                />

                <AnimatePresence>
                  {search && (
                    <motion.button
                      initial={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      onClick={() =>
                        handleSearch("")
                      }
                      style={{
                        border: "none",
                        background:
                          "transparent",
                        color:
                          "#7890a7",
                        cursor:
                          "pointer",
                        display: "flex",
                      }}
                    >
                      <X size={14} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* LIST */}

            <motion.div
              style={
                styles.notificationsList
              }
              layout
            >
              <AnimatePresence mode="popLayout">
                {displayedNotifications.length >
                0 ? (
                  displayedNotifications.map(
                    (
                      notification,
                      index
                    ) => (
                      <NotificationCard
                        key={
                          notification.id
                        }
                        notification={
                          notification
                        }
                        index={index}
                      />
                    )
                  )
                ) : (
                  <motion.div
                    style={
                      styles.emptyState
                    }
                    initial={{
                      opacity: 0,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                  >
                    <Bell
                      size={42}
                      color="#b7c7d5"
                    />

                    <h3
                      style={{
                        margin:
                          "12px 0 5px",
                        fontSize:
                          "15px",
                        color:
                          "#274862",
                      }}
                    >
                      No notifications
                      found
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        fontSize:
                          "10px",
                        color:
                          "#7890a5",
                      }}
                    >
                      Try another
                      category or
                      search term.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* PAGINATION */}

            {filteredNotifications.length >
              0 && (
              <div
                style={
                  styles.paginationFooter
                }
              >
                <span>
                  Showing{" "}
                  {Math.min(
                    (safePage - 1) *
                      itemsPerPage +
                      1,
                    filteredNotifications.length
                  )}{" "}
                  -{" "}
                  {Math.min(
                    safePage *
                      itemsPerPage,
                    filteredNotifications.length
                  )}{" "}
                  of{" "}
                  {
                    filteredNotifications.length
                  }{" "}
                  notifications
                </span>

                <div
                  style={
                    styles.pagination
                  }
                >
                  <motion.button
                    style={
                      styles.navigationButton
                    }
                    disabled={
                      safePage === 1
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          Math.max(
                            1,
                            page - 1
                          )
                      )
                    }
                    whileTap={{
                      scale: 0.9,
                    }}
                  >
                    <ChevronLeft
                      size={14}
                    />
                  </motion.button>

                  {Array.from(
                    {
                      length: totalPages,
                    },
                    (_, index) =>
                      index + 1
                  ).map((page) => (
                    <motion.button
                      key={page}
                      style={styles.pageButton(
                        safePage ===
                          page
                      )}
                      onClick={() =>
                        setCurrentPage(
                          page
                        )
                      }
                      whileTap={{
                        scale: 0.9,
                      }}
                    >
                      {page}
                    </motion.button>
                  ))}

                  <motion.button
                    style={
                      styles.navigationButton
                    }
                    disabled={
                      safePage ===
                      totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          Math.min(
                            totalPages,
                            page + 1
                          )
                      )
                    }
                    whileTap={{
                      scale: 0.9,
                    }}
                  >
                    <ChevronRight
                      size={14}
                    />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.section>

          {/* ===================================================
              RIGHT SIDEBAR
          =================================================== */}

          <aside style={styles.sidebar}>
            {/* SUMMARY */}

            <motion.section
              style={styles.sideCard}
              initial={{
                opacity: 0,
                x: 15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.1,
              }}
            >
              <div
                style={styles.sideHeader}
              >
                <Bell
                  size={22}
                  style={
                    styles.sideTitleIcon
                  }
                />

                <h2
                  style={styles.sideTitle}
                >
                  Notification Summary
                </h2>
              </div>

              <div
                style={
                  styles.summaryGrid
                }
              >
                <div
                  style={
                    styles.summaryItem
                  }
                >
                  <span
                    style={
                      styles.summaryNumber
                    }
                  >
                    {totalCount}
                  </span>

                  <span
                    style={
                      styles.summaryLabel
                    }
                  >
                    Total
                  </span>
                </div>

                <div
                  style={
                    styles.summaryItem
                  }
                >
                  {unreadCount > 0 && (
                    <span
                      style={
                        styles.unreadIndicator
                      }
                    />
                  )}

                  <motion.span
                    key={unreadCount}
                    initial={{
                      scale: 1.4,
                      color: "#ff6900",
                    }}
                    animate={{
                      scale: 1,
                      color: "#102f52",
                    }}
                    style={
                      styles.summaryNumber
                    }
                  >
                    {unreadCount}
                  </motion.span>

                  <span
                    style={
                      styles.summaryLabel
                    }
                  >
                    Unread
                  </span>
                </div>

                <div
                  style={
                    styles.summaryItem
                  }
                >
                  <span
                    style={
                      styles.summaryNumber
                    }
                  >
                    {readCount}
                  </span>

                  <span
                    style={
                      styles.summaryLabel
                    }
                  >
                    Read
                  </span>
                </div>
              </div>
            </motion.section>

            {/* QUICK ACTIONS */}

            <motion.section
              style={styles.sideCard}
              initial={{
                opacity: 0,
                x: 15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.18,
              }}
            >
              <h2
                style={{
                  ...styles.sideTitle,
                  marginBottom: "8px",
                }}
              >
                Quick Actions
              </h2>

              {/* MARK ALL */}

              <motion.div
                style={styles.quickItem}
                whileHover={{
                  x: 3,
                }}
                onClick={markAllAsRead}
              >
                <div
                  style={styles.quickIcon}
                >
                  <Check size={18} />
                </div>

                <div
                  style={
                    styles.quickContent
                  }
                >
                  <h3
                    style={
                      styles.quickTitle
                    }
                  >
                    Mark all as read
                  </h3>

                  <p
                    style={
                      styles.quickDescription
                    }
                  >
                    Clear all unread
                    notifications
                  </p>
                </div>

                <ChevronRight
                  size={15}
                  style={
                    styles.quickArrow
                  }
                />
              </motion.div>

              {/* SETTINGS */}

              <motion.div
                style={styles.quickItem}
                whileHover={{
                  x: 3,
                }}
              >
                <div
                  style={styles.quickIcon}
                >
                  <Settings size={18} />
                </div>

                <div
                  style={
                    styles.quickContent
                  }
                >
                  <h3
                    style={
                      styles.quickTitle
                    }
                  >
                    Notification Settings
                  </h3>

                  <p
                    style={
                      styles.quickDescription
                    }
                  >
                    Choose what you
                    want to be notified
                    about
                  </p>
                </div>

                <ChevronRight
                  size={15}
                  style={
                    styles.quickArrow
                  }
                />
              </motion.div>

              {/* HELP */}

              <motion.div
                style={{
                  ...styles.quickItem,
                  borderBottom:
                    "none",
                }}
                whileHover={{
                  x: 3,
                }}
              >
                <div
                  style={styles.quickIcon}
                >
                  <HelpCircle size={18} />
                </div>

                <div
                  style={
                    styles.quickContent
                  }
                >
                  <h3
                    style={
                      styles.quickTitle
                    }
                  >
                    Help & Support
                  </h3>

                  <p
                    style={
                      styles.quickDescription
                    }
                  >
                    Get assistance with
                    your account
                  </p>
                </div>

                <ChevronRight
                  size={15}
                  style={
                    styles.quickArrow
                  }
                />
              </motion.div>
            </motion.section>

            {/* PROMO */}

            <motion.section
              style={styles.promo}
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.25,
              }}
            >
              <motion.div
                style={
                  styles.promoIconWrapper
                }
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Smartphone
                  size={46}
                  strokeWidth={1.7}
                />
              </motion.div>

              <h2
                style={styles.promoTitle}
              >
                Never miss an update!
              </h2>

              <p
                style={styles.promoText}
              >
                Turn on push notifications
                to get real-time updates
                about your bookings,
                messages and more.
              </p>

              <motion.button
                style={
                  styles.orangeButton
                }
                onClick={() =>
                  setNotificationsEnabled(
                    !notificationsEnabled
                  )
                }
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 8px 20px rgba(255,105,0,.25)",
                }}
                whileTap={{
                  scale: 0.96,
                }}
              >
                {notificationsEnabled
                  ? "Notifications Enabled"
                  : "Enable Notifications"}

                {notificationsEnabled ? (
                  <Check size={13} />
                ) : (
                  <BellRing size={13} />
                )}
              </motion.button>

              <AnimatePresence>
                {notificationsEnabled && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 8,
                    }}
                    style={{
                      marginTop: "10px",
                      padding:
                        "8px 10px",
                      borderRadius:
                        "7px",
                      background:
                        "#e8f8ef",
                      color:
                        "#168258",
                      fontSize:
                        "8px",
                      display: "flex",
                      alignItems:
                        "center",
                      gap: "5px",
                    }}
                  >
                    <CheckCircle2
                      size={11}
                    />
                    Push notifications
                    are now enabled.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          </aside>
        </div>
      </div>
    </motion.main>
  );
};

export default CustomerNotification;