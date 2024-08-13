import { Types } from "mongoose";
import { CreateClient, IClient } from "../interfaces/client.interface";
import Client from "../models/Client";
import ApiError from "../errors/apiError";
import ApiResponse from "../errors/apiResponse";
import { paginatedFind } from "./helper.service";
import { IdParam } from "../interfaces/helper.interface";

export const createClientService = async (
  user: Types.ObjectId,
  data: CreateClient
) => {
  const client = await Client.findOne({ user, email: data.email });
  if (client) {
    throw new ApiError(
      400,
      `Client with email: ${client.email} already exists`
    );
  }
  const newClient = await Client.create({ ...data, user });

  return new ApiResponse(
    201,
    "Client Created Successfully",
    newClient.toJSON()
  );
};
export const updateClientService = async (
  user: Types.ObjectId,
  param: IdParam,
  data: Partial<CreateClient>
) => {
  const client = await Client.findOne({ user, _id: param.id });
  if (!client) {
    throw new ApiError(404, `Client not found`);
  }
  const updatedClient = await Client.findByIdAndUpdate(param.id, data, {
    new: true,
  });

  return new ApiResponse(
    200,
    "Client Updated Successfully",
    updatedClient?.toJSON()
  );
};

export const getClientsService = async (user: Types.ObjectId) => {
  const clients = await paginatedFind<IClient>(Client, { user });
  return new ApiResponse(201, "Clients fetched successfully", clients);
};

export const getByIdClientService = async (
  user: Types.ObjectId,
  param: IdParam
) => {
  const client = await Client.findOne({ user, _id: param.id });
  if (!client) {
    throw new ApiError(404, "Client not found");
  }
  return new ApiResponse(200, "Client fetched successfully", client.toJSON());
};

export const delteClientService = async (
  user: Types.ObjectId,
  param: IdParam
) => {
  const client = await Client.findOne({ user, _id: param.id });
  if (!client) {
    throw new ApiError(404, `Client not found`);
  }
  await Client.findByIdAndDelete(param.id);

  return new ApiResponse(200, "Client Deleted Successfully");
};
