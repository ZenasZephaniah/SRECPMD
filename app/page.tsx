import connectDB from "@/lib/db";
import Product from "@/models/Product";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import DashboardChart from "@/components/DashboardChart";
import AdminHeader from "@/components/AdminHeader"; // Import the new buttons

export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    
    return products.map((p: any) => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt?.toString(),
      updatedAt: p.updatedAt?.toString(),
    }));
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  // Calculate metrics for the requirement: "Interactive data visualization for sales and stock"
  const totalValue = products.reduce((acc: number, p: any) => acc + (p.price * p.stock), 0);
  const activeCategories = [...new Set(products.map((p: any) => p.category))].length;

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section with Logout & Onboarding */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CDC Merchant Dashboard</h1>
            <p className="text-gray-500">Secure Admin Portal • SSR Enabled</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border text-sm font-medium">
              Total Products: <span className="text-blue-600 font-bold">{products.length}</span>
            </div>
            {/* The Client Component with Buttons handles the Logic */}
            <AdminHeader />
          </div>
        </div>

        {/* Top Section: Form & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Left: Add Product Form (Includes Zod Validation & Image Upload) */}
          <div className="lg:col-span-1">
            <ProductForm />
          </div>

          {/* Right: Visualization & Metrics */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Chart */}
            <DashboardChart products={products} />
            
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-600 text-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <p className="text-blue-100 text-sm font-medium">Total Inventory Value</p>
                <h3 className="text-3xl font-bold mt-1">
                  ${totalValue.toLocaleString()}
                </h3>
              </div>
              <div className="bg-emerald-500 text-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <p className="text-emerald-100 text-sm font-medium">Active Categories</p>
                <h3 className="text-3xl font-bold mt-1">
                  {activeCategories}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Data Table (CRUD Operations) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Recent Products</h2>
          </div>
          <ProductList products={products} />
        </div>

      </div>
    </main>
  );
}