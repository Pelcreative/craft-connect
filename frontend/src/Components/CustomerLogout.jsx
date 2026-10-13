import  { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  LogOut,
  X,
  ShieldCheck,
  LockKeyhole,
  MessageCircle,
} from "lucide-react";

const CustomerLogout = ({ onLogout, onBack }) => {
  const [showModal, setShowModal] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [screen, setScreen] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  /* =========================================================
     RESPONSIVE SCREEN SIZE
  ========================================================= */

  useEffect(() => {
    const handleResize = () => {
      setScreen({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = screen.width <= 600;
  const isTablet = screen.width > 600 && screen.width <= 900;
  const isShortScreen = screen.height <= 650;

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      if (onLogout) {
        await onLogout();
        return;
      }

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      setTimeout(() => {
        window.location.href = "/login";
      }, 700);
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  /* =========================================================
     BACK
  ========================================================= */

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  /* =========================================================
     PAGE
  ========================================================= */

  const page = {
    minHeight: "100dvh",
    width: "100%",
    boxSizing: "border-box",
    background:
      "linear-gradient(135deg, #f8fafc 0%, #f4f7fa 55%, #edf2f6 100%)",
    fontFamily:
      "Inter, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    color: "#09284d",
    overflowX: "hidden",
    position: "relative",
  };

  const container = {
    width: "100%",
    maxWidth: "1240px",
    margin: "0 auto",
    padding: isMobile
      ? "25px 16px 35px"
      : isTablet
      ? "35px 25px 40px"
      : "42px 32px 50px",
    boxSizing: "border-box",
    position: "relative",
    zIndex: 2,
  };

  /* =========================================================
     HEADER
  ========================================================= */

  const header = {
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "12px" : "16px",
    marginBottom: isMobile ? "25px" : "32px",
  };

  const backButton = {
    width: isMobile ? "44px" : "50px",
    height: isMobile ? "44px" : "50px",
    minWidth: isMobile ? "44px" : "50px",
    borderRadius: "50%",
    border: "1px solid #dce5ed",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#09284d",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(9,40,77,0.06)",
  };

  /* =========================================================
     MAIN GRID
  ========================================================= */

  const grid = {
    display: "grid",
    gridTemplateColumns:
      isMobile || isTablet
        ? "1fr"
        : "minmax(0, 1.55fr) minmax(310px, 0.85fr)",
    gap: isMobile ? "18px" : "24px",
  };

  /* =========================================================
     ILLUSTRATION CARD
  ========================================================= */

  const illustration = {
    minHeight: isMobile
      ? "260px"
      : isShortScreen
      ? "300px"
      : "380px",

    borderRadius: isMobile ? "18px" : "20px",
    border: "1px solid #e0e7ee",

    background:
      "linear-gradient(145deg, rgba(255,255,255,.96), rgba(248,250,252,.9))",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    position: "relative",
    overflow: "hidden",

    boxShadow: "0 10px 30px rgba(9,40,77,.04)",
  };

  /* =========================================================
     INFORMATION CARD
  ========================================================= */

  const informationCard = {
    background: "#ffffff",
    border: "1px solid #e0e7ee",
    borderRadius: isMobile ? "18px" : "20px",
    padding: isMobile ? "22px 18px" : "27px 24px",
    boxSizing: "border-box",
    boxShadow: "0 10px 30px rgba(9,40,77,.04)",
  };

  /* =========================================================
     FEATURE
  ========================================================= */

  const feature = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "13px",
    marginTop: "11px",
    border: "1px solid #e3e9ef",
    borderRadius: "13px",
    background: "#fcfdfe",
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div style={page}>
      {/* Decorative background */}
      <div
        style={{
          position: "absolute",
          width: isMobile ? "220px" : "380px",
          height: isMobile ? "220px" : "380px",
          borderRadius: "50%",
          background: "rgba(255,107,0,.035)",
          top: "-150px",
          right: "-150px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: isMobile ? "250px" : "420px",
          height: isMobile ? "250px" : "420px",
          borderRadius: "50%",
          background: "rgba(9,40,77,.025)",
          bottom: "-210px",
          left: "-180px",
          pointerEvents: "none",
        }}
      />

      <main style={container}>
        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div
          style={header}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <motion.button
            type="button"
            onClick={handleBack}
            style={backButton}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(9,40,77,.12)",
            }}
            whileTap={{ scale: 0.94 }}
          >
            <ArrowLeft size={isMobile ? 20 : 22} />
          </motion.button>

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: isMobile ? "26px" : "32px",
                lineHeight: 1.1,
                fontWeight: 750,
                letterSpacing: "-0.6px",
                color: "#092d55",
              }}
            >
              Logout
            </h1>

            <p
              style={{
                margin: "6px 0 0",
                fontSize: isMobile ? "12px" : "14px",
                color: "#6c8099",
                lineHeight: 1.4,
              }}
            >
              Are you sure you want to log out of your account?
            </p>
          </div>
        </motion.div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <motion.div
          style={grid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          {/* LEFT */}
          <motion.div
            style={illustration}
            whileHover={{
              boxShadow: "0 18px 40px rgba(9,40,77,.07)",
            }}
          >
            {/* Rotating circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                position: "absolute",
                width: isMobile ? "185px" : "270px",
                height: isMobile ? "185px" : "270px",
                border: "1px dashed rgba(242,101,34,.22)",
                borderRadius: "50%",
              }}
            />

            {/* Inner circle */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                width: isMobile ? "125px" : "175px",
                height: isMobile ? "125px" : "175px",
                borderRadius: "50%",
                background: "rgba(242,101,34,.055)",
              }}
            />

            {/* Lock */}
            <motion.div
              animate={{
                y: [0, -7, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "relative",
                zIndex: 2,
                width: isMobile ? "82px" : "112px",
                height: isMobile ? "82px" : "112px",
                borderRadius: "22px",
                background:
                  "linear-gradient(145deg,#f97316,#dd5600)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 18px 40px rgba(242,101,34,.24)",
              }}
            >
              <LockKeyhole
                size={isMobile ? 43 : 58}
                color="#ffffff"
                strokeWidth={1.7}
              />
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            style={informationCard}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: isMobile ? "20px" : "23px",
                fontWeight: 750,
                color: "#092d55",
              }}
            >
              You're almost out!
            </h2>

            <p
              style={{
                margin: "8px 0 17px",
                fontSize: isMobile ? "12px" : "13px",
                color: "#6c8099",
                lineHeight: 1.6,
              }}
            >
              Logging out will keep your account safe and secure.
              You can always come back anytime.
            </p>

            {/* FEATURE 1 */}
            <motion.div
              style={feature}
              whileHover={{
                x: 3,
                borderColor: "#f5cdb8",
              }}
            >
              <FeatureIcon>
                <ShieldCheck size={19} color="#f26522" />
              </FeatureIcon>

              <FeatureText
                title="Your data is safe"
                description="We protect your information."
              />
            </motion.div>

            {/* FEATURE 2 */}
            <motion.div
              style={feature}
              whileHover={{
                x: 3,
                borderColor: "#f5cdb8",
              }}
            >
              <FeatureIcon>
                <LogOut size={18} color="#f26522" />
              </FeatureIcon>

              <FeatureText
                title="Easy to come back"
                description="Log in anytime, anywhere."
              />
            </motion.div>

            {/* FEATURE 3 */}
            <motion.div
              style={feature}
              whileHover={{
                x: 3,
                borderColor: "#f5cdb8",
              }}
            >
              <FeatureIcon>
                <MessageCircle size={18} color="#f26522" />
              </FeatureIcon>

              <FeatureText
                title="Stay connected"
                description="Your journey continues."
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* =========================================================
          LOGOUT MODAL
      ========================================================= */}

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,

              /*
                IMPORTANT:
                Flex centering is used instead of
                top: 50% + transform.
              */
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              /*
                Keeps the modal away from screen edges
                on small phones.
              */
              padding: isMobile ? "12px" : "18px",

              boxSizing: "border-box",

              background: "rgba(7,25,43,.46)",

              backdropFilter: "blur(7px)",
              WebkitBackdropFilter: "blur(7px)",
            }}
            onClick={() => setShowModal(false)}
          >
            {/* =================================================
                MODAL
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 15,
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 26,
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",

                /*
                  Desktop = approximately the screenshot size.
                  Mobile = almost full screen width.
                */
                width: isMobile
                  ? "100%"
                  : isTablet
                  ? "470px"
                  : "450px",

                maxWidth: "450px",

                /*
                  THIS FIXES YOUR CURRENT PROBLEM.
                  The modal can never extend beyond the viewport.
                */
                maxHeight: "calc(100dvh - 24px)",

                overflowY: "auto",

                boxSizing: "border-box",

                background: "#ffffff",

                borderRadius: isMobile ? "18px" : "17px",

                padding: isMobile
                  ? isShortScreen
                    ? "20px 17px 17px"
                    : "25px 18px 20px"
                  : isShortScreen
                  ? "21px 25px 21px"
                  : "27px 27px 25px",

                textAlign: "center",

                boxShadow:
                  "0 30px 80px rgba(3,25,48,.24)",

                /*
                  Prevents the browser from showing a
                  horizontal scrollbar.
                */
                overflowX: "hidden",

                scrollbarWidth: "thin",
              }}
            >
              {/* CLOSE */}
              <motion.button
                type="button"
                onClick={() => setShowModal(false)}
                whileHover={{
                  scale: 1.1,
                  rotate: 90,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                style={{
                  position: "absolute",
                  top: isMobile ? "12px" : "14px",
                  right: isMobile ? "12px" : "14px",

                  width: "32px",
                  height: "32px",

                  border: "none",
                  background: "transparent",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  color: "#537292",
                  cursor: "pointer",

                  zIndex: 5,
                }}
              >
                <X size={20} strokeWidth={2} />
              </motion.button>

              {/* =================================================
                  ICON
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.65,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 300,
                }}
                style={{
                  width: isMobile
                    ? isShortScreen
                      ? "58px"
                      : "66px"
                    : "76px",

                  height: isMobile
                    ? isShortScreen
                      ? "58px"
                      : "66px"
                    : "76px",

                  margin: isMobile
                    ? "0 auto 13px"
                    : "0 auto 17px",

                  borderRadius: "50%",

                  background: "#fff5ef",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: isMobile
                      ? isShortScreen
                        ? "34px"
                        : "39px"
                      : "46px",

                    height: isMobile
                      ? isShortScreen
                        ? "34px"
                        : "39px"
                      : "46px",

                    borderRadius: "11px",

                    background: "#fff0e7",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LogOut
                    size={
                      isMobile
                        ? isShortScreen
                          ? 20
                          : 23
                        : 27
                    }
                    color="#f26522"
                    strokeWidth={2.2}
                  />
                </div>
              </motion.div>

              {/* =================================================
                  TITLE
              ================================================= */}

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.16,
                }}
                style={{
                  margin: "0 0 8px",

                  fontSize: isMobile
                    ? isShortScreen
                      ? "22px"
                      : "24px"
                    : "27px",

                  lineHeight: 1.2,

                  color: "#092d55",

                  fontWeight: 750,

                  letterSpacing: "-0.5px",
                }}
              >
                Log Out?
              </motion.h2>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.21,
                }}
                style={{
                  margin: "0 auto",

                  width: "100%",
                  maxWidth: "340px",

                  fontSize: isMobile
                    ? isShortScreen
                      ? "12px"
                      : "13px"
                    : "14px",

                  lineHeight: 1.55,

                  color: "#607795",
                }}
              >
                Are you sure you want to log out of your account?
                <br />

                You'll need to sign in again to access your
                dashboard, bookings and messages.
              </motion.p>

              {/* =================================================
                  BUTTONS
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.26,
                }}
                style={{
                  display: "grid",

                  /*
                    Mobile buttons stack.
                    Desktop buttons sit beside each other.
                  */
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "1fr 1fr",

                  gap: isMobile ? "9px" : "12px",

                  marginTop: isMobile
                    ? isShortScreen
                      ? "17px"
                      : "21px"
                    : "24px",
                }}
              >
                {/* CANCEL */}
                <motion.button
                  type="button"
                  onClick={() => setShowModal(false)}
                  whileHover={{
                    y: -2,
                    backgroundColor: "#f8fafc",
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  style={{
                    width: "100%",

                    height: isMobile ? "45px" : "44px",

                    borderRadius: "10px",

                    border: "1px solid #d5e0eb",

                    background: "#ffffff",

                    color: "#092d55",

                    fontSize: "14px",

                    fontWeight: 650,

                    cursor: "pointer",

                    boxSizing: "border-box",
                  }}
                >
                  Cancel
                </motion.button>

                {/* LOGOUT */}
                <motion.button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  whileHover={
                    !isLoggingOut
                      ? {
                          y: -2,
                          boxShadow:
                            "0 8px 20px rgba(242,101,34,.24)",
                        }
                      : {}
                  }
                  whileTap={
                    !isLoggingOut
                      ? {
                          scale: 0.97,
                        }
                      : {}
                  }
                  style={{
                    width: "100%",

                    height: isMobile ? "45px" : "44px",

                    borderRadius: "10px",

                    border: "none",

                    background: isLoggingOut
                      ? "#ff9b6c"
                      : "linear-gradient(135deg,#ff681c,#f25508)",

                    color: "#ffffff",

                    fontSize: "14px",

                    fontWeight: 700,

                    cursor: isLoggingOut
                      ? "wait"
                      : "pointer",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",

                    boxSizing: "border-box",

                    boxShadow:
                      "0 5px 14px rgba(242,101,34,.14)",
                  }}
                >
                  {isLoggingOut ? (
                    <>
                      <motion.span
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 0.75,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{
                          width: "15px",
                          height: "15px",
                          borderRadius: "50%",
                          border:
                            "2px solid rgba(255,255,255,.4)",
                          borderTopColor: "#ffffff",
                        }}
                      />

                      Logging out...
                    </>
                  ) : (
                    <>
                      <LogOut size={16} />
                      Log Out
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* =============================================================
   SMALL REUSABLE COMPONENTS
============================================================= */

const FeatureIcon = ({ children }) => {
  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        minWidth: "40px",
        borderRadius: "50%",
        background: "#fff2e9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};

const FeatureText = ({ title, description }) => {
  return (
    <div
      style={{
        minWidth: 0,
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "13px",
          fontWeight: 700,
          color: "#173657",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: "3px 0 0",
          fontSize: "11px",
          color: "#71859d",
          lineHeight: 1.4,
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default CustomerLogout;