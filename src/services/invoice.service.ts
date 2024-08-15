import { Types } from "mongoose";
import {
  CreateInvoice,
  IInvoice,
  IInvoiceParams,
} from "../interfaces/invoice.interface";
import Invoice from "../models/Invoice";
import ApiError from "../errors/apiError";
import ApiResponse from "../errors/apiResponse";
import { paginatedFind } from "./helper.service";
import { IdParam } from "../interfaces/helper.interface";
import Client from "../models/Client";
import User from "../models/User";

export const createInvoiceService = async (
  user: Types.ObjectId,
  data: CreateInvoice
) => {
  if (data.client._id) {
    const { _id, __v, ...payload } = data.client;
    const client = await Client.findById(data.client._id);
    if (!client) {
      throw new ApiError(404, "Client not found");
    }

    await Client.findByIdAndUpdate(data.client._id, payload, { new: true });
    const userData = await User.findById(user);
    const total = await Invoice.countDocuments({ user });
    const invoiceNumber = `${userData?.businessName.slice(0, 3).toUpperCase()}${
      total + 1
    }`;

    const newInvoice = await Invoice.create({
      ...data,
      client: data.client._id,
      user,
      invoiceNumber,
    });
    return new ApiResponse(
      201,
      `${data.type} Created Successfully`,
      newInvoice.toJSON()
    );
  }

  const { _id, __v, ...payload } = data.client;

  const client = await Client.create({ ...payload, user });
  const userData = await User.findById(user);

  const total = await Invoice.countDocuments({ user });
  const invoiceNumber = `${userData?.businessName.slice(0, 3).toUpperCase()}${
    total + 1
  }`;

  const newInvoice = await Invoice.create({
    ...data,
    client: client._id,
    user,
    invoiceNumber,
  });

  return new ApiResponse(
    201,
    `${data.type} Created Successfully`,
    newInvoice.toJSON()
  );
};
export const updateInvoiceService = async (
  user: Types.ObjectId,
  param: IdParam,
  data: Partial<CreateInvoice>
) => {
  const invoice = await Invoice.findOne({ user, _id: param.id });
  if (!invoice) {
    throw new ApiError(404, `Invoice not found`);
  }

  const updatedInvoice = await Invoice.findByIdAndUpdate(param.id, data, {
    new: true,
  });

  if (!updatedInvoice) {
    throw new ApiError(404, `Invoice not found`);
  }

  return new ApiResponse(
    200,
    "Invoice Updated Successfully",
    updatedInvoice?.toJSON()
  );
};

export const getInvoicesService = async (
  user: Types.ObjectId,
  query: IInvoiceParams
) => {
  const invoices = await paginatedFind<IInvoice>(
    Invoice,
    {
      user,
      type: query.type,
      ...(query.search && { name: { $regex: query.search, $options: "i" } }),
    },
    ["products", "client"],
    query
  );
  return new ApiResponse(200, "Invoices fetched successfully", invoices);
};

export const getByIdInvoiceService = async (
  user: Types.ObjectId,
  param: IdParam
) => {
  const invoice = await Invoice.findOne({ user, _id: param.id }).populate([
    "client",
  ]);
  if (!invoice) {
    throw new ApiError(404, "Invoice not found");
  }
  return new ApiResponse(200, "Invoice fetched successfully", invoice.toJSON());
};

export const delteInvoiceService = async (
  user: Types.ObjectId,
  param: IdParam
) => {
  const invoice = await Invoice.findOne({ user, _id: param.id });
  if (!invoice) {
    throw new ApiError(404, `Invoice not found`);
  }
  await Invoice.findByIdAndDelete(param.id);

  return new ApiResponse(200, "Invoice Deleted Successfully");
};
