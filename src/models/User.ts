import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    profilePicture: { type: String },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    businessName: { type: String, unique: true, required: true },
    businessAddress: { type: String, required: true },
    businessLogo: { type: String, required: true },
    businessCity: { type: String, required: true },
    businessState: { type: String, required: true },
    businessZip: { type: String },
    businessCountry: { type: String, required: true },
    businessPhone: { type: String, required: true },
    businessEmail: { type: String, required: true },
    businessWebsite: { type: String },
    verificationToken: { type: String },
    resetToken: { type: String },
    resetTokenExpires: { type: Date },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret.verificationToken;
      },
    },
  }
);

const User = model("User", userSchema);

export default User;
