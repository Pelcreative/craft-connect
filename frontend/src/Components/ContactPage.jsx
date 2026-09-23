import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
    FiClock,
  FiSend,
  FiArrowRight,
  FiWatch,
} from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

import img from "../assets/artisan6.png";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", formData);
    setIsSubmitted(true);
    // Reset after some time or handle backend API request
  };

  return (
    <div className="min-h-screen bg-[#FFF9F4] overflow-hidden">
      
      {/* 1. TOP HERO SECTION */}
      <section className="mx-auto max-w-7xl px-5 pt-12 pb-8 sm:px-8 lg:px-10 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-[#F36B16]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#F36B16]">
                Contact Us
              </span>
            </motion.div>

            <h1 className="text-4xl font-extrabold tracking-tight text-[#07172D] sm:text-5xl lg:text-[52px] leading-[1.1]">
              Let’s talk about{" "}
              <span className="text-[#F36B16]">CraftConnect.</span>
            </h1>

            <p className="mt-4 max-w-lg text-base text-slate-500 leading-relaxed">
              Have a question, suggestion or need help with your booking? Our team would love to hear from you.
            </p>
          </motion.div>

          {/* Right Image Banner */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-end"
          >
            <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-[#F36B16]/10 blur-3xl pointer-events-none" />
            <div className="relative overflow-hidden rounded-3xl shadow-xl w-full max-w-md">
              <motion.img
                src={img}
                alt="Support team member"
                className="h-[280px] w-full object-cover sm:h-[320px]"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07172D]/40 via-transparent to-transparent" />
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-md text-xs font-bold text-[#07172D]"
              >
                ✨ We&apos;re here to help!
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. MAIN CONTAINER: DARK INFO PANEL & INTERACTIVE FORM */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="rounded-[32px] bg-[#07172D] p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden text-white"
        >
          {/* Subtle Background Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F36B16]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-10 items-start relative z-10">
            
            {/* LEFT PANEL: Get in Touch & Contact info (Cols 1-5) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#F36B16] mb-2">
                  Get In Touch
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  We&apos;d love to hear from you.
                </h2>
                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  Whether you&apos;re a customer looking for help or a vendor interested in joining this marketplace, send us a message.
                </p>
              </div>

              {/* Contact Information List */}
              <div className="space-y-6">
                
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F36B16] text-white shadow-lg shadow-[#F36B16]/30">
                    <FiMail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Email Us</p>
                    <p className="text-sm font-bold text-white mt-0.5">hello@craftconnect.com</p>
                  </div>
                </div>

                {/* Call */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F36B16] text-white shadow-lg shadow-[#F36B16]/30">
                    <FiPhone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Call Us</p>
                    <p className="text-sm font-bold text-white mt-0.5">+234 800 000 0000</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F36B16] text-white shadow-lg shadow-[#F36B16]/30">
                    <FiWatch size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Our Location</p>
                    <p className="text-sm font-bold text-white mt-0.5">Lagos, Nigeria</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F36B16] text-white shadow-lg shadow-[#F36B16]/30">
                    <FiClock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Working Hours</p>
                    <p className="text-sm font-bold text-white mt-0.5">Mon - Fri, 9AM - 5PM</p>
                  </div>
                </div>

              </div>

              {/* Vendor Callout Card inside Navy Box */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">👷‍♂️</div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Looking to Join CraftConnect?</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-normal">
                      If you&apos;re an artisan or service professional, you can register your business and start building your profile.
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to="/vendor"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#F36B16] hover:underline"
                  >
                    <span>Become a Vendor</span>
                    <FiArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>

            </div>

            {/* RIGHT PANEL: Form Card (Cols 6-12) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 text-slate-900 shadow-xl">
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#07172D]">Send us a message</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill out the form and we&apos;ll get back to you as soon as possible.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-4"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold text-[#07172D]">Message Sent Successfully!</h4>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">
                    Thank you for reaching out. A member of our customer experience team will review your message shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ fullName: "", email: "", subject: "", message: "" });
                    }}
                    className="mt-4 inline-block rounded-xl bg-[#07172D] px-6 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#F36B16] focus:ring-4 focus:ring-[#F36B16]/10 transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#F36B16] focus:ring-4 focus:ring-[#F36B16]/10 transition-all"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#F36B16] focus:ring-4 focus:ring-[#F36B16]/10 transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about what you need..."
                      required
                      className="w-full p-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#F36B16] focus:ring-4 focus:ring-[#F36B16]/10 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full h-13 mt-2 bg-[#F36B16] hover:bg-[#df5d0c] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#F36B16]/20 transition-colors text-sm"
                  >
                    <span>Send Message</span>
                    <FiSend size={16} />
                  </motion.button>

                </form>
              )}

            </div>

          </div>
        </motion.div>
      </section>

      {/* 3. BOTTOM MAP & OFFICE INFO SECTION */}
      <section className="mx-auto max-w-7xl px-5 pt-8 pb-16 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          
          {/* Mock Map Box */}
          <div className="lg:col-span-8 overflow-hidden rounded-3xl border border-gray-200 bg-slate-100 shadow-sm relative h-[250px] sm:h-[300px]">
            {/* Visual simulation of a map background */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <div className="h-10 w-10 rounded-full bg-[#F36B16] text-white flex items-center justify-center shadow-lg font-bold">
                  📍
                </div>
                <div className="bg-[#07172D] text-white text-[10px] font-bold px-2.5 py-1 rounded-md mt-1 shadow-md">
                  Lagos, Nigeria
                </div>
              </motion.div>
            </div>
          </div>

          {/* Office Details & Social Links */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Our Office</h4>
              <p className="text-sm font-bold text-[#07172D] mt-1">Lagos, Nigeria</p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Stay Connected</h4>
              <div className="flex items-center gap-3">
                {[
                  { icon: <FaFacebookF size={14} />, href: "#" },
                  { icon: <FaInstagram size={14} />, href: "#" },
                  { icon: <FaTwitter size={14} />, href: "#" },
                  { icon: <FaLinkedinIn size={14} />, href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.1, backgroundColor: "#F36B16", color: "#ffffff" }}
                    whileTap={{ scale: 0.9 }}
                    href={social.href}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 text-slate-700 shadow-sm transition-colors"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ContactPage;