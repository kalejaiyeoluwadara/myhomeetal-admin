import mongoose from "mongoose";

const { Schema } = mongoose;

const adminTransactionSchema = new Schema({
  amount: { type: Number, required: true },
  type: {
    type: String,
    enum: ["Wallet payment", "Withdrawal"],
    required: true,
  },
  actor: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

const AdminTransaction =
  mongoose.models.AdminTransaction ||
  mongoose.model("AdminTransaction", adminTransactionSchema);

export default AdminTransaction;
