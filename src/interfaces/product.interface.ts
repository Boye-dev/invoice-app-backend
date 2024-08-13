import { Types } from "mongoose";
import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  user: Types.ObjectId;
  image: string;
}

export interface CreateProduct {
  name: string;
  price: number;
  description: string;
  image?: string;
}
