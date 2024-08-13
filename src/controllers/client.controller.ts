import ApiError from "../errors/apiError";
import { CreateClient } from "../interfaces/client.interface";
import { ExpresFunction, IdParam } from "../interfaces/helper.interface";
import {
  createClientService,
  delteClientService,
  getByIdClientService,
  getClientsService,
  updateClientService,
} from "../services/client.service";

export const createClient: ExpresFunction<CreateClient> = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await createClientService(req.user.id, req.body);
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
export const updateClient: ExpresFunction<Partial<CreateClient>> = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await updateClientService(
      req.user.id,
      req.params as IdParam,
      req.body
    );
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteClient: ExpresFunction = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await delteClientService(req.user.id, req.params as IdParam);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getClients: ExpresFunction = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await getClientsService(req.user.id);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getClientById: ExpresFunction = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "No logged in user");
    }
    const data = await getByIdClientService(req.user.id, req.params as IdParam);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
