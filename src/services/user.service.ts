import ApiError from "../errors/apiError";
import {
  CreateUserRequest,
  IUser,
  IUserLogin,
  IUserReset,
  IUserVerify,
} from "../interfaces/user.interface";
import User from "../models/User";
import * as bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import {
  sendVerificationMail,
  sendforgotPasswordMail,
} from "./nodemailer/mail.service";
import jwt from "jsonwebtoken";
import ApiResponse from "../errors/apiResponse";
import { Types } from "mongoose";
import { IdParam } from "../interfaces/helper.interface";

const saltRounds = 13;

export const createUserService = async (data: CreateUserRequest) => {
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  data.password = hashedPassword;

  const verificationToken = randomBytes(32).toString("hex");
  const userInfo = { ...data, verificationToken };
  const newUser = await User.create(userInfo);
  await sendVerificationMail(newUser);

  return new ApiResponse(200, "User Created Successfully", newUser.toJSON());
};

export const loginService = async (data: IUserLogin) => {
  const user = await User.findOne({ email: data.email });

  if (!user) {
    throw new ApiError(400, `Invalid Email/Password`);
  }

  const isValidPassword = await bcrypt.compare(data.password, user.password);
  if (!isValidPassword || !user) {
    throw new ApiError(400, `Invalid Email/Password`);
  }

  if (!user.verified) {
    throw new ApiError(400, `Please verify your email`);
  }
  const payload = {
    id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    profilePicture: user.profilePicture,
  };
  const JWT_SECRET = process.env.JWT_SECRET;
  if (JWT_SECRET) {
    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "5h",
    });
    const refreshToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "6d",
    });
    return new ApiResponse(200, "Login Successfull", {
      accessToken,
      refreshToken,
    });
  }
};

export const forgotPasswordService = async (
  data: Pick<IUserLogin, "email">
) => {
  const user = await User.findOne({ email: data.email });

  if (!user) {
    throw new ApiError(400, `User with ${data.email} does not exist`);
  }
  if (!user.verified) {
    throw new ApiError(400, `Please verify your email`);
  }

  const token = randomBytes(32).toString("hex");
  user.resetToken = token;
  const date = new Date();
  date.setHours(date.getHours() + 1);

  user.resetTokenExpires = date;

  await user.save();

  const payload = {
    email: user.email,
    name: user.lastname,
  };
  await sendforgotPasswordMail(payload);

  return new ApiResponse(200, "Reset Email Sent Successfully");
};

export const verifyMailService = async (data: IUserVerify) => {
  const user = await User.findOne({
    _id: data.id,
    verificationToken: data.token,
  });
  if (!user) {
    throw new ApiError(400, `User not found`);
  }
  user.verified = true;
  user.verificationToken = undefined;
  await user.save();

  return new ApiResponse(200, "Email Verified Successfully");
};

export const reesetPasswordService = async (
  params: IUserVerify,
  data: IUserReset
) => {
  const user = await User.findOne({
    _id: params.id,
    resetToken: params.token,
  });
  if (!user) {
    throw new ApiError(400, `User not found`);
  }

  if (
    !user.resetToken ||
    new Date(user.resetToken).getMilliseconds() < new Date().getMilliseconds()
  ) {
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    throw new ApiError(400, `Token has expired`);
  }
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  user.password = hashedPassword;

  await user.save();

  return new ApiResponse(200, "Password Reset Successfull");
};

export const updateUserService = async (
  params: IdParam,
  data: Partial<Omit<CreateUserRequest, "password" | "email">>
) => {
  const user = await User.findByIdAndUpdate(params.id, data);
  return new ApiResponse(200, "User Updated Successfully", user);
};

export const getUserByIdService = async (params: IdParam) => {
  const user = await User.findById(params.id);
  if (!user) {
    throw new ApiError(400, `User not found`);
  }
  return new ApiResponse(200, "User Found", user);
};
