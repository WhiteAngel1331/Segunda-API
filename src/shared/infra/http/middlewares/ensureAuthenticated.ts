import {Request, Response, NextFunction} from "express";
import {verify} from "jsonwebtoken";
import {AppError} from "@shared/errors/AppError";
import {UsersRepository} from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const {authorization} = request.headers;

  if (!authorization) {
    throw new AppError("JWT token is missing", 401);
  }

  const [, token] = authorization.split(" ");

  try {
    const {sub} = verify(token, "BatatenhasGalopantesDoAlaska") as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(sub);

    if (!user) {
      throw new AppError("User not found");
    }

    request.user = user;

    return next();
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
}
