import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    thumbnail: { type: String, required: true },
    thumbnail_big: { type: String, required: true },
    prices: {
      regular_price: { type: Number, required: true },
      sale_price: { type: Number, required: true },
    },
    category: { type: String, required: true },
    reviews_ratings: [{ rating: Number, review: String }],
    stock_available: { type: Number, required: true },
    sold_quantity: { type: Number, required: true },
    additional_info: {
      description: { type: String, required: true },
      weight: { type: Number, required: true },
      tags: { type: String, required: true },
    },
    product_status: { type: String, required: true },
    product_type: { type: String, required: true },
  },
  { timestamps: true }
);

const AddProduct =
  mongoose.models.AllProduct || mongoose.model("AllProduct", productSchema);
export default AddProduct;
