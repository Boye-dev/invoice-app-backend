import {
  createUserValidation,
  forgotPasswordValidation,
  getUserByIdValidation,
  loginUserValidation,
  refreshTokenValidation,
  resetPassswordValidation,
  updatePassswordValidation,
  updateUserValidation,
  verifyUserValidation,
} from "./../validations/user.validation";
import { Router } from "express";
import {
  createUser,
  forgotPassword,
  getUserById,
  login,
  refresh,
  resetPassword,
  updatePassword,
  updateUser,
  verifyUser,
} from "../controllers/user.controller";
import { upload } from "../config/upload";
import { isAuthenticated } from "../middlewares/authenticatedMiddleWare";

const router = Router();

router.route("/").post(
  upload.fields([
    { name: "businessLogo", maxCount: 1 },
    { name: "profilePicture", maxCount: 1 },
  ]),
  createUserValidation(),
  createUser
);

router
  .route("/:id")
  .get(isAuthenticated, getUserByIdValidation(), getUserById)
  .patch(
    isAuthenticated,
    upload.fields([
      { name: "businessLogo", maxCount: 1 },
      { name: "profilePicture", maxCount: 1 },
    ]),
    updateUserValidation(),
    updateUser
  );

router.post("/login", loginUserValidation(), login);

router.post("/refresh", refreshTokenValidation(), refresh);

router.post("/forgot-password", forgotPasswordValidation(), forgotPassword);

router.get("/verify/:id/:token", verifyUserValidation(), verifyUser);

router.patch(
  "/reset-password/:id/:token",
  resetPassswordValidation(),
  resetPassword
);

router.patch(
  "/update-password/:id",
  updatePassswordValidation(),
  updatePassword
);
export default router;
