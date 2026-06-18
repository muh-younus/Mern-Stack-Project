import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function Checkout() {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    api.get(`/cart/${userId}`).then((res) => setCart(res.data));
    api.get(`/address/${userId}`).then((res) => {
      setAddress(res.data);
      setSelectedAddress(res.data[0]);
    });
  }, [userId]);

  if (!cart) {
    return <div>Loading.....</div>;
  }
  console.log("cart", cart);

  const total = cart.items.reduce(
    (sum, i) => sum + i.productId.price * i.quantity,
    0,
  );
  const placeOrder = async () => {
    console.log("selectedAddress", selectedAddress)
    if (!selectedAddress) {
      alert("please select address");
      return;
    }
    const res = await api.post("/order/place", {
      userId,
      address: selectedAddress,
    });
    navigate(`/order-success/${res.data.order._id}`)
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <h2 className="font-semibold mb-2">Select Address</h2>
        {address.map((addr) => (
          <label key={addr._id} className="block border p-3 rounded cursor-pointer">
            <input
              type="radio"
              name="address"  
              checked={selectedAddress?._id === addr._id}
              onChange={() => setSelectedAddress(addr)}
              className="mr-2" 
            /> 
            <strong>{addr.fullName}</strong>
            <p className="text-sm">
              {addr.addressLine}, {addr.city}, {addr.state} - {addr.pinCode}
            </p>
            <p className="text-sm">{addr.phone}</p>
            </label>
        ))}
        <h2 className="font-semibold mb-2">Order Summary</h2>
        <p>Total Amount: {total}</p>
        <button onClick={placeOrder}
         className="mt-4 w-full bg-green-500 text-white p-2 cursor-pointer rounded">
          Place Order (COD)
        </button>
      </div>
    </>
  );
}
