import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../../schemas/UserSchema";

interface IForgotPasswordRequest extends Request {
  body: {
    userLogin: string;
  };
}

