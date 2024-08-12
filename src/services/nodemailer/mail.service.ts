import ApiError from "../../errors/apiError";
import { IUser } from "../../interfaces/user.interface";
import transporter from "./nodemailer";

export const sendVerificationMail = async (userInfo: IUser) => {
  const mailOptions = {
    to: userInfo.email,
    template: "./verifyemail",
    subject: "Verify your email",
    context: {
      name: userInfo.lastname,
      email: userInfo.email,
      url: "hello",
    },
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error sending verification email");
  }
};

export const sendforgotPasswordMail = async ({
  email,
  name,
}: {
  email: string;
  name: string;
}) => {
  const mailOptions = {
    to: email,
    subject: "Reset your password",
    template: "./passwordreset",
    context: {
      name,
      url: "hello",
    },
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new ApiError(500, "Error Sending forgot Password Mail");
  }
};
