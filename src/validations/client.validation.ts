import { Joi, validate } from "express-validation";
import { Types } from "mongoose";

const createClientSchema = {
  body: Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
  }),
};
const updateClientSchema = {
  body: Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    address: Joi.string(),
    email: Joi.string().email(),
    phoneNumber: Joi.string(),
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
const deleteClientSchema = {
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

const getClientByIdSchema = {
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
export const createClientValidation = () => {
  return validate(createClientSchema, { context: true }, { abortEarly: false });
};
export const updateClientValidation = () => {
  return validate(updateClientSchema, { context: true }, { abortEarly: false });
};

export const deleteClientValidation = () => {
  return validate(deleteClientSchema, { context: true }, { abortEarly: false });
};

export const getClientByIdValidation = () => {
  return validate(
    getClientByIdSchema,
    { context: true },
    { abortEarly: false }
  );
};
