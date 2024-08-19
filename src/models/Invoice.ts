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
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
        _id: false,
      },
    ],

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
