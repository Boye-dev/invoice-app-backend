import { Router } from "express";
import { isAuthenticated } from "../middlewares/authenticatedMiddleWare";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";
import {
  createProductValidation,
  deleteProductValidation,
  getProductByIdValidation,
  updateProductValidation,
} from "../validations/product.validation";
import { upload } from "../config/upload";

const router = Router();

router
  .route("/")
  .get(isAuthenticated, getProducts)
  .post(
    isAuthenticated,
    upload.single("image"),
    createProductValidation(),
    createProduct
  );

router
  .route("/:id")
  .get(isAuthenticated, getProductByIdValidation(), getProductById)
  .patch(
    isAuthenticated,
    upload.single("image"),
    updateProductValidation(),
    updateProduct
  )
  .delete(isAuthenticated, deleteProductValidation(), deleteProduct);

export default router;
