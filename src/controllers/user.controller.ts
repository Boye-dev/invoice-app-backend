import ApiError from "../errors/apiError";
import { ExpresFunction, IdParam } from "../interfaces/helper.interface";
import {
  CreateUserRequest,
  IUserLogin,
  IUserReset,
  IUserVerify,
} from "../interfaces/user.interface";
import User from "../models/User";
import { cloudinaryImageUpload } from "../services/cloudinary.service";
import {
  createUserService,
  forgotPasswordService,
  getUserByIdService,
  loginService,
  reesetPasswordService,
  updateUserService,
  verifyMailService,
} from "../services/user.service";

export const createUser: ExpresFunction<CreateUserRequest> = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new ApiError(400, `User with ${user.email} already exists`);
    }
    const { businessLogo, profilePicture } = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    if (!businessLogo) {
      throw new ApiError(400, "Business logo is required");
    }

    const businessLogoResult = await cloudinaryImageUpload(
      businessLogo[0].buffer,
      "InvoiceApp_Users"
    );
    if (profilePicture) {
      const profilePictureResult = await cloudinaryImageUpload(
        profilePicture[0].buffer,
        "InvoiceApp_Users"
      );
      req.body.profilePicture = profilePictureResult.secure_url;
    }
    req.body.businessLogo = businessLogoResult.secure_url;
    const data = await createUserService(req.body);
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
export const updateUser: ExpresFunction<
  Partial<Omit<CreateUserRequest, "password" | "email">>
> = async (req, res, next) => {
  try {
    const { businessLogo, profilePicture } = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    if (businessLogo) {
      const businessLogoResult = await cloudinaryImageUpload(
        businessLogo[0].buffer,
        "InvoiceApp_Users"
      );
      req.body.businessLogo = businessLogoResult.secure_url;
    }

    if (profilePicture) {
      const profilePictureResult = await cloudinaryImageUpload(
        profilePicture[0].buffer,
        "InvoiceApp_Users"
      );
      req.body.profilePicture = profilePictureResult.secure_url;
    }
    const data = await updateUserService(req.params as IdParam, req.body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getUserById: ExpresFunction = async (req, res, next) => {
  try {
    const data = await getUserByIdService(req.params as IdParam);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const login: ExpresFunction<IUserLogin> = async (req, res, next) => {
  try {
    const data = await loginService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const forgotPassword: ExpresFunction<Pick<IUserLogin, "email">> = async (
  req,
  res,
  next
) => {
  try {
    const data = await forgotPasswordService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const verifyUser: ExpresFunction = async (req, res, next) => {
  try {
    const data = await verifyMailService(req.params as IUserVerify);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const resetPassword: ExpresFunction<IUserReset> = async (
  req,
  res,
  next
) => {
  try {
    const data = await reesetPasswordService(
      req.params as IUserVerify,
      req.body
    );
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
