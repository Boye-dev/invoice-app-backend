import { Types } from "mongoose";
import { CreateProduct, IProduct } from "../interfaces/product.interface";
import Product from "../models/Product";
import ApiError from "../errors/apiError";
import ApiResponse from "../errors/apiResponse";
import { paginatedFind } from "./helper.service";
import { IdParam } from "../interfaces/helper.interface";

export const createProductService = async (
  user: Types.ObjectId,
  data: CreateProduct
) => {
  const product = await Product.findOne({ user, name: data.name });
  if (product) {
    throw new ApiError(
      400,
      `Product with name: ${product.name} already exists`
    );
  }
  const newProduct = await Product.create({ ...data, user });

  return new ApiResponse(
    201,
    "Product Created Successfully",
    newProduct.toJSON()
  );
};
export const updateProductService = async (
  user: Types.ObjectId,
  param: IdParam,
  data: Partial<CreateProduct>
) => {
  const product = await Product.findOne({
    user,
    _id: param.id,
    name: data.name,
  });
  if (product) {
    throw new ApiError(404, `Cannot update product`);
  }
  const updatedProduct = await Product.findByIdAndUpdate(param.id, data, {
    new: true,
  });

  return new ApiResponse(
    200,
    "Product Updated Successfully",
    updatedProduct?.toJSON()
  );
};

export const getProductsService = async (user: Types.ObjectId) => {
  const products = await paginatedFind<IProduct>(Product, { user });
  return new ApiResponse(200, "Products fetched successfully", products);
};

export const getByIdProductService = async (
  user: Types.ObjectId,
  param: IdParam
) => {
  const product = await Product.findOne({ user, _id: param.id });
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return new ApiResponse(200, "Product fetched successfully", product.toJSON());
};

export const delteProductService = async (
  user: Types.ObjectId,
  param: IdParam
) => {
  const product = await Product.findOne({ user, _id: param.id });
  if (!product) {
    throw new ApiError(404, `Product not found`);
  }
  await Product.findByIdAndDelete(param.id);

  return new ApiResponse(200, "Product Deleted Successfully");
};
