import { Router } from "express";
import { isAuthenticated } from "../middlewares/authenticatedMiddleWare";
import {
  createInvoice,
  deleteInvoice,
  getInvoiceById,
  getInvoices,
  updateInvoice,
} from "../controllers/invoice.controller";
import {
  createInvoiceValidation,
  deleteInvoiceValidation,
  getInvoiceByIdValidation,
  updateInvoiceValidation,
} from "../validations/invoice.validation";

const router = Router();

router
  .route("/")
  .get(isAuthenticated, getInvoices)
  .post(isAuthenticated, createInvoiceValidation(), createInvoice);

router
  .route("/:id")
  .get(isAuthenticated, getInvoiceByIdValidation(), getInvoiceById)
  .patch(isAuthenticated, updateInvoiceValidation(), updateInvoice)
  .delete(isAuthenticated, deleteInvoiceValidation(), deleteInvoice);

export default router;
