import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export default function Cart() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);

  const loadCart = async () => {
    if (!userId) return;

    const response = await api.get(`/cart/${userId}`);
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId) => {
    await api.post("/cart/remove", { userId, productId });
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQty = async (productId, quantity) => {
    if (quantity === 0) {
      await removeItem(productId);
      return;
    }

    await api.post("/cart/update", {
      userId,
      productId,
      quantity,
    });

    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!cart) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading cart...
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Your Cart
        </h2>

        {/* Empty State */}
        {cart.items.length === 0 ? (
          <div className="text-center text-gray-500 text-lg bg-white p-10 rounded-xl border">
            Your cart is empty.
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="space-y-4">

              {cart.items.map((item) => (
                <div
                  key={item.productId._id}
                  className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between"
                >

                  {/* Left */}
                  <div className="flex items-center gap-4">

                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />

                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {item.productId.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        ${item.productId.price.toFixed(2)}
                      </p>

                      {/* Qty */}
                      <div className="flex items-center gap-3 mt-3">

                        <button
                          onClick={() =>
                            updateQty(item.productId._id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200"
                        >
                          -
                        </button>

                        <span className="font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQty(item.productId._id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200"
                        >
                          +
                        </button>

                      </div>
                    </div>

                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-6 mt-4 md:mt-0">

                    <p className="text-lg font-semibold text-indigo-600">
                      ${(item.productId.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeItem(item.productId._id)}
                      className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              ))}

            </div>

            {/* Summary */}
            <div className="mt-8 bg-white border rounded-xl p-6 flex flex-col md:flex-row justify-between items-center">

              <h3 className="text-xl font-semibold text-gray-800">
                Total Amount
              </h3>

              <p className="text-2xl font-bold text-indigo-600">
                ${total.toFixed(2)}
              </p>

            </div>

            {/* Checkout */}
            <div className="mt-6 flex justify-end">

              <button
                onClick={() => navigate("/checkout-address")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition"
              >
                Proceed to Checkout
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
}