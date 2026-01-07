import { NextResponse } from "next/server";
import { connectDB, Product } from "@/lib/db"; 

// Define params as a Promise (Next.js 15 Standard)
type Props = {
  params: Promise<{ id: string }>;
};

// DELETE Product
export async function DELETE(req: Request, { params }: Props) {
  try {
    const { id } = await params;
    await connectDB();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

// UPDATE Product
export async function PUT(req: Request, { params }: Props) {
  try {
    const { id } = await params;
    const body = await req.json(); 
    
    await connectDB();
    
    // Update the product with the new body data
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
    
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}