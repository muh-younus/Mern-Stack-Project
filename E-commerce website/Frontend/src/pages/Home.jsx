import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    const res = await api.get(
      `/products?search=${search}&category=${category}`,
    );
    setProducts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      return;
    }

    await api.post("/cart/add", { userId, productId });
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const categories = ["", "laptop", "phone", "tablet"];

  return (
    <div className="pb-4 bg-gray-50 ">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* HERO SECTION */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-gray-800">
            Find Your Perfect Product
          </h1>
          <p className="text-gray-500 mt-2">
            Simple. Fast. Reliable shopping experience.
          </p>
        </div>

        {/* SEARCH + FILTER */}
        {/* SEARCH + FILTER */}

        {/* search input and category filter */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-2/3 px-4 py-3 border rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-indigo-400
               text-sm"
          />
        </div>

        {/* QUICK CATEGORY FILTER */}
        <div className="flex justify-center  gap-2 mb-6 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm border transition
                ${
                  category === cat
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
            >
              {cat === "" ? "All" : cat}
            </button>
          ))}
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <div className="text-center text-gray-500 py-20">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white border rounded-xl overflow-hidden hover:shadow-sm transition"
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-3">
                    <h2 className="text-sm font-medium text-gray-800 line-clamp-1">
                      {product.title}
                    </h2>

                    <p className="text-indigo-600 font-semibold mt-1">
                      ${product.price}
                    </p>
                  </div>
                </Link>

                <div className="p-3 pt-0">
                  <button
                    onClick={() => addToCart(product._id)}
                    className="w-full py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
