import { Document, Types } from "mongoose";
import { IParams } from "./helper.interface";

export interface IClient extends Document {
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  phoneNumber: string;
  user: Types.ObjectId;
  _id?: Types.ObjectId;
}

export interface CreateClient {
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  phoneNumber: string;
}
export interface IClientParams extends IParams {}
