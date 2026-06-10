import mongoose from "mongoose";

const { Schema } = mongoose;

const adminWalletSchema = new Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Admin" },
  account_no: { type: String, required: true },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "AdminTransaction" }],
});

const AdminWallet =
  mongoose.models.AdminWallet || mongoose.model("AdminWallet", adminWalletSchema);

export default AdminWallet;
