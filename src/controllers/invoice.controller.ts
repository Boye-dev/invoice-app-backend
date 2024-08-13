import ApiError from "../errors/apiError";
import { CreateInvoice } from "../interfaces/invoice.interface";
import { ExpresFunction, IdParam } from "../interfaces/helper.interface";
import {
  createInvoiceService,
  delteInvoiceService,
  getByIdInvoiceService,
  getInvoicesService,
  updateInvoiceService,
} from "../services/invoice.service";

export const createInvoice: ExpresFunction<CreateInvoice> = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await createInvoiceService(req.user.id, req.body);
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
export const updateInvoice: ExpresFunction<Partial<CreateInvoice>> = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await updateInvoiceService(
      req.user.id,
      req.params as IdParam,
      req.body
    );
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteInvoice: ExpresFunction = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await delteInvoiceService(req.user.id, req.params as IdParam);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getInvoices: ExpresFunction = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await getInvoicesService(req.user.id);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getInvoiceById: ExpresFunction = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await getByIdInvoiceService(
      req.user.id,
      req.params as IdParam
    );
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
