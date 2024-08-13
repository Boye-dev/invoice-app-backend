import { Schema, model } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

const Product = model("Product", productSchema);

export default Product;
