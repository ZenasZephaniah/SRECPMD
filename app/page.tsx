import connectDB from "@/lib/db";
import Product from "@/models/Product";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import DashboardChart from "@/components/DashboardChart";
import AdminHeader from "@/components/AdminHeader";

export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return products.map((p: any) => ({
      ...p, _id: p._id.toString(), createdAt: p.createdAt?.toString(), updatedAt: p.updatedAt?.toString(),
    }));
  } catch (error) { return []; }
}

export default async function Home() {
  const products = await getProducts();
  const totalValue = products.reduce((acc: number, p: any) => acc + (p.price * p.stock), 0);
  const activeCategories = [...new Set(products.map((p: any) => p.category))].length;

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:block fixed h-full z-10">
        <div className="p-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg mb-8 shadow-sm"></div>
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">
              📊 <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              📦 <span>Products</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              👥 <span>Customers</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Product Management Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">Overview of your store's performance</p>
            </div>
            <AdminHeader />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
               <p className="text-gray-500 text-sm">Total Inventory</p>
               <h3 className="text-3xl font-bold text-gray-800 mt-1">${totalValue.toLocaleString()}</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
               <p className="text-gray-500 text-sm">Active Products</p>
               <h3 className="text-3xl font-bold text-gray-800 mt-1">{products.length}</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
               <p className="text-gray-500 text-sm">Categories</p>
               <h3 className="text-3xl font-bold text-gray-800 mt-1">{activeCategories}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-1">
              <ProductForm />
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                <h3 className="font-bold text-gray-800 mb-4 p-4 pb-0">Stock Trends</h3>
                <div className="p-4 h-full">
                    <DashboardChart products={products} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">All Product List</h2>
            </div>
            <ProductList products={products} />
          </div>

        </div>
      </main>
    </div>
  );
}