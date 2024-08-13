import { Schema, model } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

const productSchema = new Schema<IProduct>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret, options) {
        delete ret.user;
      },
    },
  }
);

const Product = model("Product", productSchema);

export default Product;
