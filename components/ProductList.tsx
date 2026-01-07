import { useState } from "react";

interface ProductListProps {
  products: any[];
  onEdit: (product: any) => void;
}

export default function ProductList({ products, onEdit }: ProductListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeletingId(id);
    
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete", error);
      setDeletingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs font-bold text-gray-500 uppercase border-b border-gray-100">
            <th className="p-4">Product</th>
            <th className="p-4">Category</th>
            <th className="p-4">Price</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Value</th>
            <th className="p-4">Sales</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50 transition">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  {/* ✅ LOGIC: Show Real Image OR Default Icon */}
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-10 h-10 rounded-md object-cover border border-gray-200 shadow-sm"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-xl">
                      📦
                    </div>
                  )}
                  <span className="font-bold text-gray-700">{product.name}</span>
                </div>
              </td>
              <td className="p-4 text-gray-500 text-sm">{product.category || "-"}</td>
              <td className="p-4 font-medium text-gray-800">${product.price}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {product.stock}
                </span>
              </td>
              <td className="p-4 text-gray-600 text-sm font-medium">
                ${(product.price * product.stock).toLocaleString()}
              </td>
              <td className="p-4 text-purple-600 font-bold text-sm">
                {product.sales || 0}
              </td>
              <td className="p-4 text-right space-x-2">
                <button 
                  onClick={() => onEdit(product)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded transition"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(product._id)}
                  disabled={deletingId === product._id}
                  className="text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1 rounded transition"
                >
                  {deletingId === product._id ? "..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
          
          {products.length === 0 && (
            <tr>
              <td colSpan={7} className="p-8 text-center text-gray-400">
                No products found. Add one to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}