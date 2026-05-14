import { useState, useEffect } from "react";
import api from "../api/axios.js";

export default function Cart() {
  const userId = localStorage.getItem("userId");

  const [cart, setCart] = useState(null);

  const loadCart = async () => {
    if (!userId) return;

    const response = await api.get(`/cart/${userId}`);
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Remove item
  const removeItem = async (productId) => {
    await api.post("/cart/remove", { userId, productId });

    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Update quantity
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
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Cart</h2>

      {cart.items.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Your cart is empty.
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.items.map((item) => (
              <div
                key={item.productId._id}
                className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-xl p-4"
              >
                {/* Left Side */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    src={item.productId.image}
                    alt={item.productId.title}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />

                  <div>
                    <h3 className="text-xl font-semibold">
                      {item.productId.title}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      ${item.productId.price.toFixed(2)}
                    </p>

                    {/* Quantity Buttons */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() =>
                          updateQty(
                            item.productId._id,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300"
                      >
                        -
                      </button>

                      <span className="font-semibold text-lg">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQty(
                            item.productId._id,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col items-center mt-4 md:mt-0">
                  <p className="text-xl font-bold mb-3">
                    $
                    {(
                      item.productId.price * item.quantity
                    ).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeItem(item.productId._id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-10 flex justify-between items-center border-t pt-6">
            <h3 className="text-2xl font-bold">
              Total:
            </h3>

            <p className="text-2xl font-bold text-green-600">
              ${total.toFixed(2)}
            </p>
          </div>

          {/* Checkout Button */}
          <div className="mt-6 text-right">
            <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl text-lg">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}