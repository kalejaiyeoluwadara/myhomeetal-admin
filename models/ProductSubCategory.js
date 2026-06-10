import mongoose from "mongoose";

const { Schema } = mongoose;

const productSubCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory" },
  subCategoryImage: { type: String },
  createdBy: { type: String },
  updatedBy: { type: String },
  createdOn: { type: String },
  updatedOn: { type: String },
});

const ProductSubCategory =
  mongoose.models.ProductSubCategory ||
  mongoose.model("ProductSubCategory", productSubCategorySchema);

export default ProductSubCategory;
