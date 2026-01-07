import { connectDB, Product } from "@/lib/db"; 
import DashboardClient from "@/components/DashboardClient";

export const dynamic = "force-dynamic";

async function getProducts() {
  await connectDB();
  // Fetch products and convert to plain objects safely
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();
  
  // Convert _id and dates to strings to avoid serialization warnings
  return products.map((product: any) => ({
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt?.toString(),
    updatedAt: product.updatedAt?.toString(),
  }));
}

export default async function Home() {
  const products = await getProducts();
  return <DashboardClient products={products} />;
}