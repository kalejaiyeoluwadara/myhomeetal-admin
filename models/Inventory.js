import mongoose from "mongoose";

const { Schema } = mongoose;

const inventorySchema = new Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  createdOn: { type: String },
  createdBy: { type: String },
  updatedOn: { type: String },
  updatedBy: { type: String },
});

const Inventory =
  mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema);

export default Inventory;
