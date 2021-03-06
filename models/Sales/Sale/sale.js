import mongoose, { Schema } from "mongoose";

const saleSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "user", required: true },
  person: { type: Schema.ObjectId, ref: "person", required: true },
  voucher_type: { type: String, maxlength: 20, required: true },
  voucher_series: { type: String, maxlength: 7 },
  voucher_number: { type: String, maxlength: 10, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  details: [
    {
      _id: {
        type: String,
        required: true
      },
      article: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      discount: {
        type: Number,
        required: true
      }
    }
  ],
  state: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now }
});

const Sale = mongoose.model("sale", saleSchema);

export default Sale;
