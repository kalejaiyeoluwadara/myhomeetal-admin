import mongoose from "mongoose";

const { Schema } = mongoose;

const productCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  subCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductSubCategory" }],
  product_category_image: { type: String },
  createdBy: { type: String },
  createdOn: { type: String },
  updatedBy: { type: String },
  updatedOn: { type: String },
});

const ProductCategory =
  mongoose.models.ProductCategory ||
  mongoose.model("ProductCategory", productCategorySchema);

export default ProductCategory;
