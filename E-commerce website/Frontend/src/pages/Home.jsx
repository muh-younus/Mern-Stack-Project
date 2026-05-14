import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setsearch] = useState("");
  const [category, setcategory] = useState("");

  const loadProducts = async () => {
    const res = await api.get(
      `/products?search=${search}&category=${category}`,
    );
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login to add items to cart");
      return;
    }

    const res = await api.post("/cart/add", { userId, productId });
    const total = res.data.cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
    );

    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <>
      <div className="h-screen flex items-start justify-center">
        <div className="w-full max-w-6xl p-6">
          {/* Search and filter */}
          <div className="flex mb-4 gap-3 justify-center">
            <input
              placeholder="Search Product"
              type="text"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              className="border px-3 py-2 rounded w-1/2"
            />

            <select
              onChange={(e) => setcategory(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="">All Categories</option>
              <option value="laptop">Laptop</option>
              <option value="phone">phone</option>
              <option value="tablet">tablet</option>
            </select>
          </div>

          {/* Products */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {products.map((product) => (
              <div key={product._id} className="border rounded p-4 flex flex-col items-center">
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className=" rounded p-4 flex flex-col items-center"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover mb-2"
                />
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600">${product.price}</p>
                
              </Link>
              <button
                onClick={() => addToCart(product._id)}
                className="mt-2 bg-blue-500 text-white px- py-2 max-w-full rounded"      
              >
                Add to Cart
              </button> 
              </div>
             
              
            ))}
            
          </div>
        </div>
      </div>
    </>
  );
}
