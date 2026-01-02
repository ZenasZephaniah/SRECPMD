import connectDB from "@/lib/db";
import Product from "@/models/Product";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import DashboardChart from "@/components/DashboardChart";

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

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CDC Merchant Dashboard</h1>
            <p className="text-gray-500">Manage your inventory and track performance</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border text-sm font-medium">
            Total Products: <span className="text-blue-600 font-bold">{products.length}</span>
          </div>
        </div>

        {/* Top Section: Charts & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Left: Add Product Form */}
          <div className="lg:col-span-1">
            <ProductForm />
          </div>

          {/* Right: Charts */}
          <div className="lg:col-span-2">
            <DashboardChart products={products} />
            
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-blue-600 text-white p-6 rounded-xl shadow-sm">
                <p className="text-blue-100 text-sm">Total Inventory Value</p>
                <h3 className="text-2xl font-bold">
                  ${products.reduce((acc: number, p: any) => acc + (p.price * p.stock), 0).toLocaleString()}
                </h3>
              </div>
              <div className="bg-emerald-500 text-white p-6 rounded-xl shadow-sm">
                <p className="text-emerald-100 text-sm">Active Categories</p>
                <h3 className="text-2xl font-bold">
                  {[...new Set(products.map((p: any) => p.category))].length}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Product List */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Products</h2>
          <ProductList products={products} />
        </div>

      </div>
    </main>
  );
}