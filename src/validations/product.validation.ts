import { Joi, validate } from "express-validation";
import { Types } from "mongoose";

const createProductSchema = {
  body: Joi.object({
    description: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),
};
const updateProductSchema = {
  body: Joi.object({
    description: Joi.string(),
    name: Joi.string(),
    price: Joi.number(),
  }),
  params: Joi.object({
    id: Joi.string()
      .custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      }, "ObjectId validation")
      .required(),
  }),
};
const deleteProductSchema = {
  params: Joi.object({
    id: Joi.string()
      .custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      }, "ObjectId validation")
      .required(),
  }),
};

const getProductByIdSchema = {
  params: Joi.object({
    id: Joi.string()
      .custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      }, "ObjectId validation")
      .required(),
  }),
};
export const createProductValidation = () => {
  return validate(
    createProductSchema,
    { context: true },
    { abortEarly: false }
  );
};
export const updateProductValidation = () => {
  return validate(
    updateProductSchema,
    { context: true },
    { abortEarly: false }
  );
};

export const deleteProductValidation = () => {
  return validate(
    deleteProductSchema,
    { context: true },
    { abortEarly: false }
  );
};

export const getProductByIdValidation = () => {
  return validate(
    getProductByIdSchema,
    { context: true },
    { abortEarly: false }
  );
};
