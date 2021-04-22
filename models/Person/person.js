import mongoose, { Schema } from "mongoose";

const personSchema = new Schema({
  person_type: { type: String, maxlength: 30, required: true },
  name: { type: String, unique: true, required: true },
  document_type: { type: String, maxlength: 20 },
  document_number: { type: String, maxlength: 20 },
  address: { type: String, maxlength: 70 },
  phone: { type: String, maxlength: 20 },
  email: { type: String, maxlength: 50, unique: true, required: true },
  state: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now }
});

const Person = mongoose.model("person", personSchema);

export default Person;
