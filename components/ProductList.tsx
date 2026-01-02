"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductList({ products }: { products: any[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    router.refresh(); // Refreshes the page to show new data
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="p-4">Product</th>
            <th className="p-4">Price</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t hover:bg-gray-50 transition">
              <td className="p-4 flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border">
                  {product.imageUrl && (
                    <Image 
                      src={product.imageUrl} 
                      alt={product.name} 
                      fill 
                      className="object-cover" 
                    />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
              </td>
              <td className="p-4 font-medium">${product.price}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                </span>
              </td>
              <td className="p-4">
                <button 
                  onClick={() => handleDelete(product._id)} 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={4} className="p-8 text-center text-gray-400">
                No products found. Add one above!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}