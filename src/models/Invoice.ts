import { Schema, model } from "mongoose";
import {
  IInvoice,
  InvoiceType,
  PaymentStatus,
} from "../interfaces/invoice.interface";

const invoiceSchema = new Schema<IInvoice>(
  {
    type: { type: String, enum: Object.values(InvoiceType), required: true },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      required: true,
    },
    name: { type: String, required: true },
    invoiceNumber: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
    client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
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

const Invoice = model("Invoice", invoiceSchema);
export default Invoice;
