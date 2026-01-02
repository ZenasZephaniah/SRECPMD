'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import { z } from 'zod';

// 1. Define Zod Schema (Strong Validation)
const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  price: z.coerce.number().min(1, "Price must be at least $1"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  description: z.string().min(10, "Description must be at least 10 chars"),
});

export default function ProductForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', price: '', stock: '', description: '', imageUrl: '' });
  const [errors, setErrors] = useState<any>({});
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    // 2. Validate using Zod
    const result = productSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: any = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }
    setErrors({}); // Clear errors if valid

    // 3. Submit to Server
    const res = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.refresh();
      setFormData({ name: '', price: '', stock: '', description: '', imageUrl: '' });
      alert('Product Saved!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">+ Add Product (Multi-Step Capable)</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Step 1: Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input 
              placeholder="Name" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full border p-2 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <input 
              placeholder="Price" type="number"
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})}
              className="w-full border p-2 rounded"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>
        </div>

        {/* Step 2: Details */}
        <div>
          <input 
            placeholder="Stock" type="number"
            value={formData.stock}
            onChange={e => setFormData({...formData, stock: e.target.value})}
            className="w-full border p-2 rounded"
          />
          {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
        </div>

        <textarea 
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
          className="w-full border p-2 rounded h-24"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

        {/* Step 3: Image Upload (Restored) */}
        <CldUploadWidget 
          uploadPreset="ml_default" // Ensure you have an unsigned preset in Cloudinary
          onSuccess={(result: any) => {
            setFormData(prev => ({ ...prev, imageUrl: result.info.secure_url }));
          }}
        >
          {({ open }) => (
            <button type="button" onClick={() => open()} className="bg-gray-200 px-4 py-2 rounded text-sm">
              {formData.imageUrl ? "✅ Image Uploaded" : "⬆️ Upload Image"}
            </button>
          )}
        </CldUploadWidget>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Save Product
        </button>
      </form>
    </div>
  );
}