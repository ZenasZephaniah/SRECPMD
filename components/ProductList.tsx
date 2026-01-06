"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Add onEdit prop
export default function ProductList({ products, onEdit }: { products: any[], onEdit: (p: any) => void }) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/products/${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    router.refresh();
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 font-bold text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Value</th>
              <th className="p-4">Sales</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-blue-50/50 transition-colors">
                <td className="p-4 font-bold text-gray-800 flex items-center gap-3">
                   <div className="w-8 h-8 rounded bg-gray-200 overflow-hidden">
                      {product.imageUrl ? <img src={product.imageUrl} className="w-full h-full object-cover"/> : null}
                   </div>
                   {product.name}
                </td>
                <td className="p-4 text-gray-500">{product.category}</td>
                <td className="p-4 font-mono">${product.price}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="p-4 font-mono font-bold text-gray-700">${(product.price * product.stock).toLocaleString()}</td>
                <td className="p-4 text-purple-600 font-bold">{product.sales || 0}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => onEdit(product)} className="text-blue-600 hover:text-blue-800 font-medium text-xs px-2 py-1 bg-blue-50 rounded">Edit</button>
                  <button onClick={() => setDeleteId(product._id)} className="text-red-600 hover:text-red-800 font-medium text-xs px-2 py-1 bg-red-50 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Delete Modal Code (Same as before) */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Product?</h3>
            <p className="text-gray-500 mb-6 text-sm">This cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}