import { Types } from "mongoose";

export interface CreateUserRequest {
  firstname: string;
  email: string;
  lastname: string;
  profilePicture: string;
  password: string;
  phonenNumber: string;
  businessName: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  businessCountry: string;
  businessPhone: string;
  businessEmail: string;
  businessWebsite: string;
  businessLogo: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUserVerify {
  id: Types.ObjectId;
  token: string;
}

export interface IUserReset {
  password: string;
}
export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  profilePicture?: string;
  phoneNumber: string;
  password: string;
  businessName: string;
  businessAddress: string;
  businessLogo: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  businessCountry: string;
  businessPhone: string;
  businessEmail: string;
  businessWebsite: string;
  verificationToken?: string;
  resetToken?: string;
  resetTokenExpires?: Date;
  verified: boolean;
}
