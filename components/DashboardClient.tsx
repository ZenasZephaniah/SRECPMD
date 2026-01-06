"use client";
import { useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import DashboardChart from "./DashboardChart";
import AdminHeader from "./AdminHeader";

export default function DashboardClient({ products }: { products: any[] }) {
  // 1. Updated Tabs (Only 3 sections now)
  const tabs = ["Dashboard", "Inventory", "Customers & Sales"];
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingProduct(null);
  };

  // Calculate total value safely
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        
        {/* ✅ FIXED: Old Title Removed. Only AdminHeader remains. */}
        <AdminHeader />

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-8 bg-white rounded-t-xl overflow-hidden shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab 
                  ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50" 
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: FORM (Always Visible) */}
          <div className="lg:col-span-1">
            <ProductForm initialData={editingProduct} onCancel={cancelEdit} />
          </div>

          {/* RIGHT COLUMN: DYNAMIC CONTENT */}
          <div className="lg:col-span-2">
            
            {/* --- DASHBOARD TAB --- */}
            {activeTab === "Dashboard" && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                
                {/* Metrics on top of Charts */}
                <div className="grid grid-cols-2 gap-4 mb-6 border-b pb-6">
                  <div>
                    <p className="text-gray-500 text-sm">Total Inventory Value</p>
                    <h3 className="text-3xl font-bold text-gray-800">${totalValue.toLocaleString()}</h3>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Active Products</p>
                    <h3 className="text-3xl font-bold text-gray-800">{products.length}</h3>
                  </div>
                </div>

                <DashboardChart products={products} />
              </div>
            )}

            {/* --- INVENTORY TAB --- */}
            {activeTab === "Inventory" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800">All Product List</h2>
                </div>
                <ProductList products={products} onEdit={handleEdit} />
              </div>
            )}

            {/* --- CUSTOMERS & SALES TAB --- */}
            {activeTab === "Customers & Sales" && (
              <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center text-gray-400">
                  <div className="text-4xl mb-4">🚧</div>
                  <h3 className="text-xl font-bold text-gray-600">Customers & Sales Module</h3>
                  <p>This feature is currently under development.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}