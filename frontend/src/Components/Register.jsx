import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "client",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Register Data:", formData);

    // Add your registration API here

    // After successful registration:
    // navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#FFF9F4] flex items-center justify-center px-4 py-10 overflow-hidden">

      {/* Background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#F36B16]/10 rounded-full blur-3xl" />

      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#07172D]/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_60px_rgba(7,23,45,0.10)] overflow-hidden"
      >

        <div className="grid lg:grid-cols-2">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:flex bg-[#07172D] p-12 flex-col justify-between relative overflow-hidden"
          >

            {/* Decorations */}
            <div className="absolute -top-28 -right-28 w-80 h-80 border border-[#F36B16]/20 rounded-full" />

            <div className="absolute -bottom-40 -left-32 w-96 h-96 border border-white/10 rounded-full" />

            <div className="relative z-10">

              <Link
                to="/"
                className="inline-flex items-center gap-2"
              >
                <div className="w-10 h-10 bg-[#F36B16] rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-lg">
                    C
                  </span>
                </div>

                <span className="text-2xl font-bold text-white">
                  Craft<span className="text-[#F36B16]">
                    Connect
                  </span>
                </span>
              </Link>

              <div className="mt-24">

                <p className="text-[#F36B16] font-semibold mb-3">
                  JOIN CRAFTCONNECT
                </p>

                <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
                  Your next
                  <br />
                  great connection
                  <br />
                  <span className="text-[#F36B16]">
                    starts here.
                  </span>
                </h1>

                <p className="text-white/65 mt-6 max-w-md leading-7">
                  Join a growing community connecting talented
                  artisans with people looking for quality local
                  services.
                </p>

              </div>
            </div>

            {/* Benefits */}
            <div className="relative z-10 space-y-4">

              {[
                "Create your free account",
                "Find skilled local professionals",
                "Book services easily",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1,
                  }}
                  className="flex items-center gap-3"
                >
                  <FiCheckCircle className="text-[#F36B16]" />

                  <span className="text-sm text-white/75">
                    {item}
                  </span>
                </motion.div>
              ))}

            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="p-7 sm:p-10 lg:p-14"
          >

            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-7">
              <Link
                to="/"
                className="text-2xl font-bold text-[#07172D]"
              >
                Craft<span className="text-[#F36B16]">
                  Connect
                </span>
              </Link>
            </div>

            <div className="max-w-md mx-auto">

              <div className="mb-7">

                <p className="text-[#F36B16] font-semibold text-sm mb-2">
                  CREATE ACCOUNT
                </p>

                <h2 className="text-3xl sm:text-4xl font-bold text-[#07172D]">
                  Get started
                </h2>

                <p className="text-gray-500 mt-2">
                  Create your account and start connecting.
                </p>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#07172D] mb-2">
                    Full Name
                  </label>

                  <div className="relative">
                    <FiUser
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full h-13 pl-11 pr-4 border border-gray-200 rounded-xl outline-none focus:border-[#F36B16] focus:ring-4 focus:ring-[#F36B16]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#07172D] mb-2">
                    Email Address
                  </label>

                  <div className="relative">
                    <FiMail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full h-13 pl-11 pr-4 border border-gray-200 rounded-xl outline-none focus:border-[#F36B16] focus:ring-4 focus:ring-[#F36B16]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Account Type */}
                <div>
                  <label className="block text-sm font-semibold text-[#07172D] mb-2">
                    I want to
                  </label>

                  <div className="grid grid-cols-2 gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          accountType: "client",
                        })
                      }
                      className={`h-12 rounded-xl border font-medium text-sm transition-all ${
                        formData.accountType === "client"
                          ? "border-[#F36B16] bg-[#F36B16]/10 text-[#F36B16]"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      Find an Artisan
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          accountType: "vendor",
                        })
                      }
                      className={`h-12 rounded-xl border font-medium text-sm transition-all ${
                        formData.accountType === "vendor"
                          ? "border-[#F36B16] bg-[#F36B16]/10 text-[#F36B16]"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      Become a Vendor
                    </button>

                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#07172D] mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <FiLock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type={
                        showPassword ? "text" : "password"
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                      className="w-full h-13 pl-11 pr-12 border border-gray-200 rounded-xl outline-none focus:border-[#F36B16] focus:ring-4 focus:ring-[#F36B16]/10 transition-all"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? (
                        <FiEyeOff />
                      ) : (
                        <FiEye />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#07172D] mb-2">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <FiLock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                      className="w-full h-13 pl-11 pr-12 border border-gray-200 rounded-xl outline-none focus:border-[#F36B16] focus:ring-4 focus:ring-[#F36B16]/10 transition-all"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff />
                      ) : (
                        <FiEye />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 accent-[#F36B16]"
                  />

                  <span className="text-xs text-gray-500 leading-5">
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-[#F36B16] font-semibold"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="text-[#F36B16] font-semibold"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </label>

                {/* Button */}
                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  type="submit"
                  className="w-full h-14 bg-[#F36B16] hover:bg-[#df5d0c] text-white font-semibold rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-[#F36B16]/20 transition-colors mt-2"
                >
                  Create Account
                  <FiArrowRight />
                </motion.button>

              </form>

              <p className="text-center text-sm text-gray-500 mt-7">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#F36B16] hover:underline"
                >
                  Login
                </Link>
              </p>

            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default Register;