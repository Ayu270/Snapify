"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Sending your message...", { id: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully!", { id: "sending" });
        setFormData({ name: "", email: "", message: "" }); // reset form
      } else {
        toast.error(result.message || "Something went wrong.", { id: "sending" });
      }
    } catch (err) {
      toast.error("Network error. Please try again.", { id: "sending" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Contact Us</h1>
          <p className="text-gray-600 text-center mb-6">We'd love to hear from you!</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg h-32"
              required
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white p-3 rounded-lg transition ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-black"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
