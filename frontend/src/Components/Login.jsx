import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import { loginUser } from "../api/auth.js";

import Logo from "../assets/craftlogo.png";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { token } = await loginUser(formData);

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("accessToken", token);

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F4] flex items-center justify-center px-4 py-10 overflow-hidden">

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#F36B16]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#07172D]/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_60px_rgba(7,23,45,0.10)] overflow-hidden"
      >

        <div className="grid lg:grid-cols-2">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hidden lg:flex relative bg-[#07172D] p-12 flex-col justify-between overflow-hidden"
          >

            {/* Decorative circles */}
            <div className="absolute -top-24 -left-24 w-72 h-72 border border-white/10 rounded-full" />
            <div className="absolute -bottom-32 -right-20 w-96 h-96 border border-[#F36B16]/20 rounded-full" />

            <div className="relative z-10">

              {/* Logo */}
              <Link to="/" className="inline-flex items-center gap-2">
                <div className="w-10 h-10 bg-[#F36B16] rounded-xl flex items-center justify-center">
                  <img
                              src={Logo}
                              alt="CraftConnect Logo"
                              className="h-8 w-8 rounded-full object-cover"
                            />
                </div>

                <span className="text-2xl font-bold text-white">
                  Craft<span className="text-[#F36B16]">Connect</span>
                </span>
              </Link>

              <div className="mt-24">
                <p className="text-[#F36B16] font-semibold mb-3">
                  WELCOME BACK
                </p>

                <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
                  Connect with
                  <br />
                  trusted{" "}
                  <span className="text-[#F36B16]">
                    local artisans.
                  </span>
                </h1>

                <p className="text-white/65 mt-6 max-w-md leading-7">
                  Find talented professionals for your events and
                  projects. Book trusted artisans with ease and
                  confidence.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="relative z-10 space-y-4">

              {[
                "Discover verified local artisans",
                "Book services with confidence",
                "Easy and secure payments",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + index * 0.1,
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

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-7 sm:p-10 lg:p-14"
          >

            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-8">
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

              <div className="mb-8">
                <p className="text-[#F36B16] font-semibold text-sm mb-2">
                  ACCOUNT LOGIN
                </p>

                <h2 className="text-3xl sm:text-4xl font-bold text-[#07172D]">
                  Welcome back!
                </h2>

                <p className="text-gray-500 mt-2">
                  Login to continue to your CraftConnect account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#07172D] mb-2">
                    Email Address
                  </label>

                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full h-14 pl-11 pr-4 border border-gray-200 rounded-xl outline-none transition-all focus:border-[#F36B16] focus:ring-4 focus:ring-[#F36B16]/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold text-[#07172D]">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-sm font-medium text-[#F36B16] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="w-full h-14 pl-11 pr-12 border border-gray-200 rounded-xl outline-none transition-all focus:border-[#F36B16] focus:ring-4 focus:ring-[#F36B16]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#07172D]"
                    >
                      {showPassword ? (
                        <FiEyeOff size={19} />
                      ) : (
                        <FiEye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                    className="w-4 h-4 accent-[#F36B16]"
                  />

                  <span className="text-sm text-gray-500">
                    Remember me
                  </span>
                </label>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full h-14 bg-[#F36B16] hover:bg-[#df5d0c] text-white font-semibold rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-[#F36B16]/20"
                >
                  Login
                  <FiArrowRight />
                </motion.button>

              </form>

              {/* Register */}
              <p className="text-center text-sm text-gray-500 mt-8">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-[#F36B16] hover:underline"
                >
                  Create an account
                </Link>
              </p>

            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;