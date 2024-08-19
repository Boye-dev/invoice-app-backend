import { Document, Types } from "mongoose";
import { IParams } from "./helper.interface";
import { IClient } from "./client.interface";

export enum InvoiceType {
  QUOTATION = "QUOTATION",
  INVOICE = "INVOICE",
}
export enum PaymentStatus {
  INSTALLMENT = "INSTALLMENT",
  FULLY_PAID = "FULLY_PAID",
  PAID_CASH = "PAID_CASH",
  PAID_ONLINE = "PAID_ONLINE",
  UNPAID = "UNPAID",
}
export interface IInvoice extends Document {
  name: string;
  user: Types.ObjectId;
  client: Types.ObjectId;
  products: {
    productId: Types.ObjectId;
    quantity: number;
  }[];
  type: InvoiceType;
  paymentStatus: PaymentStatus;
  invoiceNumber: string;
}

export interface CreateInvoice {
  name: string;
  client: IClient;
  products: {
    productId: Types.ObjectId;
    quantity: number;
  }[];
  type: InvoiceType;
  paymentStatus: PaymentStatus;
}
export interface IInvoiceParams extends IParams {
  paymentStatus?: string;
  type?: keyof typeof InvoiceType;
}
