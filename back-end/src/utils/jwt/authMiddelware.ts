import { NextFunction, Request, Response } from "express";
import { generatorError } from "../errorGenerator";
import { UserType } from "../../types";
import { parseToken } from ".";
import { User } from "../../models/User";

const AuthMiddelware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token) {
    const userEmail = parseToken(token);
    const user: UserType | null = await User.findOne({
      email: userEmail?.email,
    });
    if (!user) {
      return res.status(400).send(generatorError("Invalid token"));
    }
    req.user = user;
    return next();
  }
  return next();
};

export default AuthMiddelware;
