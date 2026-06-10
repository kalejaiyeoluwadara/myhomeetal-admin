import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  productTitle: { type: String, required: true },
  review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  price: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
    required: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductSubCategory",
    required: true,
  },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
  isProductNew: { type: Boolean },
  inventory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },
  brand: { type: String },
  weight: { type: String },
  modelNumber: { type: String },
  mainMaterial: { type: String },
  color: { type: String },
  keyFeatures: [{ type: String }],
  sku: { type: String },
  size: { type: String },
  createdOn: { type: String },
  createdBy: { type: String },
  updatedOn: { type: String },
  updatedBy: { type: String },
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
