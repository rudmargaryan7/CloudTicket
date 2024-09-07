import { Router } from "express";
import { body, query, validationResult } from "express-validator";
import { authUser, LoginService, RegisterService } from "./service";
import { Request, Response, NextFunction } from "express";

const router = Router();

router.post(
  "/register",
  [
    body("login").notEmpty(),
    body("password").trim().isLength({ min: 8, max: 8 }),
    body("confirmPassword").trim().isLength({ min: 8, max: 8 }),
    body("email").isEmail().notEmpty(),
  ],
  function (req: Request, res: Response) {
    const data = validationResult(req);
    if (data.isEmpty()) {
      return RegisterService(req, res);
    }
    res.status(400).send({
      error: {
        type: "validator",
        errors: data.array(),
      },
    });
  }
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").notEmpty(),
  function (req: Request, res: Response) {
    const data = validationResult(req);
    if (data.isEmpty()) {
      return LoginService(req, res);
    }
    res.status(400).send({
      error: {
        type: "validator",
        errors: data.array(),
      },
    });
  }
);

router.get("/:token", authUser);

export default router;
