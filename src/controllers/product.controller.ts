import ApiError from "../errors/apiError";
import { CreateProduct, IProductParams } from "../interfaces/product.interface";
import { ExpresFunction, IdParam } from "../interfaces/helper.interface";
import {
  createProductService,
  delteProductService,
  getByIdProductService,
  getProductsService,
  updateProductService,
} from "../services/product.service";
import { cloudinaryImageUpload } from "../services/cloudinary.service";

export const createProduct: ExpresFunction<CreateProduct> = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }

    if (req.file) {
      const imageResult = await cloudinaryImageUpload(
        req.file.buffer,
        "InvoiceApp_Products"
      );
      req.body.image = imageResult.secure_url;
    }

    const data = await createProductService(req.user.id, req.body);
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
export const updateProduct: ExpresFunction<Partial<CreateProduct>> = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }

    if (req.file) {
      const imageResult = await cloudinaryImageUpload(
        req.file.buffer,
        "InvoiceApp_Products"
      );
      req.body.image = imageResult.secure_url;
    }

    const data = await updateProductService(
      req.user.id,
      req.params as IdParam,
      req.body
    );
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct: ExpresFunction = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await delteProductService(req.user.id, req.params as IdParam);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getProducts: ExpresFunction<{}, IProductParams> = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await getProductsService(req.user.id, req.query);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getProductById: ExpresFunction = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await getByIdProductService(
      req.user.id,
      req.params as IdParam
    );
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
