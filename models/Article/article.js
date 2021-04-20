import mongoose, { Schema } from "mongoose";

const articleSchema = new Schema({
  category: { type: Schema.ObjectId, ref: "category" },
  code: { type: String, maxlength: 64 },
  name: { type: String, maxlength: 50, unique: true, required: true },
  description: { type: String, maxlength: 255 },
  sale_price: { type: Number, required: true },
  stock: { type: Number, required: true },
  state: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now }
});

const Article = mongoose.model("article", articleSchema);

export default Article;
