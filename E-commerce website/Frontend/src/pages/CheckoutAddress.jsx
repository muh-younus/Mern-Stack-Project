import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CheckoutAddress() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveAddress = async (e) => {
    e.preventDefault();

    await api.post("/address/add", {
      ...form,
      userId,
    });

    navigate("/checkout");
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">

      <h1 className="text-xl font-semibold mb-6">
        Delivery Address
      </h1>

      <form onSubmit={saveAddress} className="space-y-3">

        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="addressLine"
          value={form.addressLine}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="State"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="pinCode"
          value={form.pinCode}
          onChange={handleChange}
          placeholder="Pin Code"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Save & Continue
        </button>

      </form>
    </div>
  );
}