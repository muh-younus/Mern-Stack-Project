import { useState } from "react"
import api from "../api/axios.js"
import { useNavigate } from "react-router-dom"

export default function AddProduct() {

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("🔥 Submit triggered")
        console.log("📦 Form data:", form)

        try {
            const res = await api.post("/products/add", form)

            console.log("✅ Product added:", res.data)

            alert("Product added successfully")
            navigate("/admin/products")

        } catch (error) {
            console.log("❌ Error adding product:", error.response?.data || error.message)
        }
    }

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

            <form onSubmit={handleSubmit} className="space-y-3">

                {Object.keys(form).map((key) => (
                    <input
                        key={key}
                        name={key}
                        value={form[key]}
                        onChange={handleChange}
                        placeholder={key}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                ))}

                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Add Product
                </button>

            </form>
        </div>
    )
}