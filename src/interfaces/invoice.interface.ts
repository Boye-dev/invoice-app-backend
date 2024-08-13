import { Document, Types } from "mongoose";

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
  products: Types.ObjectId[];
  type: InvoiceType;
  paymentStatus: PaymentStatus;
  invoiceNumber: string;
}

export interface CreateInvoice {
  name: string;
  client: Types.ObjectId;
  products: Types.ObjectId[];
  type: InvoiceType;
  paymentStatus: PaymentStatus;
}
