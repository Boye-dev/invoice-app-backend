import { Document, Types } from "mongoose";

export interface IClient extends Document {
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  phoneNumber: string;
  user: Types.ObjectId;
}

export interface CreateClient {
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  phoneNumber: string;
}
