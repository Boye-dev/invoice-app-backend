import { Joi, validate } from "express-validation";
import { Types } from "mongoose";
import { InvoiceType, PaymentStatus } from "../interfaces/invoice.interface";

const createInvoiceSchema = {
  body: Joi.object({
    paymentStatus: Joi.string()
      .valid(...Object.values(PaymentStatus))
      .required(),
    type: Joi.string()
      .valid(...Object.values(InvoiceType))
      .required(),
    products: Joi.array()
      .items(
        Joi.string()
          .custom((value, helpers) => {
            if (!Types.ObjectId.isValid(value)) {
              return helpers.error("any.invalid");
            }
            return value;
          }, "ObjectId validation")
          .required()
      )
      .required(),
    client: Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      address: Joi.string().required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().required(),
      _id: Joi.string().custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      }, "ObjectId validation"),
    }),
    name: Joi.string().required(),
  }),
};
const updateInvoiceSchema = {
  body: Joi.object({
    paymentStatus: Joi.string().valid(...Object.values(PaymentStatus)),
    type: Joi.string().valid(...Object.values(InvoiceType)),
    products: Joi.array().items(
      Joi.string().custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      }, "ObjectId validation")
    ),
    client: Joi.object({
      firstname: Joi.string(),
      lastname: Joi.string(),
      address: Joi.string(),
      email: Joi.string().email(),
      phoneNumber: Joi.string(),
      _id: Joi.string().custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      }, "ObjectId validation"),
    }),
    name: Joi.string(),
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
const deleteInvoiceSchema = {
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

const getInvoiceByIdSchema = {
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
export const createInvoiceValidation = () => {
  return validate(
    createInvoiceSchema,
    { context: true },
    { abortEarly: false }
  );
};
export const updateInvoiceValidation = () => {
  return validate(
    updateInvoiceSchema,
    { context: true },
    { abortEarly: false }
  );
};

export const deleteInvoiceValidation = () => {
  return validate(
    deleteInvoiceSchema,
    { context: true },
    { abortEarly: false }
  );
};

export const getInvoiceByIdValidation = () => {
  return validate(
    getInvoiceByIdSchema,
    { context: true },
    { abortEarly: false }
  );
};
