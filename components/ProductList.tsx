import { useState } from "react";

interface ProductListProps {
  products: any[];
  onEdit: (product: any) => void;
}

export default function ProductList({ products = [], onEdit }: ProductListProps) {
  // State to manage which product is being considered for deletion
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Trigger the Modal
  const promptDelete = (id: string) => {
    setDeleteId(id);
  };

  // 2. Cancel the Action
  const cancelDelete = () => {
    setDeleteId(null);
  };

  // 3. Confirm and Execute Delete
  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    
    try {
      await fetch(`/api/products/${deleteId}`, { method: "DELETE" });
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete", error);
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <>
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
                  {/* Triggers the Modal instead of window.confirm */}
                  <button 
                    onClick={() => promptDelete(product._id)}
                    className="text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1 rounded transition"
                  >
                    Delete
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

      {/* ✅ CUSTOM DELETE CONFIRMATION MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-96 shadow-2xl transform transition-all scale-100">
            <h3 className="text-xl font-bold mb-2 text-gray-900">Delete Product?</h3>
            <p className="text-gray-500 mb-8">
              Are you sure you want to remove this item from your inventory? This cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={cancelDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 shadow-lg transition flex items-center"
              >
                {isDeleting ? "Deleting..." : "Delete Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}