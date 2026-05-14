import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  //to get data from form
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const loadProduct = async () => {
    const res = await api.get(`/products/${id}`);
    const product = res.data.find((p) => p.id === parseInt(id));
    setForm(product);
  };
  //load the product data
  useEffect(() => {
    loadProduct();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //send data to the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/products/update/${id}`, form);
    alert("Product updated successfully");
    navigate("/admin/products");
  };

  const allowedFields = [
    "title",
    "description",
    "price",
    "category",
    "image",
    "stock",
  ];
    

  return (
    <>
      <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {allowedFields.map((key) =>
            
              allowedFields.includes(key) && (
                <input
                  key={key}
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  placeholder={key}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ),
          )}
           <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Add Product
                </button>
        </form>
      </div>
    </>
  );
}
