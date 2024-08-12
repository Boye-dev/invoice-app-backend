import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export type ExpresFunction<B = {}, Q = {}> = (
  req: Request<{}, {}, B, Q> & { user?: string | JwtPayload },
  res: Response,
  next: NextFunction
) => void;

export interface IdParam {
  id: Types.ObjectId;
}
