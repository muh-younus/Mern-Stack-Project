import { useSate } from "react";
import api from "../api/axios.jsx";
import { useNavigate } from "react-router-dom";

const CheckoutAddress = () => {
  const [userId] = localStorage.getItem("userId");
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
    setForm({
      [e.target.name]: e.target.value,
    });
  };
  const saveAddress = async (e) => {
    await api.post("/address/add", {
      ...form,
      userId,
    });
    navigate("/checkout/payment");
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Delivery Address</h1>
        {
            Object.keys(form).map((key)=>{
                <input
                key={key}
                name={key}
                onChange={handleChange}
                placeholder={key}
                className="w-full p-2 border border-gray-300 rounded"
                />
            })
        }
        <button
        onClick={saveAddress}
        className="w-full bg-blue-500 text-white p-2 rounded">
        Save and Continue
        </button>
      </div>
    </>
  );
};
