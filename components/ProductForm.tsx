"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 chars"),
  category: z.string().min(3, "Category required"),
  price: z.coerce.number().min(1, "Price must be at least $1"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  sales: z.coerce.number().min(0, "Sales cannot be negative").optional(), // New Sales Field
  description: z.string().optional(),
});

// Props to accept editing data
export default function ProductForm({ initialData, onCancel }: { initialData?: any, onCancel?: () => void }) {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", category: "", price: "", stock: "", sales: "", description: "", imageUrl: "" });
  const [errors, setErrors] = useState<any>({});
  const [status, setStatus] = useState<"idle" | "saving" | "success">("idle");

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        category: initialData.category || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
        sales: initialData.sales || "",
        description: initialData.description || "",
        imageUrl: initialData.imageUrl || "",
      });
    } else {
      // Reset if not editing
      setFormData({ name: "", category: "", price: "", stock: "", sales: "", description: "", imageUrl: "" });
    }
  }, [initialData]);

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

    // DECIDE: Create (POST) or Update (PUT)
    const url = initialData ? `/api/products/${initialData._id}` : "/api/products";
    const method = initialData ? "PUT" : "POST";

    const res = await fetch(url, {
      method: method,
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.refresh();
      if (!initialData) {
         setFormData({ name: "", category: "", price: "", stock: "", sales: "", description: "", imageUrl: "" });
      }
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        if(initialData && onCancel) onCancel(); // Exit edit mode after save
      }, 2000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full relative border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          {initialData ? "Edit Product" : "Add New Product"}
        </h3>
        {initialData && (
          <button onClick={onCancel} className="text-xs text-red-500 hover:underline">Cancel Edit</button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
            <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border p-2 rounded bg-gray-50" />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
            <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border p-2 rounded bg-gray-50" />
            {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Price ($)</label>
            <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border p-2 rounded bg-gray-50" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Stock</label>
            <input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full border p-2 rounded bg-gray-50" />
          </div>
        </div>

        <div>
           <label className="text-xs font-bold text-gray-500 uppercase">Units Sold (Sales)</label>
           <input type="number" value={formData.sales} onChange={e => setFormData({...formData, sales: e.target.value})} className="w-full border p-2 rounded bg-gray-50" placeholder="Optional" />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
          <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border p-2 rounded bg-gray-50 h-20" />
        </div>

        <CldUploadWidget uploadPreset="ml_default" onSuccess={(result: any) => setFormData(prev => ({ ...prev, imageUrl: result.info.secure_url }))}>
          {({ open }) => (
            <button type="button" onClick={() => open()} className="bg-gray-100 text-gray-600 px-4 py-2 rounded text-sm w-full hover:bg-gray-200 border border-dashed border-gray-300">
              {formData.imageUrl ? "✅ Image Uploaded" : "⬆️ Upload Image"}
            </button>
          )}
        </CldUploadWidget>

        <button type="submit" disabled={status === "saving"} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          {status === "saving" ? "Processing..." : (initialData ? "Update Product" : "Save Product")}
        </button>
      </form>

      {status === "success" && (
        <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center rounded-lg animate-in fade-in z-10">
          <div className="text-5xl mb-2">🎉</div>
          <h3 className="text-xl font-bold text-green-600">{initialData ? "Updated!" : "Saved!"}</h3>
        </div>
      )}
    </div>
  );
}