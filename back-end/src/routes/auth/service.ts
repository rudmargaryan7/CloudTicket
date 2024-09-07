import { Request, Response, NextFunction } from "express";
import { User } from "../../models/User";
import { hashPassword, verifyPassword } from "../../utils/bcrypt/index";
import { generateToken, parseToken } from "../../utils/jwt";
import {
  generatorError,
  UserPayloadFunction,
} from "../../utils/errorGenerator";
import { UserType } from "../../types";

export const RegisterService = async (req: Request, res: Response) => {
  try {
    const { login, password, confirmPassword, email, isRemember } = req.body;
    if (password !== confirmPassword) {
      return res.send(generatorError("Invalid confirm password")).status(400);
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail && checkEmail._id) {
      return res.send(generatorError("User already exist")).status(400);
    }
    const hashedPassword = await hashPassword(password);
    const user = new User({
      login,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    if (isRemember) {
      const token = generateToken({ email: savedUser.email });
      return res
        .send({
          text: "User created successfuly",
          payload: { login, email },
          token,
        })
        .status(200);
    }
    return res
      .send({ text: "User created successfuly", payload: { login, email } })
      .status(200);
  } catch (error) {
    return res.status(400).send(generatorError(JSON.stringify(error)));
  }
};

export const LoginService = async (req: Request, res: Response) => {
  try {
    const { email, password, isRemember } = req.body;
    const user: UserType | null = await User.findOne({ email });
    if (!user) {
      return res.status(400).send(generatorError("User not found"));
    }
    const isPasswordMatch = await verifyPassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send(generatorError("Password dont mutch"));
    }
    if (isRemember) {
      const token = generateToken({ email: user.email });
      return res.status(200).send({
        payload: UserPayloadFunction(user),
        token,
      });
    }
    return res.status(200).send({
      payload: UserPayloadFunction(user),
    });
  } catch (error) {
    return res.status(400).send(generatorError(JSON.stringify(error)));
  }
};

export const authUser = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const userEmail = parseToken(token);
    const user: UserType | null = await User.findOne({
      email: userEmail?.email,
    });
    if (!user) {
      return res.status(400).send(generatorError("Invalid token"));
    }
    return res.status(200).send({ payload: UserPayloadFunction(user) });
  } catch (error) {
    return res.status(400).send(generatorError(JSON.stringify(error)));
  }
};
