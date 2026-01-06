"use client";
import { useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import DashboardChart from "./DashboardChart";
import AdminHeader from "./AdminHeader";

export default function DashboardClient({ products }: { products: any[] }) {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Function to switch to Edit Mode
  const handleEdit = (product: any) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form
  };

  // Function to cancel Edit Mode
  const cancelEdit = () => {
    setEditingProduct(null);
  };

  // Metrics Calculation
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const activeCategories = [...new Set(products.map((p) => p.category))].length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto p-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Overview of your store's performance</p>
          </div>
          <AdminHeader />
        </div>

        {/* Dynamic Horizontal Navbar */}
        <div className="flex border-b border-gray-200 mb-8 bg-white rounded-t-xl overflow-hidden shadow-sm">
          {["Dashboard", "Inventory", "Customers", "Sales"].map((tab) => (
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

        {/* CONTENT AREA */}
        <div className="space-y-8">
          
          {/* Metrics Row (Always Visible) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
               <p className="text-gray-500 text-sm">Total Inventory Value</p>
               <h3 className="text-3xl font-bold text-gray-800 mt-1">${totalValue.toLocaleString()}</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
               <p className="text-gray-500 text-sm">Active Products</p>
               <h3 className="text-3xl font-bold text-gray-800 mt-1">{products.length}</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
               <p className="text-gray-500 text-sm">Active Categories</p>
               <h3 className="text-3xl font-bold text-gray-800 mt-1">{activeCategories}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: FORM (Always visible for easy access) */}
            <div className="lg:col-span-1">
              <ProductForm 
                initialData={editingProduct} 
                onCancel={cancelEdit} 
              />
            </div>

            {/* RIGHT: DYNAMIC CONTENT */}
            <div className="lg:col-span-2">
              
              {/* TAB: DASHBOARD (Charts) */}
              {activeTab === "Dashboard" && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                  <DashboardChart products={products} />
                </div>
              )}

              {/* TAB: INVENTORY (Table) */}
              {(activeTab === "Inventory" || activeTab === "Dashboard") && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">All Product List</h2>
                  </div>
                  <ProductList products={products} onEdit={handleEdit} />
                </div>
              )}

              {/* TAB: CUSTOMERS / SALES */}
              {(activeTab === "Customers" || activeTab === "Sales") && (
                <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center text-gray-400">
                   <div className="text-4xl mb-4">🚧</div>
                   <h3 className="text-xl font-bold text-gray-600">Module Coming Soon</h3>
                   <p>This feature is currently under development.</p>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}