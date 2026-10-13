import  { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  ArrowLeft,
  CalendarDays,
  MapPin,
  Star,
  Clock3,
  ChevronRight,
  Image as ImageIcon,
  MessageSquare,
} from "lucide-react";

const CustomerMessage = () => {
  /* =========================================================
     RESPONSIVE STATE
  ========================================================= */

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth <= 760;
  const isTablet = screenWidth <= 1050;

  /* =========================================================
     STATE
  ========================================================= */

  const [activeConversation, setActiveConversation] = useState(1);
  const [mobileView, setMobileView] = useState("list");
  const [messageText, setMessageText] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  /* =========================================================
     CONVERSATIONS
  ========================================================= */

  const conversations = [
    {
      id: 1,
      name: "Zainab's Fashion Hub",
      role: "Fashion Designer",
      location: "Lagos, Nigeria",
      status: "Online",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
      preview: "Thanks for your interest! I'll be ready...",
      time: "2:45 PM",
      unread: 2,
    },
    {
      id: 2,
      name: "Tolu Events & Decor",
      role: "Event Decorator",
      location: "Lagos, Nigeria",
      status: "Online",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      preview: "The decorations are ready. Can you...",
      time: "1:32 PM",
      unread: 1,
    },
    {
      id: 3,
      name: "Emeka's Photography",
      role: "Photographer",
      location: "Abuja, Nigeria",
      status: "Offline",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      preview: "Your order has been confirmed ✅",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: 4,
      name: "Aisha's Makeup Studio",
      role: "Makeup Artist",
      location: "Lagos, Nigeria",
      status: "Offline",
      avatar:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=200&q=80",
      preview: "Thank you! I'll see you on Saturday.",
      time: "May 25",
      unread: 0,
    },
    {
      id: 5,
      name: "Chinonso Tailors",
      role: "Fashion Designer",
      location: "Lagos, Nigeria",
      status: "Online",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
      preview: "Your outfit is ready for fitting.",
      time: "May 24",
      unread: 0,
    },
    {
      id: 6,
      name: "Glory's Hair Studio",
      role: "Hair Stylist",
      location: "Lagos, Nigeria",
      status: "Offline",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      preview: "We have a new hair style you might...",
      time: "May 22",
      unread: 0,
    },
    {
      id: 7,
      name: "Yemi's Event Planner",
      role: "Event Planner",
      location: "Lagos, Nigeria",
      status: "Online",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      preview: "Let me know if you need anything else.",
      time: "May 20",
      unread: 0,
    },
  ];

  /* =========================================================
     MESSAGES
  ========================================================= */

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "vendor",
      text: "Hello Adaeze! 👋",
      time: "2:34 PM",
    },
    {
      id: 2,
      sender: "vendor",
      text: "Thanks for reaching out. How can I help you today?",
      time: "2:34 PM",
    },
    {
      id: 3,
      sender: "customer",
      text:
        "Hi! I'd like to know if the Ankara dress I saw on your page is still available?",
      time: "2:36 PM",
    },
    {
      id: 4,
      sender: "vendor",
      text: "Yes, it's still available! 😊",
      time: "2:38 PM",
    },
    {
      id: 5,
      sender: "vendor",
      text: "Here are more pictures and details.",
      time: "2:38 PM",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=300&q=80",
      ],
    },
    {
      id: 6,
      sender: "customer",
      text:
        "Wow! It's beautiful. Can we arrange for a fitting this week?",
      time: "2:40 PM",
    },
    {
      id: 7,
      sender: "vendor",
      text:
        "Absolutely! We have slots available on Thursday and Friday. Which day works best for you?",
      time: "2:42 PM",
    },
    {
      id: 8,
      sender: "customer",
      text: "Thursday works best for me. Thanks!",
      time: "2:45 PM",
    },
  ]);

  const selectedVendor =
    conversations.find((item) => item.id === activeConversation) ||
    conversations[0];

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      const matchesSearch = conversation.name
        .toLowerCase()
        .includes(search.toLowerCase());

      if (activeFilter === "Unread") {
        return matchesSearch && conversation.unread > 0;
      }

      if (activeFilter === "Archived") {
        return false;
      }

      return matchesSearch;
    });
  }, [search, activeFilter]);

  /* =========================================================
     SEND MESSAGE
  ========================================================= */

  const sendMessage = () => {
    const text = messageText.trim();

    if (!text) return;

    setMessages((previous) => [
      ...previous,
      {
        id: Date.now(),
        sender: "customer",
        text,
        time: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      },
    ]);

    setMessageText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* =========================================================
     SELECT CONVERSATION
  ========================================================= */

  const selectConversation = (id) => {
    setActiveConversation(id);

    if (isMobile) {
      setMobileView("chat");
    }
  };

  /* =========================================================
     SHARED MEDIA
  ========================================================= */

  const media = [
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=500&q=80",
  ];

  /* =========================================================
     STYLES
  ========================================================= */

  const styles = {
    page: {
      width: "100%",
      height: isMobile ? "calc(100vh - 70px)" : "calc(100vh - 88px)",
      minHeight: isMobile ? 0 : 620,
      padding: isMobile ? 8 : 12,
      boxSizing: "border-box",
      display: "grid",
      gridTemplateColumns: isTablet
        ? "minmax(300px, 1fr)"
        : "340px minmax(420px, 1fr) 365px",
      gap: 12,
      background: "#f5f9fd",
      overflow: "hidden",
      fontFamily:
        "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      color: "#0b2948",
    },

    panel: {
      background: "rgba(255,255,255,.94)",
      border: "1px solid #e4edf5",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 5px 25px rgba(16,51,84,.035)",
    },

    heading: {
      padding: "16px 16px 12px",
    },

    headingTitle: {
      margin: 0,
      color: "#092746",
      fontSize: 24,
      fontWeight: 750,
    },

    headingText: {
      margin: "5px 0 0",
      color: "#58708b",
      fontSize: 13,
    },

    searchBox: {
      height: 39,
      margin: "0 12px 11px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "0 9px",
      border: "1px solid #d9e6f2",
      borderRadius: 8,
      background: "#fff",
      boxSizing: "border-box",
    },

    searchInput: {
      flex: 1,
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      color: "#173a5c",
      fontSize: 12,
    },

    filterButton: {
      width: 29,
      height: 29,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid #dce7f1",
      borderRadius: 7,
      background: "#fff",
      color: "#476985",
      cursor: "pointer",
    },

    filters: {
      display: "flex",
      gap: 5,
      padding: "0 12px 10px",
      overflowX: "auto",
    },

    filter: {
      flexShrink: 0,
      border: "none",
      borderRadius: 20,
      padding: "8px 11px",
      background: "#f4f8fc",
      color: "#365876",
      fontSize: 11,
      fontWeight: 600,
      cursor: "pointer",
    },

    activeFilter: {
      background: "#ff6900",
      color: "#fff",
      boxShadow: "0 5px 15px rgba(255,105,0,.2)",
    },

    conversationList: {
      flex: 1,
      overflowY: "auto",
      padding: "0 6px 8px",
    },

    conversation: (active) => ({
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "11px 9px",
      border: "none",
      borderLeft: active
        ? "3px solid #ff6900"
        : "3px solid transparent",
      borderRadius: 9,
      background: active ? "#fff5ee" : "transparent",
      textAlign: "left",
      cursor: "pointer",
      boxSizing: "border-box",
    }),

    avatar: {
      width: 43,
      height: 43,
      flexShrink: 0,
      objectFit: "cover",
      borderRadius: "50%",
    },

    conversationContent: {
      flex: 1,
      minWidth: 0,
    },

    conversationTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8,
    },

    conversationName: {
      margin: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      color: "#0d3154",
      fontSize: 12,
      fontWeight: 750,
    },

    conversationTime: {
      flexShrink: 0,
      fontSize: 9,
      color: "#69839e",
    },

    conversationBottom: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      marginTop: 5,
    },

    preview: {
      margin: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      color: "#6d849c",
      fontSize: 10,
    },

    unread: {
      minWidth: 16,
      height: 16,
      padding: "0 4px",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      color: "#fff",
      background: "#ff5b22",
      fontSize: 8,
      fontWeight: 700,
    },

    chat: {
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
    },

    chatHeader: {
      minHeight: 93,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      padding: "15px 17px",
      boxSizing: "border-box",
      borderBottom: "1px solid #e8eff5",
      background: "#fff",
    },

    chatUser: {
      minWidth: 0,
      display: "flex",
      alignItems: "center",
      gap: 12,
    },

    chatAvatar: {
      width: isMobile ? 42 : 48,
      height: isMobile ? 42 : 48,
      objectFit: "cover",
      borderRadius: "50%",
      flexShrink: 0,
    },

    chatName: {
      margin: "0 0 5px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      color: "#0c2e50",
      fontSize: 14,
    },

    chatMeta: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      color: "#7189a1",
      fontSize: 10,
      whiteSpace: "nowrap",
      overflow: "hidden",
    },

    chatActions: {
      marginLeft: "auto",
      display: "flex",
      gap: 7,
    },

    iconButton: {
      width: 41,
      height: 41,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid #e0eaf3",
      borderRadius: "50%",
      color: "#153a5c",
      background: "#fff",
      cursor: "pointer",
    },

    messages: {
      flex: 1,
      overflowY: "auto",
      padding: "18px 18px 20px",
    },

    today: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 20,
    },

    todayText: {
      padding: "5px 13px",
      borderRadius: 20,
      background: "#f3f7fb",
      color: "#58718b",
      fontSize: 9,
      fontWeight: 600,
    },

    messageRow: (customer) => ({
      display: "flex",
      alignItems: "flex-end",
      justifyContent: customer ? "flex-end" : "flex-start",
      gap: 7,
      marginBottom: 17,
    }),

    messageAvatar: {
      width: 30,
      height: 30,
      flexShrink: 0,
      objectFit: "cover",
      borderRadius: "50%",
    },

    messageWrapper: {
      maxWidth: isMobile ? "82%" : "72%",
    },

    bubble: (customer) => ({
      padding: "10px 13px",
      borderRadius: 13,
      borderBottomLeftRadius: customer ? 13 : 4,
      borderBottomRightRadius: customer ? 4 : 13,
      color: customer ? "#fff" : "#365777",
      background: customer ? "#ff6900" : "#f3f8fc",
      border: `1px solid ${customer ? "#ff6900" : "#e2ebf3"}`,
      fontSize: 11,
      lineHeight: 1.55,
      boxShadow: customer
        ? "0 5px 15px rgba(255,105,0,.13)"
        : "none",
    }),

    messageText: {
      margin: 0,
    },

    messageTime: (customer) => ({
      marginTop: 4,
      padding: "0 4px",
      textAlign: customer ? "right" : "left",
      color: "#91a4b6",
      fontSize: 8,
    }),

    messageImages: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 5,
      marginTop: 8,
    },

    messageImage: {
      width: "100%",
      height: isMobile ? 60 : 83,
      objectFit: "cover",
      borderRadius: 8,
    },

    inputArea: {
      minHeight: 62,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      gap: 7,
      margin: "0 12px 12px",
      padding: "7px 7px 7px 12px",
      border: "1px solid #dbe7f0",
      borderRadius: 13,
      background: "#fff",
      boxSizing: "border-box",
    },

    textarea: {
      flex: 1,
      minWidth: 0,
      maxHeight: 70,
      resize: "none",
      border: "none",
      outline: "none",
      background: "transparent",
      color: "#294d6d",
      fontFamily: "inherit",
      fontSize: 11,
    },

    sendButton: {
      width: 40,
      height: 40,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      borderRadius: "50%",
      color: "#fff",
      background: "#ff6900",
      cursor: "pointer",
      boxShadow: "0 5px 15px rgba(255,105,0,.2)",
    },

    profile: {
      overflowY: "auto",
      background: "#fff",
    },

    cover: {
      position: "relative",
      height: 151,
      padding: 12,
      boxSizing: "border-box",
    },

    coverImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: 10,
    },

    vendorCard: {
      padding: "0 14px 12px",
    },

    vendorTop: {
      display: "flex",
      gap: 11,
    },

    vendorImage: {
      width: 61,
      height: 61,
      marginTop: -3,
      objectFit: "cover",
      border: "4px solid #fff",
      borderRadius: "50%",
      boxShadow: "0 4px 12px rgba(0,0,0,.08)",
    },

    vendorName: {
      margin: "5px 0",
      color: "#0b2d4f",
      fontSize: 14,
    },

    online: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      color: "#32b982",
      fontSize: 10,
    },

    rating: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      marginTop: 6,
      color: "#6e8399",
      fontSize: 9,
    },

    location: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      marginTop: 6,
      color: "#6f8499",
      fontSize: 9,
    },

    profileButton: {
      width: "100%",
      height: 38,
      marginTop: 12,
      border: "none",
      borderRadius: 9,
      color: "#fff",
      background: "#ff6900",
      fontSize: 11,
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 5px 14px rgba(255,105,0,.18)",
    },

    profileActions: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 6,
      marginTop: 10,
    },

    profileAction: {
      minHeight: 72,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      border: "1px solid #e4ecf4",
      borderRadius: 10,
      background: "#fbfdff",
      color: "#113656",
      cursor: "pointer",
      fontSize: 8,
      fontWeight: 650,
    },

    profileSection: {
      margin: "0 14px",
      padding: "13px 0",
      borderTop: "1px solid #edf2f6",
    },

    sectionTitle: {
      margin: 0,
      color: "#183b5b",
      fontSize: 12,
    },

    mediaGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 6,
      marginTop: 10,
    },

    mediaImage: {
      width: "100%",
      height: 88,
      objectFit: "cover",
      borderRadius: 7,
    },

    aboutText: {
      margin: "8px 0 0",
      color: "#637d97",
      fontSize: 10,
      lineHeight: 1.7,
    },

    hoursText: {
      margin: "5px 0",
      color: "#66809a",
      fontSize: 10,
    },
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      {/* =====================================================
          CONVERSATIONS
      ===================================================== */}

      {(!isMobile || mobileView === "list") && (
        <motion.aside
          style={{
            ...styles.panel,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div style={styles.heading}>
            <h1 style={styles.headingTitle}>Messages</h1>
            <p style={styles.headingText}>
              Chat with your vendors and stay updated.
            </p>
          </div>

          {/* Search */}
          <div style={styles.searchBox}>
            <Search size={18} color="#7390ab" />

            <input
              style={styles.searchInput}
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button style={styles.filterButton}>
              <SlidersHorizontal size={17} />
            </button>
          </div>

          {/* Filters */}
          <div style={styles.filters}>
            {["All", "Unread", "Vendors", "Archived"].map((filter) => (
              <button
                key={filter}
                style={{
                  ...styles.filter,
                  ...(activeFilter === filter
                    ? styles.activeFilter
                    : {}),
                }}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}

                {filter === "All" && " (8)"}
                {filter === "Unread" && " (2)"}
                {filter === "Vendors" && " (6)"}
              </button>
            ))}
          </div>

          {/* Conversation List */}
          <div style={styles.conversationList}>
            {filteredConversations.map((conversation, index) => (
              <motion.button
                key={conversation.id}
                style={styles.conversation(
                  activeConversation === conversation.id
                )}
                onClick={() => selectConversation(conversation.id)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.05,
                }}
                whileHover={{
                  x: 3,
                  backgroundColor:
                    activeConversation === conversation.id
                      ? "#fff5ee"
                      : "#f7fafc",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  style={styles.avatar}
                />

                <div style={styles.conversationContent}>
                  <div style={styles.conversationTop}>
                    <h3 style={styles.conversationName}>
                      {conversation.name}
                    </h3>

                    <span style={styles.conversationTime}>
                      {conversation.time}
                    </span>
                  </div>

                  <div style={styles.conversationBottom}>
                    <p style={styles.preview}>
                      {conversation.preview}
                    </p>

                    {conversation.unread > 0 && (
                      <span style={styles.unread}>
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.aside>
      )}

      {/* =====================================================
          CHAT
      ===================================================== */}

      {(!isMobile || mobileView === "chat") && (
        <motion.main
          style={{
            ...styles.panel,
            ...styles.chat,
          }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Chat Header */}
          <div style={styles.chatHeader}>
            {isMobile && (
              <button
                style={{
                  ...styles.iconButton,
                  marginRight: 9,
                }}
                onClick={() => setMobileView("list")}
              >
                <ArrowLeft size={19} />
              </button>
            )}

            <div style={styles.chatUser}>
              <img
                src={selectedVendor.avatar}
                alt={selectedVendor.name}
                style={styles.chatAvatar}
              />

              <div style={{ minWidth: 0 }}>
                <h2 style={styles.chatName}>
                  {selectedVendor.name}
                </h2>

                <div style={styles.chatMeta}>
                  <span style={{ color: "#31b77e" }}>
                    ● Online
                  </span>

                  {!isMobile && (
                    <>
                      <span>•</span>
                      <span>{selectedVendor.role}</span>
                      <span>•</span>
                      <span>{selectedVendor.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div style={styles.chatActions}>
              <motion.button
                style={styles.iconButton}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Phone size={18} />
              </motion.button>

              {!isMobile && (
                <motion.button
                  style={styles.iconButton}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Video size={18} />
                </motion.button>
              )}

              {!isMobile && (
                <motion.button
                  style={styles.iconButton}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MoreVertical size={18} />
                </motion.button>
              )}
            </div>
          </div>

          {/* Messages */}
          <div style={styles.messages}>
            <div style={styles.today}>
              <span style={styles.todayText}>Today</span>
            </div>

            <AnimatePresence initial={false}>
              {messages.map((message) => {
                const customer = message.sender === "customer";

                return (
                  <motion.div
                    key={message.id}
                    style={styles.messageRow(customer)}
                    initial={{
                      opacity: 0,
                      y: 12,
                      scale: 0.97,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    {!customer && (
                      <img
                        src={selectedVendor.avatar}
                        alt={selectedVendor.name}
                        style={styles.messageAvatar}
                      />
                    )}

                    <div style={styles.messageWrapper}>
                      <div style={styles.bubble(customer)}>
                        {message.text && (
                          <p style={styles.messageText}>
                            {message.text}
                          </p>
                        )}

                        {message.images && (
                          <div style={styles.messageImages}>
                            {message.images.map((image, index) => (
                              <div
                                key={image}
                                style={{
                                  position: "relative",
                                }}
                              >
                                <img
                                  src={image}
                                  alt="Shared"
                                  style={styles.messageImage}
                                />

                                {index === 2 && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      inset: 0,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: "#fff",
                                      background:
                                        "rgba(0,0,0,.42)",
                                      borderRadius: 8,
                                      fontWeight: 700,
                                      fontSize: 15,
                                    }}
                                  >
                                    +2
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div style={styles.messageTime(customer)}>
                        {message.time}

                        {customer && (
                          <span
                            style={{
                              marginLeft: 4,
                              color: "#ff6900",
                              fontWeight: 700,
                            }}
                          >
                            ✓✓
                          </span>
                        )}
                      </div>
                    </div>

                    {customer && (
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                        alt="Customer"
                        style={styles.messageAvatar}
                      />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Input */}
          <div style={styles.inputArea}>
            <button
              style={{
                border: "none",
                background: "transparent",
                color: "#68839e",
                cursor: "pointer",
              }}
            >
              <Paperclip size={20} />
            </button>

            <textarea
              style={styles.textarea}
              rows={1}
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              style={{
                border: "none",
                background: "transparent",
                color: "#68839e",
                cursor: "pointer",
              }}
            >
              <Smile size={20} />
            </button>

            <motion.button
              style={styles.sendButton}
              onClick={sendMessage}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.9 }}
            >
              <Send size={18} />
            </motion.button>
          </div>
        </motion.main>
      )}

      {/* =====================================================
          VENDOR PROFILE
      ===================================================== */}

      {!isTablet && (
        <motion.aside
          style={{
            ...styles.panel,
            ...styles.profile,
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Cover */}
          <div style={styles.cover}>
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80"
              alt="Vendor"
              style={styles.coverImage}
            />

            <button
              style={{
                position: "absolute",
                left: 22,
                top: 23,
                width: 31,
                height: 31,
                border: "none",
                borderRadius: "50%",
                color: "#fff",
                background: "rgba(0,0,0,.3)",
              }}
            >
              <ArrowLeft size={17} />
            </button>

            <button
              style={{
                position: "absolute",
                right: 22,
                top: 23,
                width: 31,
                height: 31,
                border: "none",
                borderRadius: "50%",
                color: "#fff",
                background: "rgba(0,0,0,.3)",
              }}
            >
              <MoreVertical size={17} />
            </button>
          </div>

          {/* Vendor */}
          <div style={styles.vendorCard}>
            <div style={styles.vendorTop}>
              <img
                src={selectedVendor.avatar}
                alt={selectedVendor.name}
                style={styles.vendorImage}
              />

              <div>
                <h2 style={styles.vendorName}>
                  {selectedVendor.name}
                </h2>

                <div style={styles.online}>
                  <span>●</span> Online
                </div>

                <div style={styles.rating}>
                  <Star
                    size={14}
                    fill="#ffb300"
                    color="#ffb300"
                  />
                  <strong style={{ color: "#274866" }}>
                    4.8
                  </strong>
                  <span>(124 reviews)</span>
                </div>

                <div style={styles.location}>
                  <MapPin size={14} />
                  Lagos, Nigeria
                </div>
              </div>
            </div>

            <motion.button
              style={styles.profileButton}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View Profile
            </motion.button>

            {/* Actions */}
            <div style={styles.profileActions}>
              {[
                {
                  icon: <CalendarDays size={19} />,
                  text: "Book Now",
                },
                {
                  icon: <MessageSquare size={19} />,
                  text: "Message",
                },
                {
                  icon: <Phone size={19} />,
                  text: "Call",
                },
                {
                  icon: <Video size={19} />,
                  text: "Video",
                },
              ].map((action, index) => (
                <motion.button
                  key={action.text}
                  style={{
                    ...styles.profileAction,
                    ...(index === 1
                      ? {
                          color: "#ff6900",
                          borderColor: "#ffd7bd",
                          background: "#fff6ef",
                        }
                      : {}),
                  }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {action.icon}
                  <span>{action.text}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Shared Media */}
          <div style={styles.profileSection}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3 style={styles.sectionTitle}>Shared Media</h3>

              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  border: "none",
                  background: "transparent",
                  color: "#ff6900",
                  fontSize: 9,
                  cursor: "pointer",
                }}
              >
                View All
                <ChevronRight size={14} />
              </button>
            </div>

            <div style={styles.mediaGrid}>
              {media.map((image, index) => (
                <div
                  key={image}
                  style={{
                    position: "relative",
                  }}
                >
                  <img
                    src={image}
                    alt="Shared media"
                    style={styles.mediaImage}
                  />

                  {index === 2 && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                        color: "#fff",
                        background: "rgba(0,0,0,.4)",
                        borderRadius: 7,
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      <ImageIcon size={14} />
                      +5
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* About */}
          <div style={styles.profileSection}>
            <h3 style={styles.sectionTitle}>About</h3>

            <p style={styles.aboutText}>
              Custom Ankara dresses, corporate wears, bridal and
              more. We bring your style to life with quality
              fabrics and perfect designs.
            </p>
          </div>

          {/* Business Hours */}
          <div style={styles.profileSection}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                marginBottom: 10,
              }}
            >
              <Clock3 size={18} color="#5d7c98" />

              <h3 style={styles.sectionTitle}>
                Business Hours
              </h3>
            </div>

            <p style={styles.hoursText}>
              Mon - Sat: <strong>9:00 AM - 7:00 PM</strong>
            </p>

            <p style={styles.hoursText}>
              Sun: <strong>Closed</strong>
            </p>
          </div>
        </motion.aside>
      )}
    </motion.div>
  );
};

export default CustomerMessage;