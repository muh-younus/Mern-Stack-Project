import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios.js";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);

      setMsg("Login successful 🎉");

      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      setMsg(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Login to continue shopping
          </p>
        </div>

        {/* Message */}
        {msg && (
          <div className="mb-2 text-center text-sm font-medium text-green-600 bg-green-50 border border-green-100 py-2 rounded-md">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="overflow-hidden">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 transition"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg
                       font-medium tracking-wide
                       hover:bg-indigo-700 active:scale-[0.98]
                       transition duration-200"
          >
            Sign In
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>

      </div>
    </div>
  );
}