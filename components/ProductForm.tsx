"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import the router

export default function ProductForm() {
  const router = useRouter(); // Initialize router
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Clear form
        setFormData({
          name: "",
          category: "",
          price: "",
          stock: "",
          description: "",
          imageUrl: "",
        });
        
        // CRITICAL: Refresh the page data automatically
        router.refresh(); 
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || "Failed to save product"}`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4">+ Add New Product</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full"
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full"
        />
        <input
          name="price"
          type="number"
          placeholder="Price ($)"
          value={formData.price}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full"
          required
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock Qty"
          value={formData.stock}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full"
          required
        />
      </div>
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full mb-4 h-24"
      />
      
      {/* Upload Button Placeholder - Logic assumed separate */}
      <button type="button" className="bg-gray-100 text-gray-600 px-4 py-2 rounded mb-4 hover:bg-gray-200">
         Upload Image
      </button>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
}