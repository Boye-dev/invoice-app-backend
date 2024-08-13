import { Schema, model } from "mongoose";
import { IClient } from "../interfaces/client.interface";

const clientSchema = new Schema<IClient>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
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

const Client = model("Client", clientSchema);
export default Client;
