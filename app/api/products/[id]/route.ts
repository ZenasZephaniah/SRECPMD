import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

// Fix: Define params as a Promise
type Props = {
  params: Promise<{ id: string }>;
};

// DELETE Product
export async function DELETE(req: Request, { params }: Props) {
  try {
    const { id } = await params; // Await the params
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
    const { id } = await params; // Await the params
    const body = await req.json();
    await connectDB();
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}