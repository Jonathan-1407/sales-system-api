import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  rol: { type: String, maxlength: 30, required: true },
  name: { type: String },
  document_type: { type: String, maxlength: 20 },
  document_number: { type: String, maxlength: 20 },
  address: { type: String, maxlength: 70 },
  phone: { type: String, maxlength: 20 },
  email: { type: String, maxlength: 50, unique: true, required: true },
  password: { type: String, maxlength: 64, required: true },
  state: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now }
});

const user = mongoose.model("user", userSchema);

export default user;
