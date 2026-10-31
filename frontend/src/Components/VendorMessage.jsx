
import  { useState, useMemo, useRef, useEffect } from "react";

/* =========================================================
   ICON COMPONENT
========================================================= */

const Icon = ({ name, size = 20, color = "currentColor", ...props }) => {
  const icons = {
    message: <><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7a2 2 0 0 1 1.72 2.04z"/>,
    video: <><rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3z"/></>,
    more: <><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></>,
    send: <><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>,
    smile: <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></>,
    paperclip: <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48"/>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></>,
    map: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/></>,
    arrow: <><path d="M5 12h14M12 5l7 7-7 7"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/></>,
    close: <><path d="m18 6-12 12M6 6l12 12"/></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/>,
    videoCall: <><rect x="2" y="5" width="14" height="14" rx="2"/><path d="m16 10 6-4v12l-6-4z"/></>
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {icons[name] || icons.message}
    </svg>
  );
};

/* =========================================================
   DEMO DATA
========================================================= */

const initialChats = [
  {
    id: 1,
    name: "Chioma Eze",
    avatar: "https://i.pravatar.cc/150?img=47",
    online: true,
    unread: 2,
    time: "10:24 AM",
    preview: "Hi! I would like to book a photography...",
    email: "chiomaeze@gmail.com",
    phone: "+234 801 234 5678",
    location: "Lagos, Nigeria",
    member: "May 2025",
    messages: [
      { id: 1, text: "Hi! I would like to book a photography service for my upcoming event. Are you available on June 15?", time: "10:12 AM", sender: "customer" },
      { id: 2, text: "Hello Chioma! Yes, I'm available on June 15. What type of event is it for?", time: "10:15 AM", sender: "vendor" },
      { id: 3, text: "It's a wedding event. I'll need full day coverage and a photo album. Can you send me your package and prices?", time: "10:18 AM", sender: "customer" },
      { id: 4, text: "Sure! Here's our wedding photography package. You can also check my portfolio for sample work.", time: "10:20 AM", sender: "vendor", file: true },
      { id: 5, text: "This looks perfect! Can you please confirm the booking for June 15?", time: "10:24 AM", sender: "customer" },
      { id: 6, text: "Absolutely! I'll confirm it now and send you a booking receipt shortly. Thank you!", time: "10:26 AM", sender: "vendor" }
    ]
  },
  {
    id: 2,
    name: "Tolu Adeyemi",
    avatar: "https://i.pravatar.cc/150?img=12",
    online: false,
    unread: 1,
    time: "9:50 AM",
    preview: "Is the wedding package still available?",
    email: "toluade@gmail.com",
    phone: "+234 803 456 7890",
    location: "Abuja, Nigeria",
    member: "May 2025",
    messages: [
      { id: 1, text: "Hello! Is the wedding package still available?", time: "9:45 AM", sender: "customer" },
      { id: 2, text: "Yes, absolutely! We still have available dates this month.", time: "9:50 AM", sender: "vendor" }
    ]
  },
  {
    id: 3,
    name: "Amaka Johnson",
    avatar: "https://i.pravatar.cc/150?img=44",
    online: true,
    unread: 0,
    time: "Yesterday",
    preview: "Thank you so much! The design is perfect.",
    email: "amakajohnson@gmail.com",
    phone: "+234 806 111 2233",
    location: "Port Harcourt, Nigeria",
    member: "May 2025",
    messages: [
      { id: 1, text: "Thank you so much! The design is perfect.", time: "Yesterday", sender: "customer" }
    ]
  },
  {
    id: 4,
    name: "Emeka Nwosu",
    avatar: "https://i.pravatar.cc/150?img=13",
    online: false,
    unread: 0,
    time: "Yesterday",
    preview: "Can you send me your portfolio?",
    email: "emekanwosu@gmail.com",
    phone: "+234 807 222 3344",
    location: "Enugu, Nigeria",
    member: "May 2025",
    messages: [
      { id: 1, text: "Can you send me your portfolio?", time: "Yesterday", sender: "customer" }
    ]
  },
  {
    id: 5,
    name: "Zainab Musa",
    avatar: "https://i.pravatar.cc/150?img=45",
    online: false,
    unread: 1,
    time: "May 27",
    preview: "I'm interested in your catering service...",
    email: "zainabmusa@gmail.com",
    phone: "+234 808 333 4455",
    location: "Kano, Nigeria",
    member: "May 2025",
    messages: [
      { id: 1, text: "I'm interested in your catering services. Could you send me your price list?", time: "May 27", sender: "customer" }
    ]
  },
  {
    id: 6,
    name: "Daniel Okafor",
    avatar: "https://i.pravatar.cc/150?img=11",
    online: false,
    unread: 0,
    time: "May 26",
    preview: "Great! I'll make the payment now.",
    email: "danielokafor@gmail.com",
    phone: "+234 809 444 5566",
    location: "Lagos, Nigeria",
    member: "May 2025",
    messages: [
      { id: 1, text: "Great! I'll make the payment now.", time: "May 26", sender: "customer" }
    ]
  },
  {
    id: 7,
    name: "Blessing Uche",
    avatar: "https://i.pravatar.cc/150?img=49",
    online: true,
    unread: 1,
    time: "May 25",
    preview: "When are you available next week?",
    email: "blessing@gmail.com",
    phone: "+234 810 555 6677",
    location: "Abuja, Nigeria",
    member: "May 2025",
    messages: [
      { id: 1, text: "When are you available next week?", time: "May 25", sender: "customer" }
    ]
  },
  {
    id: 8,
    name: "Ifeanyi Chukwudi",
    avatar: "https://i.pravatar.cc/150?img=14",
    online: false,
    unread: 0,
    time: "May 24",
    preview: "Thank you for the amazing work!",
    email: "ifeanyi@gmail.com",
    phone: "+234 811 666 7788",
    location: "Lagos, Nigeria",
    member: "May 2025",
    messages: [
      { id: 1, text: "Thank you for the amazing work!", time: "May 24", sender: "customer" }
    ]
  },
  {
    id: 9,
    name: "Rita Adebayo",
    avatar: "https://i.pravatar.cc/150?img=48",
    online: false,
    unread: 0,
    time: "May 22",
    preview: "Do you offer event decoration for...",
    email: "rita@gmail.com",
    phone: "+234 812 222 1111",
    location: "Ibadan, Nigeria",
    member: "May 2025",
    messages: [
      { id: 1, text: "Do you offer event decoration for birthdays?", time: "May 22", sender: "customer" }
    ]
  },
  {
    id: 10,
    name: "Victor Eze",
    avatar: "https://i.pravatar.cc/150?img=15",
    online: false,
    unread: 0,
    time: "May 20",
    preview: "I'll be making the payment tomorrow.",
    email: "victoreze@gmail.com",
    phone: "+234 813 333 2222",
    location: "Lagos, Nigeria",
    member: "May 2025",
    messages: [
      { id: 1, text: "I'll be making the payment tomorrow.", time: "May 20", sender: "customer" }
    ]
  }
];

