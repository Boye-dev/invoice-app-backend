import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../errors/apiError";
import { ExpresFunction } from "../interfaces/helper.interface";
import { Request } from "express";

export const isAuthenticated: ExpresFunction = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new ApiError(500, "JWT secret is not configured");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      throw new ApiError(401, "Token has expired");
    }

    (req as Request & { user?: string | JwtPayload }).user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
