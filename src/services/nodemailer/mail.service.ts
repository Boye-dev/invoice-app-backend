import ApiError from "../../errors/apiError";
import { IUser } from "../../interfaces/user.interface";
import transporter from "./nodemailer";

const DOMAIN_NAME = process.env.DOMAIN_NAME;
export const sendVerificationMail = async (userInfo: IUser) => {
  const mailOptions = {
    to: userInfo.email,
    template: "./verifyemail",
    subject: "Verify your email",
    context: {
      name: userInfo.lastname,
      email: userInfo.email,
      url: `${DOMAIN_NAME}/verify/${userInfo._id}/${userInfo.verificationToken}`,
    },
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new ApiError(500, "Error sending verification email");
  }
};

export const sendforgotPasswordMail = async (userInfo: IUser) => {
  const mailOptions = {
    to: userInfo.email,
    subject: "Reset your password",
    template: "./passwordreset",
    context: {
      name: userInfo.lastname,
      url: `${DOMAIN_NAME}/reset-password/${userInfo._id}/${userInfo.resetToken}`,
    },
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new ApiError(500, "Error Sending forgot Password Mail");
  }
};
