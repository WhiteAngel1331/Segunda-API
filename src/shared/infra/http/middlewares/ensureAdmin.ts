import {UsersRepository} from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import {AppError} from "@shared/errors/AppError";
import {Request, Response, NextFunction} from "express";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const userRepository = new UsersRepository();

  const user = await userRepository.findById(request.user.id);

  if (user.isAdmin) {
    next();
  } else {
    throw new AppError("You are not an admin", 401);
  }
}
