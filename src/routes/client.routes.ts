import { Router } from "express";
import { isAuthenticated } from "../middlewares/authenticatedMiddleWare";
import {
  createClient,
  deleteClient,
  getClientById,
  getClients,
  updateClient,
} from "../controllers/client.controller";
import {
  createClientValidation,
  deleteClientValidation,
  getClientByIdValidation,
  updateClientValidation,
} from "../validations/client.validation";

const router = Router();

router
  .route("/")
  .get(isAuthenticated, getClients)
  .post(isAuthenticated, createClientValidation(), createClient);

router
  .route("/:id")
  .get(isAuthenticated, getClientByIdValidation(), getClientById)
  .patch(isAuthenticated, updateClientValidation(), updateClient)
  .delete(isAuthenticated, deleteClientValidation(), deleteClient);

export default router;
