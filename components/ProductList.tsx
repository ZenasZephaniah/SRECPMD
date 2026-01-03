"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductList({ products }: { products: any[] }) {
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
      <div id="product-list" className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium text-sm">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Sales</th> {/* NEW COLUMN */}
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {products.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-500">No products found.</td></tr>
            ) : products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl overflow-hidden">
                    {product.imageUrl ? <img src={product.imageUrl} className="w-full h-full object-cover" /> : '📦'}
                  </div>
                  <span>{product.name}</span>
                </td>
                <td className="p-4 text-gray-500">{product.category || '-'}</td>
                <td className="p-4 font-semibold text-purple-600">{product.sales || 0}</td> {/* SALES DATA */}
                <td className="p-4 font-semibold">${product.price}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.stock > 10 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                    {product.stock} left
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => setDeleteId(product._id)} className="text-gray-400 hover:text-red-600 p-2">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full mx-4 animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete this product?</h3>
            <p className="text-gray-500 mb-6 text-sm">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}