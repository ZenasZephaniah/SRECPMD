"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { z } from "zod";

// Validation Schema
const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 chars"),
  category: z.string().min(3, "Category must be at least 3 chars"),
  price: z.coerce.number().min(1, "Price must be at least $1"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  description: z.string().optional(), // OPTIONAL NOW
});

export default function ProductForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", category: "", price: "", stock: "", description: "", imageUrl: "" });
  const [errors, setErrors] = useState<any>({});
  const [status, setStatus] = useState<"idle" | "saving" | "success">("idle");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = productSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: any = {};
      result.error.issues.forEach((issue) => { formattedErrors[issue.path[0]] = issue.message; });
      setErrors(formattedErrors);
      return;
    }
    
    setErrors({});
    setStatus("saving");

    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.refresh();
      setFormData({ name: "", category: "", price: "", stock: "", description: "", imageUrl: "" });
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full relative">
      <h3 className="text-xl font-bold mb-4">+ Add New Product</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border p-2 rounded" />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>
          <div>
            <input placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border p-2 rounded" />
            {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input placeholder="Price ($)" type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border p-2 rounded" />
            {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
          </div>
          <div>
            <input placeholder="Stock Qty" type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full border p-2 rounded" />
            {errors.stock && <p className="text-red-500 text-xs">{errors.stock}</p>}
          </div>
        </div>
        <div>
          <textarea placeholder="Description (Optional)" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border p-2 rounded h-20" />
          {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
        </div>
        <CldUploadWidget uploadPreset="ml_default" onSuccess={(result: any) => setFormData(prev => ({ ...prev, imageUrl: result.info.secure_url }))}>
          {({ open }) => (
            <button type="button" onClick={() => open()} className="bg-gray-100 text-gray-600 px-4 py-2 rounded text-sm w-full hover:bg-gray-200">
              {formData.imageUrl ? "✅ Image Uploaded" : "⬆️ Upload Image"}
            </button>
          )}
        </CldUploadWidget>
        <button type="submit" disabled={status === "saving"} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all disabled:opacity-50">
          {status === "saving" ? "Saving..." : "Save Product"}
        </button>
      </form>

      {/* The Famous Success Effect */}
      {status === "success" && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/90 flex flex-col items-center justify-center rounded-lg animate-in fade-in">
          <div className="text-5xl mb-2">🎉</div>
          <h3 className="text-xl font-bold text-green-600">Product Saved!</h3>
        </div>
      )}
    </div>
  );
}