const mediaItems = [
  {
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300",
    title: "Event photography"
  },
  {
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300",
    title: "Camera equipment"
  },
  {
    image: "https://images.unsplash.com/photo-1519225421980-888cb8f1aabd?w=300",
    title: "Event decoration"
  }
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function VendorMessage() {
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState(1);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [showProfile, setShowProfile] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [showMobileInbox, setShowMobileInbox] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const activeChat = chats.find(chat => chat.id === activeChatId);

  const unreadCount = chats.reduce(
    (total, chat) => total + chat.unread,
    0
  );

  const filteredChats = useMemo(() => {
    return chats.filter(chat => {
      const matchesSearch = chat.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Unread" && chat.unread > 0) ||
        (activeTab === "Starred" && chat.id === 1);

      return matchesSearch && matchesTab;
    });
  }, [chats, search, activeTab]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [activeChat?.messages]);

  const selectChat = (chat) => {
    setActiveChatId(chat.id);

    setChats(prev =>
      prev.map(item =>
        item.id === chat.id
          ? { ...item, unread: 0 }
          : item
      )
    );

    setShowMobileInbox(false);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    const trimmed = message.trim();

    if (!trimmed || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      text: trimmed,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      sender: "vendor"
    };

    setChats(prev =>
      prev.map(chat =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              preview: trimmed,
              time: "Just now"
            }
          : chat
      )
    );

    setMessage("");
    inputRef.current?.focus();
  };

  const quickReply = (text) => {
    setMessage(text);
    inputRef.current?.focus();
  };

  const handleAttachment = () => {
    alert("File attachment can be connected to your backend upload system.");
  };

  const handleCall = () => {
    if (activeChat?.phone) {
      window.location.href = `tel:${activeChat.phone}`;
    }
  };

  const handleVideo = () => {
    alert("Connect this button to your video calling service.");
  };

  return (
    <div className="vm-page">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .vm-page {
          --vm-blue: #087cf0;
          --vm-dark: #08245f;
          --vm-orange: #ff5108;
          --vm-muted: #6690cb;
          --vm-border: #e0edfc;
          font-family: 'Inter', sans-serif;
          color: var(--vm-dark);
          width: 100%;
          min-width: 0;
          animation: vmFade .5s ease;
        }

        .vm-page * {
          box-sizing: border-box;
        }

        @keyframes vmFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes vmPop {
          from { opacity: 0; transform: scale(.96); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes vmSlide {
          from { opacity: 0; transform: translateX(15px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes vmPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, .25); }
          50% { box-shadow: 0 0 0 5px rgba(16, 185, 129, 0); }
        }

        .vm-heading {
          display: flex;
          align-items: center;
          gap: 15px;
          margin: 8px 0 20px;
        }

        .vm-heading-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff0e6;
          color: var(--vm-orange);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .vm-heading h1 {
          font-size: 26px;
          font-weight: 800;
          margin: 0 0 6px;
          color: #09265f;
        }

        .vm-heading p {
          font-size: 13px;
          color: #5582c2;
          margin: 0;
        }

        .vm-layout {
          display: grid;
          grid-template-columns: minmax(240px, .85fr) minmax(360px, 1.55fr) minmax(240px, 1fr);
          gap: 14px;
          align-items: stretch;
          height: calc(100vh - 190px);
          min-height: 650px;
        }

        .vm-panel {
          background: rgba(255,255,255,.84);
          border: 1px solid var(--vm-border);
          border-radius: 12px;
          overflow: hidden;
          min-width: 0;
          box-shadow: 0 4px 15px rgba(37, 99, 160, .025);
        }

        /* INBOX */

        .vm-inbox {
          display: flex;
          flex-direction: column;
          animation: vmFade .55s ease;
        }

        .vm-inbox-header {
          padding: 15px 13px 10px;
        }

        .vm-inbox-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .vm-inbox-title h3 {
          font-size: 16px;
          margin: 0;
          font-weight: 700;
        }

        .vm-icon-button {
          width: 36px;
          height: 36px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid var(--vm-border);
          background: white;
          color: var(--vm-blue);
          border-radius: 50%;
          cursor: pointer;
          transition: .2s ease;
        }

        .vm-icon-button:hover {
          background: #edf6ff;
          transform: translateY(-2px);
        }

        .vm-tabs {
          display: flex;
          gap: 6px;
        }

        .vm-tab {
          border: 1px solid #e4effb;
          background: #f9fcff;
          border-radius: 22px;
          padding: 8px 13px;
          font-size: 11px;
          color: #527ab7;
          cursor: pointer;
          transition: .25s;
          white-space: nowrap;
        }

        .vm-tab.active {
          color: white;
          background: linear-gradient(135deg, #ff650d, #ff4200);
          border-color: transparent;
          box-shadow: 0 4px 10px rgba(255, 80, 8, .16);
        }

        .vm-tab:hover:not(.active) {
          border-color: #9cc8f8;
          color: var(--vm-blue);
        }

        .vm-search {
          margin-top: 12px;
          position: relative;
        }

        .vm-search input {
          width: 100%;
          height: 38px;
          padding: 0 35px;
          border: 1px solid #e5effb;
          border-radius: 9px;
          outline: none;
          background: #fff;
          font-family: inherit;
          font-size: 11px;
          color: var(--vm-dark);
          transition: .2s;
        }

        .vm-search input:focus {
          border-color: #8cc4ff;
          box-shadow: 0 0 0 3px rgba(8,124,240,.06);
        }

        .vm-search svg {
          position: absolute;
          left: 11px;
          top: 10px;
          color: #6095d9;
        }

        .vm-chat-list {
          overflow-y: auto;
          flex: 1;
        }

        .vm-chat-list::-webkit-scrollbar,
        .vm-messages::-webkit-scrollbar {
          width: 4px;
        }

        .vm-chat-list::-webkit-scrollbar-thumb,
        .vm-messages::-webkit-scrollbar-thumb {
          background: #d9e9fa;
          border-radius: 10px;
        }

        .vm-chat-item {
          padding: 11px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          border-bottom: 1px solid #f0f5fb;
          transition: .2s ease;
          position: relative;
        }

        .vm-chat-item:hover {
          background: #f4f9ff;
        }

        .vm-chat-item.active {
          background: #eef7ff;
          border-left: 3px solid var(--vm-orange);
          padding-left: 9px;
        }

        .vm-avatar-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .vm-avatar {
          width: 43px;
          height: 43px;
          border-radius: 50%;
          object-fit: cover;
          background: #eaf2fb;
        }

        .vm-online-dot {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #10bf73;
          border: 2px solid white;
          border-radius: 50%;
          bottom: 1px;
          right: 0;
        }

        .vm-chat-info {
          flex: 1;
          min-width: 0;
        }

        .vm-chat-info-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 5px;
        }

        .vm-chat-info h4 {
          font-size: 12px;
          font-weight: 700;
          margin: 0 0 6px;
          white-space: nowrap;
        }

        .vm-chat-time {
          font-size: 9px;
          color: #6e98d2;
          white-space: nowrap;
        }

        .vm-chat-preview {
          font-size: 10px;
          color: #6d93c9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
        }

        .vm-unread {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 15px;
          height: 15px;
          padding: 0 4px;
          background: #ff5308;
          color: white;
          font-size: 9px;
          font-weight: 700;
          border-radius: 20px;
          margin-top: 4px;
        }

        .vm-no-results {
          text-align: center;
          padding: 40px 10px;
          color: #7b9ac2;
          font-size: 12px;
        }

        /* CHAT WINDOW */

        .vm-conversation {
          display: flex;
          flex-direction: column;
          animation: vmSlide .5s ease;
        }

        .vm-chat-header {
          padding: 13px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eaf1fa;
          min-height: 68px;
        }

        .vm-contact-heading {
          display: flex;
          gap: 11px;
          align-items: center;
          min-width: 0;
        }

        .vm-contact-heading .vm-avatar {
          width: 44px;
          height: 44px;
        }

        .vm-contact-heading h3 {
          font-size: 14px;
          margin: 0 0 5px;
        }

        .vm-online-label {
          font-size: 10px;
          color: #6a91c5;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .vm-online-label::before {
          content: "";
          height: 8px;
          width: 8px;
          background: #10bf73;
          border-radius: 50%;
          animation: vmPulse 2s infinite;
        }

        .vm-header-actions {
          display: flex;
          gap: 7px;
        }

        .vm-messages {
          flex: 1;
          overflow-y: auto;
          padding: 10px 14px 15px;
          background: linear-gradient(180deg, #fff 0%, #fafdff 100%);
        }

        .vm-date-divider {
          display: flex;
          justify-content: center;
          margin: 0 0 12px;
        }

        .vm-date-divider span {
          background: #f0f6ff;
          border-radius: 20px;
          padding: 5px 11px;
          font-size: 9px;
          color: #5782c2;
        }

        .vm-message-row {
          display: flex;
          margin-bottom: 9px;
          animation: vmPop .3s ease;
        }

        .vm-message-row.vendor {
          justify-content: flex-end;
        }

        .vm-message-bubble {
          max-width: 75%;
          padding: 11px 13px 8px;
          border-radius: 16px;
          font-size: 12px;
          line-height: 1.55;
          position: relative;
          word-break: break-word;
        }

        .vm-message-row.customer .vm-message-bubble {
          background: #eef5fc;
          color: #09275e;
          border-top-left-radius: 5px;
        }

        .vm-message-row.vendor .vm-message-bubble {
          background: linear-gradient(135deg, #1788ff, #0873e8);
          color: white;
          border-top-right-radius: 5px;
          box-shadow: 0 4px 12px rgba(8,124,240,.12);
        }

        .vm-message-time {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 4px;
          font-size: 8px;
          margin-top: 4px;
          opacity: .75;
        }

        .vm-file-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: white;
          color: #09275e;
          border-radius: 9px;
          margin-top: 12px;
          min-width: 190px;
        }

        .vm-file-icon {
          width: 34px;
          height: 34px;
          background: #f0eaff;
          color: #6944ff;
          border-radius: 9px;
          display: grid;
          place-items: center;
        }

        .vm-file-info {
          flex: 1;
        }

        .vm-file-info strong {
          font-size: 10px;
          display: block;
        }

        .vm-file-info small {
          color: #91a7c7;
          font-size: 9px;
        }

        .vm-file-download {
          color: var(--vm-blue);
          cursor: pointer;
        }

        .vm-chat-footer {
          padding: 8px 12px;
          border-top: 1px solid #e9f1fb;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,.9);
        }

        .vm-message-input {
          display: flex;
          flex: 1;
          align-items: center;
          border: 1px solid #e2edfa;
          border-radius: 30px;
          padding: 0 11px;
          min-width: 0;
          height: 40px;
          background: white;
          transition: .2s;
        }

        .vm-message-input:focus-within {
          border-color: #83bbf9;
          box-shadow: 0 0 0 3px rgba(8,124,240,.05);
        }

        .vm-message-input input {
          flex: 1;
          min-width: 0;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 11px;
          padding: 8px;
          color: var(--vm-dark);
          background: transparent;
        }

        .vm-message-input input::placeholder {
          color: #8ba7ca;
        }

        .vm-emoji {
          border: none;
          background: none;
          color: #6095d9;
          cursor: pointer;
          display: flex;
          padding: 3px;
        }

        .vm-send-button {
          border: none;
          height: 40px;
          width: 40px;
          flex-shrink: 0;
          background: linear-gradient(135deg, #1689ff, #0871e7);
          color: white;
          border-radius: 50%;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: .25s;
          box-shadow: 0 4px 10px rgba(8,124,240,.18);
        }

        .vm-send-button:hover {
          transform: scale(1.08) rotate(-8deg);
          box-shadow: 0 6px 15px rgba(8,124,240,.3);
        }

        /* PROFILE PANEL */

        .vm-profile {
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
          background: transparent;
          border: none;
          box-shadow: none;
          animation: vmSlide .6s ease;
        }

        .vm-profile-card,
        .vm-quick-card,
        .vm-media-card {
          background: rgba(255,255,255,.9);
          border: 1px solid var(--vm-border);
          border-radius: 11px;
          padding: 15px;
        }

        .vm-profile-top {
          display: flex;
          gap: 13px;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid #edf3fa;
        }

        .vm-profile-avatar {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #fff1e9;
          flex-shrink: 0;
        }

        .vm-profile-top h3 {
          font-size: 16px;
          margin: 0 0 7px;
        }

        .vm-profile-top p {
          font-size: 10px;
          color: #7395c5;
          margin: 7px 0 0;
        }

        .vm-profile-actions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 9px;
          margin-top: 12px;
        }

        .vm-profile-action {
          border: 1px solid #dfedff;
          background: #fbfdff;
          color: var(--vm-blue);
          border-radius: 11px;
          min-height: 58px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          cursor: pointer;
          transition: .2s;
        }

        .vm-profile-action:hover {
          background: #edf6ff;
          transform: translateY(-3px);
        }

        .vm-section-title {
          font-size: 14px;
          font-weight: 700;
          margin: 17px 0 13px;
        }

        .vm-detail {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
          font-size: 11px;
          color: #4775b5;
          line-height: 1.6;
        }

        .vm-detail svg {
          color: #4078c4;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .vm-detail strong {
          display: block;
          font-weight: 500;
          color: #7795bd;
          margin-bottom: 2px;
        }

        .vm-quick-card h3,
        .vm-media-card h3 {
          font-size: 14px;
          margin: 0 0 12px;
        }

        .vm-quick-action {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 10px;
          border: 1px solid #e9f2fc;
          border-radius: 9px;
          margin-bottom: 6px;
          cursor: pointer;
          font-size: 11px;
          color: #12366e;
          background: white;
          transition: .2s;
        }

        .vm-quick-action:last-child {
          margin-bottom: 0;
        }

        .vm-quick-action:hover {
          background: #f0f7ff;
          border-color: #b6d9ff;
          transform: translateX(3px);
        }

        .vm-quick-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: var(--vm-blue);
          background: #edf6ff;
          flex-shrink: 0;
        }

        .vm-quick-action > span:nth-child(2) {
          flex: 1;
        }

        .vm-quick-action > svg {
          color: #81a6d5;
        }

        .vm-media-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .vm-media-heading button {
          border: none;
          background: none;
          color: var(--vm-blue);
          font-size: 10px;
          cursor: pointer;
        }

        .vm-media-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
        }

        .vm-media-image {
          height: 75px;
          width: 100%;
          object-fit: cover;
          border-radius: 7px;
          transition: .25s;
          cursor: pointer;
        }

        .vm-media-image:hover {
          transform: scale(1.05);
        }

        .vm-media-more {
          background: #15325b;
          color: white;
          border-radius: 7px;
          display: grid;
          place-items: center;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          min-height: 75px;
        }

        .vm-mobile-back {
          display: none;
        }

        .vm-profile-toggle {
          display: none;
        }

        /* RESPONSIVE */

        @media (max-width: 1200px) {
          .vm-layout {
            grid-template-columns: minmax(220px, .8fr) minmax(350px, 1.5fr);
          }

          .vm-profile {
            display: none;
          }

          .vm-profile.show {
            display: flex;
            grid-column: 1 / -1;
            height: auto;
            animation: vmFade .3s ease;
          }

          .vm-profile-toggle {
            display: flex;
          }
        }

        @media (max-width: 760px) {
          .vm-heading {
            margin-top: 5px;
          }

          .vm-heading h1 {
            font-size: 22px;
          }

          .vm-heading p {
            font-size: 11px;
            line-height: 1.5;
          }

          .vm-layout {
            display: block;
            height: auto;
            min-height: 0;
          }

          .vm-inbox {
            min-height: 650px;
            height: calc(100vh - 220px);
          }

          .vm-conversation {
            display: none;
            height: calc(100vh - 200px);
            min-height: 550px;
          }

          .vm-layout.mobile-chat .vm-inbox {
            display: none;
          }

          .vm-layout.mobile-chat .vm-conversation {
            display: flex;
          }

          .vm-layout.mobile-chat .vm-profile {
            display: none !important;
          }

          .vm-mobile-back {
            display: flex;
            margin-right: 3px;
          }

          .vm-profile-toggle {
            display: none;
          }

          .vm-chat-header {
            padding: 10px;
          }

          .vm-message-bubble {
            max-width: 88%;
            font-size: 11px;
          }
        }

        @media (max-width: 400px) {
          .vm-tabs {
            gap: 4px;
          }

          .vm-tab {
            padding: 7px 9px;
            font-size: 10px;
          }

          .vm-chat-header {
            gap: 5px;
          }

          .vm-header-actions {
            gap: 4px;
          }

          .vm-header-actions .vm-icon-button {
            height: 32px;
            width: 32px;
          }

          .vm-contact-heading .vm-avatar {
            height: 36px;
            width: 36px;
          }

          .vm-contact-heading h3 {
            font-size: 12px;
          }

          .vm-chat-footer {
            gap: 5px;
            padding: 7px;
          }

          .vm-send-button {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>

      {/* PAGE HEADING */}

      <div className="vm-heading">
        <div className="vm-heading-icon">
          <Icon name="message" size={27} />
        </div>

        <div>
          <h1>Messages</h1>
          <p>
            Stay connected with your customers and never miss an important conversation.
          </p>
        </div>
      </div>

      {/* MAIN LAYOUT */}

      <div className={`vm-layout ${showMobileInbox ? "" : "mobile-chat"}`}>

        {/* =========================================
            INBOX
        ========================================= */}

        <section className="vm-panel vm-inbox">

          <div className="vm-inbox-header">

            <div className="vm-inbox-title">
              <h3>Inbox</h3>

              <button
                className="vm-icon-button"
                onClick={() => document.querySelector(".vm-search input")?.focus()}
                aria-label="Search conversations"
              >
                <Icon name="search" size={17} />
              </button>
            </div>

            <div className="vm-tabs">
              {["All", "Unread", "Starred"].map(tab => (
                <button
                  key={tab}
                  className={`vm-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "All" ? `All (${chats.length})` :
                   tab === "Unread" ? `Unread (${unreadCount})` : "Starred"}
                </button>
              ))}
            </div>

            <div className="vm-search">
              <Icon name="search" size={16} />

              <input
                type="text"
                placeholder="Search conversations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

          </div>

          <div className="vm-chat-list">

            {filteredChats.length > 0 ? (
              filteredChats.map(chat => (
                <div
                  key={chat.id}
                  className={`vm-chat-item ${activeChatId === chat.id ? "active" : ""}`}
                  onClick={() => selectChat(chat)}
                >
                  <div className="vm-avatar-wrap">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="vm-avatar"
                    />

                    {chat.online && <span className="vm-online-dot" />}
                  </div>

                  <div className="vm-chat-info">
                    <div className="vm-chat-info-top">
                      <h4>{chat.name}</h4>
                      <span className="vm-chat-time">{chat.time}</span>
                    </div>

                    <p className="vm-chat-preview">{chat.preview}</p>

                    {chat.unread > 0 && (
                      <span className="vm-unread">{chat.unread}</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="vm-no-results">
                No conversations found.
              </div>
            )}

          </div>

        </section>

        {/* =========================================
            CONVERSATION
        ========================================= */}

        <section className="vm-panel vm-conversation">

          {activeChat && (
            <>
              <header className="vm-chat-header">

                <div className="vm-contact-heading">

                  <button
                    className="vm-icon-button vm-mobile-back"
                    onClick={() => setShowMobileInbox(true)}
                    aria-label="Back to inbox"
                  >
                    <Icon name="arrow" size={17} />
                  </button>

                  <img
                    src={activeChat.avatar}
                    alt={activeChat.name}
                    className="vm-avatar"
                  />

                  <div>
                    <h3>{activeChat.name}</h3>

                    <span className="vm-online-label">
                      {activeChat.online ? "Online" : "Offline"}
                    </span>
                  </div>

                </div>

                <div className="vm-header-actions">

                  <button
                    className="vm-icon-button"
                    onClick={handleCall}
                    title="Call customer"
                  >
                    <Icon name="phone" size={19} />
                  </button>

                  <button
                    className="vm-icon-button"
                    onClick={handleVideo}
                    title="Video call"
                  >
                    <Icon name="video" size={19} />
                  </button>

                  <button
                    className="vm-icon-button"
                    onClick={() => setShowMore(!showMore)}
                    title="More options"
                  >
                    <Icon name="more" size={20} />
                  </button>

                  <button
                    className="vm-icon-button vm-profile-toggle"
                    onClick={() => setShowProfile(!showProfile)}
                    title="Customer profile"
                  >
                    <Icon name="user" size={18} />
                  </button>

                </div>

              </header>

              {showMore && (
                <div style={{
                  padding: 12,
                  background: "#f2f8ff",
                  borderBottom: "1px solid #e0edfc",
                  display: "flex",
                  gap: 10,
                  fontSize: 11
                }}>
                  <button
                    onClick={() => setShowMore(false)}
                    style={{ border: "none", background: "none", color: "#087cf0", cursor: "pointer" }}
                  >
                    Close options
                  </button>

                  <button
                    onClick={() => {
                      setChats(prev => prev.map(chat =>
                        chat.id === activeChatId
                          ? { ...chat, unread: 0 }
                          : chat
                      ));
                      setShowMore(false);
                    }}
                    style={{ border: "none", background: "none", color: "#087cf0", cursor: "pointer" }}
                  >
                    Mark as read
                  </button>
                </div>
              )}

              {/* MESSAGE HISTORY */}

              <div className="vm-messages">

                <div className="vm-date-divider">
                  <span>May 28, 2025</span>
                </div>

                {activeChat.messages.map((msg, index) => (
                  <div
                    key={msg.id}
                    className={`vm-message-row ${msg.sender}`}
                  >

                    <div className="vm-message-bubble">

                      {msg.text}

                      {msg.file && (
                        <div className="vm-file-card">

                          <div className="vm-file-icon">
                            <Icon name="image" size={20} />
                          </div>

                          <div className="vm-file-info">
                            <strong>Wedding_Package.pdf</strong>
                            <small>2.4 MB</small>
                          </div>

                          <button
                            className="vm-file-download"
                            title="Download file"
                            onClick={() => alert("Connect this file to your document storage.")}
                            style={{ border: "none", background: "none" }}
                          >
                            <Icon name="download" size={17} />
                          </button>

                        </div>
                      )}

                      <div className="vm-message-time">
                        {msg.time}

                        {msg.sender === "vendor" && (
                          <Icon name="check" size={12} />
                        )}
                      </div>

                    </div>

                  </div>
                ))}

                <div ref={messagesEndRef} />

              </div>

              {/* MESSAGE COMPOSER */}

              <form className="vm-chat-footer" onSubmit={sendMessage}>

                <button
                  type="button"
                  className="vm-icon-button"
                  onClick={handleAttachment}
                  title="Attach file"
                >
                  <Icon name="paperclip" size={19} />
                </button>

                <div className="vm-message-input">

                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />

                  <button
                    type="button"
                    className="vm-emoji"
                    onClick={() => quickReply(message + " 😊")}
                    title="Add emoji"
                  >
                    <Icon name="smile" size={18} />
                  </button>

                </div>

                <button
                  type="submit"
                  className="vm-send-button"
                  title="Send message"
                  disabled={!message.trim()}
                  style={{
                    opacity: message.trim() ? 1 : .65
                  }}
                >
                  <Icon name="send" size={19} />
                </button>

              </form>

            </>
          )}

        </section>

        {/* =========================================
            CUSTOMER PROFILE
        ========================================= */}

        <aside className={`vm-profile ${showProfile ? "show" : ""}`}>

          {activeChat && (
            <>
              {/* PROFILE CARD */}

              <div className="vm-profile-card">

                <div className="vm-profile-top">

                  <img
                    src={activeChat.avatar}
                    alt={activeChat.name}
                    className="vm-profile-avatar"
                  />

                  <div>
                    <h3>{activeChat.name}</h3>

                    <span className="vm-online-label">
                      {activeChat.online ? "Online" : "Offline"}
                    </span>

                    <p>Customer</p>
                  </div>

                </div>

                <div className="vm-profile-actions">

                  <button
                    className="vm-profile-action"
                    onClick={handleCall}
                  >
                    <Icon name="phone" size={19} />
                    Call
                  </button>

                  <button
                    className="vm-profile-action"
                    onClick={handleVideo}
                  >
                    <Icon name="videoCall" size={19} />
                    Video
                  </button>

                  <button
                    className="vm-profile-action"
                    onClick={() => setShowMore(!showMore)}
                  >
                    <Icon name="more" size={19} />
                    More
                  </button>

                </div>

                <h3 className="vm-section-title">About</h3>

                <div className="vm-detail">
                  <Icon name="mail" size={17} />
                  <div>
                    <strong>Email</strong>
                    {activeChat.email}
                  </div>
                </div>

                <div className="vm-detail">
                  <Icon name="phone" size={17} />
                  <div>
                    <strong>Phone</strong>
                    {activeChat.phone}
                  </div>
                </div>

                <div className="vm-detail">
                  <Icon name="map" size={17} />
                  <div>
                    <strong>Location</strong>
                    {activeChat.location}
                  </div>
                </div>

                <div className="vm-detail">
                  <Icon name="calendar" size={17} />
                  <div>
                    <strong>Member Since</strong>
                    {activeChat.member}
                  </div>
                </div>

              </div>

              {/* QUICK ACTIONS */}

              <div className="vm-quick-card">

                <h3>Quick Actions</h3>

                <div
                  className="vm-quick-action"
                  onClick={() => alert(`Viewing ${activeChat.name}'s profile`)}
                >
                  <span className="vm-quick-icon">
                    <Icon name="user" size={16} />
                  </span>
                  <span>View Profile</span>
                  <Icon name="arrow" size={15} />
                </div>

                <div
                  className="vm-quick-action"
                  onClick={() => quickReply("Hello! Here are your booking details.")}
                >
                  <span className="vm-quick-icon">
                    <Icon name="calendar" size={16} />
                  </span>
                  <span>View Bookings</span>
                  <Icon name="arrow" size={15} />
                </div>

                <div
                  className="vm-quick-action"
                  onClick={handleAttachment}
                >
                  <span className="vm-quick-icon">
                    <Icon name="file" size={16} />
                  </span>
                  <span>Send File</span>
                  <Icon name="arrow" size={15} />
                </div>

                <div
                  className="vm-quick-action"
                  onClick={() => {
                    const note = window.prompt("Enter a customer note:");
                    if (note) alert("Note saved locally: " + note);
                  }}
                >
                  <span className="vm-quick-icon">
                    <Icon name="image" size={16} />
                  </span>
                  <span>Add Note</span>
                  <Icon name="arrow" size={15} />
                </div>

              </div>

              {/* SHARED MEDIA */}

              <div className="vm-media-card">

                <div className="vm-media-heading">
                  <h3>Shared Media</h3>

                  <button
                    onClick={() => alert("Connect this section to your media gallery.")}
                  >
                    View All →
                  </button>
                </div>

                <div className="vm-media-grid">

                  {mediaItems.map((item, index) => (
                    <img
                      key={index}
                      src={item.image}
                      alt={item.title}
                      className="vm-media-image"
                      title={item.title}
                    />
                  ))}

                  <div
                    className="vm-media-more"
                    onClick={() => alert("Connect to the complete shared media gallery.")}
                  >
                    +5
                  </div>

                </div>

              </div>

            </>
          )}

        </aside>

      </div>

    </div>
  );
}
