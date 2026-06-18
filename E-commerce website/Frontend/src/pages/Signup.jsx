import { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/signup", form);
      setMessage("Account created successfully 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100 overflow-hidden">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Account
          </h2>
          <p className="text-sm text-gray-500">
            Join us and start shopping
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className="mb-3 text-center text-sm text-green-600 bg-green-50 py-2 rounded-md border border-green-100">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg
                       hover:bg-indigo-700 active:scale-[0.98]
                       transition duration-200"
          >
            Sign Up
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Already have an account? Login to continue
        </p>

      </div>
    </div>
  );
}