import mongoose from "mongoose";

const { Schema } = mongoose;

const addressSchema = new Schema({
  deliveryAddress: { type: String },
  phone_number: { type: String },
  city: { type: String },
});

const Address = mongoose.models.Address || mongoose.model("Address", addressSchema);

export default Address;
