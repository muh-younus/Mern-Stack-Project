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
 
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
   console.log("form",form,message)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post("/auth/signup",form)
        setMessage(response.data.message)
        //redirect to login
        setTimeout(()=>{
          navigate('/login')
        },1000)
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occured");
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Account
          </h2>
          {/* Show messages */}
          {message && (
            <div className="mb-4 text-center text-sm text-blue-600 font-medium">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
