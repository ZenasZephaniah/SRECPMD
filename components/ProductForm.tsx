"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";

interface ProductFormProps {
  initialData?: any;
  onCancel: () => void;
}

export default function ProductForm({ initialData, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    sales: "",
    description: "",
    image: "", 
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        category: initialData.category || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
        sales: initialData.sales || "",
        description: initialData.description || "",
        image: initialData.image || "",
      });
    }
  }, [initialData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ✅ FINAL SAFETY CHECK: Force positive numbers before sending
    if (Number(formData.price) < 0 || Number(formData.stock) < 0) {
        alert("Price and Stock cannot be negative!");
        return;
    }

    setIsSubmitting(true);

    const url = initialData ? `/api/products/${initialData._id}` : "/api/products";
    const method = initialData ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        window.location.reload(); 
      }
    } catch (error) {
      console.error("Error saving product", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        {initialData ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Name & Category Row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name <span className="text-red-500">*</span></label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 focus:ring-0 outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category (optional)</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 focus:ring-0 outline-none transition"
            />
          </div>
        </div>

        {/* Price & Stock Row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price ($) <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
             
              onKeyDown={(e) => ["-", "e", "E"].includes(e.key) && e.preventDefault()} 
              className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 focus:ring-0 outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Stock <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              step="1"
              
              onKeyDown={(e) => ["-", ".", "e", "E"].includes(e.key) && e.preventDefault()} 
              className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 focus:ring-0 outline-none transition"
              required
            />
          </div>
        </div>

        {/* Sales Row */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Sales (Units Sold) (optional)</label>
          <input
            type="number"
            name="sales"
            value={formData.sales}
            onChange={handleChange}
            min="0"
            className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 focus:ring-0 outline-none transition"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description (optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 focus:ring-0 outline-none transition"
          />
        </div>

        {/* IMAGE UPLOAD SECTION */}
        <div className="mb-6">
           <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Product Image</label>
           
           <CldUploadWidget 
             uploadPreset="default" // ✅ CORRECT: Matches your Cloudinary screenshot
             onSuccess={(result: any) => {
               setFormData(prev => ({ ...prev, image: result.info.secure_url }));
             }}
           >
             {({ open }) => (
               <div 
                 onClick={() => open()}
                 className="cursor-pointer bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center transition"
               >
                 {formData.image ? (
                   <div className="relative w-full h-32 flex items-center justify-center">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="h-full object-contain rounded-md"
                      />
                      <p className="absolute bottom-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        Click to Change
                      </p>
                   </div>
                 ) : (
                   <>
                     <div className="text-2xl mb-1">📷</div>
                     <span className="text-sm font-medium text-blue-600">Upload Image</span>
                   </>
                 )}
               </div>
             )}
           </CldUploadWidget>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {initialData && (
             <button
               type="button"
               onClick={onCancel}
               className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition"
             >
               Cancel
             </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-900 shadow-md transition"
          >
            {isSubmitting ? "Saving..." : (initialData ? "Update Product" : "Save Product")}
          </button>
        </div>
      </form>
    </div>
  );
}