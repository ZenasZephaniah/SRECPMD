import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    category: {
      type: String,
      required: false, // Fix: Made optional
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    stock: {
      type: Number,
      required: [true, "Please provide stock quantity"],
    },
    description: {
      type: String,
      required: false, // Fix: Made optional
    },
    imageUrl: {
      type: String,
      required: false, // Fix: Made optional to prevent crash
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);