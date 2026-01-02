"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { Upload, Plus, X } from "lucide-react";

export default function ProductForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", category: "", stock: "", imageUrl: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ name: "", description: "", price: "", category: "", stock: "", imageUrl: "" });
        router.refresh(); // Reloads the server data
      }
    } catch (error) {
      console.error("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-blue-600" /> Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Product Name"
            required
            className="p-2 border rounded-lg w-full"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            placeholder="Category"
            required
            className="p-2 border rounded-lg w-full"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price ($)"
            required
            className="p-2 border rounded-lg w-full"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock Qty"
            required
            className="p-2 border rounded-lg w-full"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />
        </div>

        <textarea
          placeholder="Description"
          required
          className="p-2 border rounded-lg w-full h-24"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        {/* Image Upload Area */}
        <div className="flex gap-4 items-center">
          <CldUploadWidget
            uploadPreset="default"
            onSuccess={(result: any) => {
              setFormData({ ...formData, imageUrl: result.info.secure_url });
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
              >
                <Upload size={18} /> Upload Image
              </button>
            )}
          </CldUploadWidget>

          {formData.imageUrl && (
            <span className="text-green-600 text-sm font-medium flex items-center">
              ✓ Image Uploaded
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Adding Product..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}