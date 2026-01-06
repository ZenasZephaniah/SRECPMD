import connectDB from "@/lib/db";
import Product from "@/models/Product";
import DashboardClient from "@/components/DashboardClient";

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
  return <DashboardClient products={products} />;
}