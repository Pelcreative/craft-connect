import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,

  CalendarDays,
  Check,
  ChevronDown,

  CreditCard,
  Lock,

  Shield,
  ShieldCheck,
  Smartphone,
  Star,
 
  Building2,
  Headphones,
  CheckCircle2,
  AlertCircle,
  Copy,

} from "lucide-react";

const CustomerMakePayment = () => {
  /* =========================================================
     RESPONSIVE STATE
  ========================================================= */

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 650;
  const isTablet = windowWidth > 650 && windowWidth <= 1050;

  /* =========================================================
     PAYMENT STATE
  ========================================================= */

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [formData, setFormData] = useState({
    cardNumber: "1234 5678 9012 3456",
    expiry: "",
    cvv: "",
    cardholder: "Adaeze Okafor",
    address: "12 Freedom Street, GRA",
    city: "Lagos",
    state: "Lagos",
    postalCode: "100001",
  });

  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  /* =========================================================
     BOOKING DATA
  ========================================================= */

  const servicePrice = 280000;
  const serviceFee = 14000;
  const totalAmount = servicePrice + serviceFee;

  /* =========================================================
     HELPERS
  ========================================================= */

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString("en-NG")}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const formatCardNumber = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 16);

    return numbers.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);

    setFormData((prev) => ({
      ...prev,
      cardNumber: formatted,
    }));

    setErrors((prev) => ({
      ...prev,
      cardNumber: "",
    }));
  };

  const validatePayment = () => {
    const newErrors = {};

    if (paymentMethod === "card") {
      if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
        newErrors.cardNumber = "Enter a valid 16-digit card number.";
      }

      if (!formData.expiry) {
        newErrors.expiry = "Expiry date is required.";
      }

      if (formData.cvv.length < 3) {
        newErrors.cvv = "Enter a valid CVV.";
      }

      if (!formData.cardholder.trim()) {
        newErrors.cardholder = "Cardholder name is required.";
      }
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (!validatePayment()) return;

    setPaymentStatus("processing");

    setTimeout(() => {
      setPaymentStatus("success");
      setShowSuccess(true);
    }, 1800);
  };

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText("0123456789");

    setPaymentStatus("copied");

    setTimeout(() => {
      setPaymentStatus("idle");
    }, 1500);
  };

  /* =========================================================
     STYLES
  ========================================================= */

  const colors = {
    navy: "#08244A",
    navyDark: "#061B35",
    blue: "#496DA8",
    orange: "#FF6500",
    orangeLight: "#FFF3E9",
    orangeSoft: "#FFF8F3",
    white: "#FFFFFF",
    background: "#F3F8FD",
    border: "#DCE7F4",
    text: "#122D54",
    muted: "#6E85A7",
    lightBlue: "#EEF5FD",
    green: "#18A66A",
    red: "#D93025",
  };

  const cardStyle = {
    background: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: isMobile ? "16px" : "12px",
    boxShadow: "0 8px 30px rgba(15, 45, 85, 0.04)",
  };

  const inputStyle = {
    width: "100%",
    height: "40px",
    border: `1px solid ${colors.border}`,
    borderRadius: "8px",
    outline: "none",
    padding: "0 13px",
    fontSize: "13px",
    color: colors.text,
    background: "#fff",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: "600",
    color: colors.blue,
    marginBottom: "6px",
  };

  /* =========================================================
     PAYMENT METHOD CARD
  ========================================================= */

  const PaymentMethod = ({
    id,
    title,
    subtitle,
    icon: Icon,
  }) => {
    const active = paymentMethod === id;

    return (
      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          setPaymentMethod(id);
          setErrors({});
          setPaymentStatus("idle");
        }}
        style={{
          flex: 1,
          minWidth: isMobile ? "100%" : "150px",
          minHeight: "68px",
          border: active
            ? `1.5px solid ${colors.orange}`
            : `1px solid ${colors.border}`,
          background: active ? colors.orangeSoft : "#fff",
          borderRadius: "10px",
          cursor: "pointer",
          padding: "12px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textAlign: "left",
          position: "relative",
          transition: "all 0.25s ease",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: active ? "#FFE6D4" : colors.lightBlue,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon
            size={18}
            color={active ? colors.orange : colors.navy}
          />
        </div>

        <div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "700",
              color: active ? colors.orange : colors.navy,
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: "10px",
              color: colors.muted,
              marginTop: "3px",
            }}
          >
            {subtitle}
          </div>
        </div>

        {active && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              position: "absolute",
              right: "7px",
              top: "7px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: colors.orange,
            }}
          />
        )}
      </motion.button>
    );
  };

  /* =========================================================
     STEP ITEM
  ========================================================= */

  const StepItem = ({ number, title, subtitle, active }) => {
    return (
      <motion.div
        animate={{
          opacity: active ? 1 : 0.8,
          x: active ? 0 : 0,
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "13px",
          borderRadius: "10px",
          background: active ? colors.orangeSoft : "transparent",
          borderLeft: active
            ? `2px solid ${colors.orange}`
            : "2px solid transparent",
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: active ? colors.orange : colors.lightBlue,
            color: active ? "#fff" : colors.navy,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: "700",
            flexShrink: 0,
          }}
        >
          {number}
        </div>

        <div>
          <div
            style={{
              fontSize: "12px",
              color: active ? colors.orange : colors.blue,
              fontWeight: "700",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: "9px",
              color: colors.muted,
              marginTop: "3px",
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </div>
        </div>
      </motion.div>
    );
  };

  /* =========================================================
     FIELD COMPONENT
  ========================================================= */

  const Field = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    type = "text",
  }) => {
    return (
      <div style={{ width: "100%" }}>
        <label style={labelStyle}>{label}</label>

        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            ...inputStyle,
            borderColor: error ? colors.red : colors.border,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = colors.orange;
            e.currentTarget.style.boxShadow =
              "0 0 0 3px rgba(255, 101, 0, 0.08)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error
              ? colors.red
              : colors.border;

            e.currentTarget.style.boxShadow = "none";
          }}
        />

        {error && (
          <div
            style={{
              color: colors.red,
              fontSize: "10px",
              marginTop: "4px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <AlertCircle size={11} />
            {error}
          </div>
        )}
      </div>
    );
  };

  /* =========================================================
     MAIN RENDER
  ========================================================= */

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg, #F5F9FD 0%, #EDF5FC 50%, #F7FAFD 100%)",
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: colors.text,
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: isMobile ? "20px 16px 10px" : "28px 22px 18px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              border: "none",
              background: "#fff",
              boxShadow: "0 5px 20px rgba(0,0,0,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <ArrowLeft size={23} color={colors.navy} />
          </motion.button>

          <div>
            <h1
              style={{
                margin: 0,
                color: colors.navy,
                fontSize: isMobile ? "22px" : "26px",
                fontWeight: "800",
                letterSpacing: "-0.5px",
              }}
            >
              Make Payment
            </h1>

            <p
              style={{
                margin: "3px 0 0",
                color: colors.blue,
                fontSize: isMobile ? "11px" : "12px",
              }}
            >
              Complete your payment securely and get instant confirmation.
            </p>
          </div>
        </div>
      </motion.div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: isMobile
            ? "8px 16px 30px"
            : "5px 22px 40px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
              ? "220px 1fr"
              : "220px minmax(0, 1fr) 330px",
            gap: isMobile ? "16px" : "12px",
            alignItems: "start",
          }}
        >
          {/* =================================================
              LEFT STEP PANEL
          ================================================= */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                ...cardStyle,
                padding: "10px",
              }}
            >
              <StepItem
                number="1"
                title="Payment Method"
                subtitle="Choose how you want to pay"
                active={paymentStatus !== "success"}
              />

              <StepItem
                number="2"
                title="Review & Confirm"
                subtitle="Check your details"
                active={false}
              />

              <StepItem
                number="3"
                title="Payment Complete"
                subtitle="Get your booking confirmation"
                active={paymentStatus === "success"}
              />
            </div>

            {/* Security card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{
                ...cardStyle,
                padding: "20px",
                background:
                  "linear-gradient(145deg, #FFF9F5 0%, #FFF1E7 100%)",
              }}
            >
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "50%",
                  background: "#FFE2CF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <ShieldCheck size={25} color={colors.orange} />
              </div>

              <h3
                style={{
                  margin: 0,
                  fontSize: "15px",
                  color: colors.navy,
                }}
              >
                Secure & Trusted
              </h3>

              <p
                style={{
                  fontSize: "10px",
                  color: colors.blue,
                  lineHeight: 1.6,
                  margin: "7px 0 16px",
                }}
              >
                Your payment is protected with 256-bit SSL encryption.
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "5px",
                }}
              >
                {[
                  ["SSL", Lock],
                  ["PCI", ShieldCheck],
                  ["Secure", Shield],
                ].map(([text, Icon]) => (
                  <div
                    key={text}
                    style={{
                      textAlign: "center",
                      flex: 1,
                    }}
                  >
                    <Icon
                      size={16}
                      color={colors.navy}
                      style={{ marginBottom: "4px" }}
                    />

                    <div
                      style={{
                        fontSize: "8px",
                        color: colors.navy,
                        fontWeight: "600",
                      }}
                    >
                      {text}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* =================================================
              CENTER PAYMENT FORM
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              ...cardStyle,
              padding: isMobile ? "18px" : "20px",
              minWidth: 0,
            }}
          >
            {/* Payment method */}
            <section>
              <h2
                style={{
                  margin: "0 0 14px",
                  fontSize: "16px",
                  color: colors.navy,
                }}
              >
                Select Payment Method
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: "10px",
                }}
              >
                <PaymentMethod
                  id="card"
                  title="Card Payment"
                  subtitle="Debit / Credit Card"
                  icon={CreditCard}
                />

                <PaymentMethod
                  id="bank"
                  title="Bank Transfer"
                  subtitle="Direct Bank Transfer"
                  icon={Building2}
                />

                <PaymentMethod
                  id="ussd"
                  title="USSD"
                  subtitle="Pay with USSD"
                  icon={Smartphone}
                />
              </div>
            </section>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: colors.border,
                margin: "15px 0",
              }}
            />

            <AnimatePresence mode="wait">
              {/* =================================================
                  CARD PAYMENT
              ================================================= */}

              {paymentMethod === "card" && (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                >
                  <h2
                    style={{
                      margin: "0 0 15px",
                      fontSize: "16px",
                      color: colors.navy,
                    }}
                  >
                    Card Details
                  </h2>

                  <div style={{ marginBottom: "14px" }}>
                    <label style={labelStyle}>Card Number</label>

                    <div style={{ position: "relative" }}>
                      <input
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        style={{
                          ...inputStyle,
                          paddingRight: "95px",
                          borderColor: errors.cardNumber
                            ? colors.red
                            : colors.border,
                        }}
                      />

                      <div
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "900",
                            fontStyle: "italic",
                            color: "#1B48A0",
                          }}
                        >
                          VISA
                        </span>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              width: "14px",
                              height: "14px",
                              borderRadius: "50%",
                              background: "#F04B31",
                              display: "block",
                              opacity: 0.9,
                            }}
                          />

                          <span
                            style={{
                              width: "14px",
                              height: "14px",
                              borderRadius: "50%",
                              background: "#FFB000",
                              display: "block",
                              marginLeft: "-5px",
                              opacity: 0.9,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {errors.cardNumber && (
                      <div
                        style={{
                          color: colors.red,
                          fontSize: "10px",
                          marginTop: "4px",
                        }}
                      >
                        {errors.cardNumber}
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile
                        ? "1fr"
                        : "1fr 1fr",
                      gap: "12px",
                      marginBottom: "14px",
                    }}
                  >
                    <Field
                      label="Expiry Date"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      placeholder="MM / YY"
                      error={errors.expiry}
                    />

                    <Field
                      label="CVV"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      type="password"
                      error={errors.cvv}
                    />
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <Field
                      label="Cardholder Name"
                      name="cardholder"
                      value={formData.cardholder}
                      onChange={handleChange}
                      placeholder="Enter cardholder name"
                      error={errors.cardholder}
                    />
                  </div>
                </motion.div>
              )}

              {/* =================================================
                  BANK TRANSFER
              ================================================= */}

              {paymentMethod === "bank" && (
                <motion.div
                  key="bank"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                >
                  <h2
                    style={{
                      margin: "0 0 14px",
                      fontSize: "16px",
                      color: colors.navy,
                    }}
                  >
                    Bank Transfer
                  </h2>

                  <div
                    style={{
                      padding: "18px",
                      background: colors.lightBlue,
                      borderRadius: "10px",
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "15px",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Building2
                          size={20}
                          color={colors.navy}
                        />
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "700",
                            color: colors.navy,
                          }}
                        >
                          CraftConnect Escrow Account
                        </div>

                        <div
                          style={{
                            fontSize: "10px",
                            color: colors.muted,
                          }}
                        >
                          Make your transfer using the details below.
                        </div>
                      </div>
                    </div>

                    {[
                      ["Bank", "Access Bank"],
                      ["Account Name", "CraftConnect Limited"],
                      ["Account Number", "0123456789"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px 0",
                          borderBottom: `1px solid ${colors.border}`,
                          gap: "10px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "11px",
                            color: colors.muted,
                          }}
                        >
                          {label}
                        </span>

                        <strong
                          style={{
                            fontSize: "11px",
                            color: colors.navy,
                            textAlign: "right",
                          }}
                        >
                          {value}
                        </strong>
                      </div>
                    ))}

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleCopyAccount}
                      style={{
                        marginTop: "14px",
                        width: "100%",
                        height: "38px",
                        border: `1px solid ${colors.orange}`,
                        color: colors.orange,
                        background: "#fff",
                        borderRadius: "8px",
                        fontWeight: "700",
                        fontSize: "11px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "7px",
                      }}
                    >
                      {paymentStatus === "copied" ? (
                        <>
                          <Check size={15} />
                          Account Number Copied
                        </>
                      ) : (
                        <>
                          <Copy size={15} />
                          Copy Account Number
                        </>
                      )}
                    </motion.button>
                  </div>

                  <div
                    style={{
                      padding: "12px",
                      background: colors.orangeSoft,
                      borderRadius: "8px",
                      color: colors.blue,
                      fontSize: "10px",
                      lineHeight: 1.5,
                    }}
                  >
                    After transferring the amount, click the payment button
                    below. Your booking will be confirmed after the transfer
                    is verified.
                  </div>
                </motion.div>
              )}

              {/* =================================================
                  USSD PAYMENT
              ================================================= */}

              {paymentMethod === "ussd" && (
                <motion.div
                  key="ussd"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                >
                  <h2
                    style={{
                      margin: "0 0 14px",
                      fontSize: "16px",
                      color: colors.navy,
                    }}
                  >
                    Pay With USSD
                  </h2>

                  <div
                    style={{
                      padding: "22px",
                      background: colors.lightBlue,
                      borderRadius: "12px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "54px",
                        height: "54px",
                        margin: "0 auto 12px",
                        borderRadius: "50%",
                        background: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Smartphone
                        size={25}
                        color={colors.orange}
                      />
                    </div>

                    <h3
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        color: colors.navy,
                      }}
                    >
                      Dial your bank's USSD code
                    </h3>

                    <p
                      style={{
                        margin: "7px 0 15px",
                        fontSize: "10px",
                        color: colors.muted,
                      }}
                    >
                      Follow the instructions from your bank to complete
                      payment.
                    </p>

                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px 20px",
                        background: colors.navy,
                        color: "#fff",
                        borderRadius: "8px",
                        fontWeight: "800",
                        letterSpacing: "1px",
                        fontSize: "16px",
                      }}
                    >
                      *737#
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* =================================================
                BILLING ADDRESS
            ================================================= */}

            <div
              style={{
                height: "1px",
                background: colors.border,
                margin: "18px 0",
              }}
            />

            <h2
              style={{
                margin: "0 0 14px",
                fontSize: "16px",
                color: colors.navy,
              }}
            >
              Billing Address
            </h2>

            <div style={{ marginBottom: "13px" }}>
              <Field
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                error={errors.address}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "1fr 1fr",
                gap: "12px",
                marginBottom: "13px",
              }}
            >
              <Field
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Lagos"
                error={errors.city}
              />

              <div>
                <label style={labelStyle}>State</label>

                <div style={{ position: "relative" }}>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      appearance: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option>Lagos</option>
                    <option>Abuja</option>
                    <option>Rivers</option>
                    <option>Oyo</option>
                    <option>Kano</option>
                    <option>Enugu</option>
                    <option>Delta</option>
                    <option>Ogun</option>
                  </select>

                  <ChevronDown
                    size={15}
                    color={colors.blue}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                width: isMobile ? "100%" : "50%",
                paddingRight: isMobile ? "0" : "6px",
                boxSizing: "border-box",
              }}
            >
              <Field
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="100001"
                error={errors.postalCode}
              />
            </div>

            {/* =================================================
                PAYMENT BUTTON
            ================================================= */}

            <motion.button
              whileHover={{
                scale: 1.005,
                boxShadow: "0 10px 25px rgba(255,101,0,0.22)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              disabled={paymentStatus === "processing"}
              style={{
                width: "100%",
                height: "44px",
                marginTop: "14px",
                border: "none",
                borderRadius: "8px",
                background:
                  paymentStatus === "processing"
                    ? "#D8DDE4"
                    : `linear-gradient(90deg, ${colors.orange}, #FF4D00)`,
                color: "#fff",
                fontWeight: "800",
                fontSize: "12px",
                cursor:
                  paymentStatus === "processing"
                    ? "not-allowed"
                    : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {paymentStatus === "processing" ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      width: "15px",
                      height: "15px",
                      borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.4)",
                      borderTopColor: "#fff",
                    }}
                  />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock size={15} />
                  Pay {formatCurrency(totalAmount)}
                  <ArrowRight size={16} />
                </>
              )}
            </motion.button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                color: colors.muted,
                fontSize: "9px",
                marginTop: "10px",
              }}
            >
              <ShieldCheck size={12} color={colors.navy} />
              Your payment information is secure and encrypted
            </div>
          </motion.div>

          {/* =================================================
              RIGHT BOOKING SUMMARY
          ================================================= */}

          {!isTablet && !isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  ...cardStyle,
                  padding: "18px",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 18px",
                    fontSize: "16px",
                    color: colors.navy,
                  }}
                >
                  Booking Summary
                </h2>

                {/* Vendor */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    paddingBottom: "15px",
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      background: colors.lightBlue,
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=200&q=80"
                      alt="Fashion designer"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <h3
                      style={{
                        margin: "2px 0 5px",
                        fontSize: "12px",
                        color: colors.navy,
                      }}
                    >
                      Zainab's Fashion Hub
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "10px",
                        color: colors.muted,
                      }}
                    >
                      Fashion Designer & Tailor
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        marginTop: "7px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "1px",
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((item) => (
                          <Star
                            key={item}
                            size={11}
                            fill="#FF9F00"
                            color="#FF9F00"
                          />
                        ))}
                      </div>

                      <span
                        style={{
                          fontSize: "10px",
                          color: colors.blue,
                        }}
                      >
                        4.8 (124)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    padding: "15px 0",
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      background: colors.lightBlue,
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=200&q=80"
                      alt="Custom Ankara dress"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div>
                    <h3
                      style={{
                        margin: "3px 0 6px",
                        fontSize: "12px",
                        color: colors.navy,
                      }}
                    >
                      Custom Ankara Dress
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "10px",
                        color: colors.muted,
                      }}
                    >
                      Quantity: 1
                    </p>

                    <strong
                      style={{
                        display: "block",
                        marginTop: "7px",
                        fontSize: "13px",
                        color: colors.navy,
                      }}
                    >
                      {formatCurrency(servicePrice)}
                    </strong>
                  </div>
                </div>

                {/* Price breakdown */}
                <div
                  style={{
                    padding: "15px 0 5px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                      fontSize: "11px",
                    }}
                  >
                    <span style={{ color: colors.blue }}>
                      Service Price
                    </span>

                    <strong style={{ color: colors.navy }}>
                      {formatCurrency(servicePrice)}
                    </strong>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "17px",
                      fontSize: "11px",
                    }}
                  >
                    <span style={{ color: colors.blue }}>
                      Service Fee (5%)
                    </span>

                    <strong style={{ color: colors.navy }}>
                      {formatCurrency(serviceFee)}
                    </strong>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "13px",
                      borderTop: `1px solid ${colors.border}`,
                    }}
                  >
                    <strong
                      style={{
                        fontSize: "14px",
                        color: colors.navy,
                      }}
                    >
                      Total Amount
                    </strong>

                    <strong
                      style={{
                        fontSize: "15px",
                        color: colors.navy,
                      }}
                    >
                      {formatCurrency(totalAmount)}
                    </strong>
                  </div>
                </div>

                {/* Booking date */}
                <div
                  style={{
                    marginTop: "15px",
                    padding: "14px",
                    background: colors.orangeSoft,
                    borderRadius: "9px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#FFE1CC",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <CalendarDays
                      size={18}
                      color={colors.orange}
                    />
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        color: colors.navy,
                      }}
                    >
                      Booking Date
                    </div>

                    <div
                      style={{
                        fontSize: "10px",
                        color: colors.navy,
                        marginTop: "4px",
                      }}
                    >
                      May 28, 2025 • 10:00 AM
                    </div>
                  </div>
                </div>
              </div>

              {/* Help card */}
              <div
                style={{
                  ...cardStyle,
                  padding: "18px",
                  background:
                    "linear-gradient(145deg, #FFFDFC, #FFF7F3)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      background: "#FFE8D7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Headphones
                      size={19}
                      color={colors.orange}
                    />
                  </div>

                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        color: colors.navy,
                      }}
                    >
                      Need Help?
                    </h3>

                    <p
                      style={{
                        margin: "4px 0 0",
                        fontSize: "9px",
                        color: colors.muted,
                      }}
                    >
                      Our support team is available 24/7.
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%",
                    height: "38px",
                    borderRadius: "8px",
                    border: `1px solid ${colors.orange}`,
                    background: "#fff",
                    color: colors.orange,
                    fontSize: "10px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Contact Support
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>

        {/* =====================================================
            TABLET BOOKING SUMMARY
        ===================================================== */}

        {isTablet && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              ...cardStyle,
              marginTop: "12px",
              padding: "18px",
            }}
          >
            <h2
              style={{
                margin: "0 0 15px",
                fontSize: "16px",
                color: colors.navy,
              }}
            >
              Booking Summary
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=200&q=80"
                  alt="Fashion designer"
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                <div>
                  <strong
                    style={{
                      fontSize: "13px",
                      color: colors.navy,
                    }}
                  >
                    Zainab's Fashion Hub
                  </strong>

                  <p
                    style={{
                      margin: "5px 0",
                      fontSize: "10px",
                      color: colors.muted,
                    }}
                  >
                    Fashion Designer & Tailor
                  </p>

                  <span
                    style={{
                      fontSize: "11px",
                      color: colors.orange,
                    }}
                  >
                    ★★★★★ 4.8
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: colors.muted,
                    }}
                  >
                    Total Amount
                  </span>

                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "800",
                      color: colors.navy,
                      marginTop: "4px",
                    }}
                  >
                    {formatCurrency(totalAmount)}
                  </div>
                </div>

                <div
                  style={{
                    padding: "10px 13px",
                    background: colors.orangeSoft,
                    borderRadius: "8px",
                    fontSize: "10px",
                    color: colors.navy,
                  }}
                >
                  May 28, 2025 • 10:00 AM
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* =====================================================
            MOBILE SUMMARY
        ===================================================== */}

        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              ...cardStyle,
              marginTop: "0",
              padding: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "14px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "15px",
                  color: colors.navy,
                }}
              >
                Booking Summary
              </h2>

              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "800",
                  color: colors.navy,
                }}
              >
                {formatCurrency(totalAmount)}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                gap: "11px",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=200&q=80"
                alt="Fashion designer"
                style={{
                  width: "58px",
                  height: "58px",
                  objectFit: "cover",
                  borderRadius: "7px",
                }}
              />

              <div>
                <strong
                  style={{
                    fontSize: "12px",
                    color: colors.navy,
                  }}
                >
                  Zainab's Fashion Hub
                </strong>

                <div
                  style={{
                    fontSize: "10px",
                    color: colors.muted,
                    marginTop: "4px",
                  }}
                >
                  Custom Ankara Dress • Qty: 1
                </div>

                <div
                  style={{
                    fontSize: "10px",
                    color: colors.orange,
                    marginTop: "5px",
                  }}
                >
                  ★★★★★ 4.8 (124)
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "13px",
                padding: "10px",
                background: colors.orangeSoft,
                borderRadius: "7px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CalendarDays
                size={15}
                color={colors.orange}
              />

              <span
                style={{
                  fontSize: "10px",
                  color: colors.navy,
                }}
              >
                May 28, 2025 • 10:00 AM
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* =====================================================
          SUCCESS MODAL
      ===================================================== */}

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(4, 23, 45, 0.65)",
              backdropFilter: "blur(7px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 20,
              }}
              style={{
                width: "100%",
                maxWidth: "400px",
                background: "#fff",
                borderRadius: "18px",
                padding: "32px 24px",
                textAlign: "center",
                boxShadow: "0 25px 80px rgba(0,0,0,0.2)",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                }}
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "#E7F8F0",
                  margin: "0 auto 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircle2
                  size={38}
                  color={colors.green}
                />
              </motion.div>

              <h2
                style={{
                  margin: 0,
                  color: colors.navy,
                  fontSize: "22px",
                }}
              >
                Payment Successful!
              </h2>

              <p
                style={{
                  color: colors.muted,
                  fontSize: "12px",
                  lineHeight: 1.6,
                  margin: "10px auto 18px",
                  maxWidth: "290px",
                }}
              >
                Your payment of{" "}
                <strong style={{ color: colors.navy }}>
                  {formatCurrency(totalAmount)}
                </strong>{" "}
                has been processed successfully.
              </p>

              <div
                style={{
                  background: colors.lightBlue,
                  borderRadius: "10px",
                  padding: "14px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    color: colors.muted,
                    marginBottom: "4px",
                  }}
                >
                  Booking Reference
                </div>

                <strong
                  style={{
                    color: colors.navy,
                    fontSize: "14px",
                    letterSpacing: "1px",
                  }}
                >
                  CC-2025-0528
                </strong>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowSuccess(false)}
                style={{
                  width: "100%",
                  height: "43px",
                  border: "none",
                  borderRadius: "8px",
                  background: colors.orange,
                  color: "#fff",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerMakePayment;