import {Request, Response} from "express";
import {container} from "tsyringe";
import {AuthenticateUserUseCase} from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";

export class AuthenticateUserController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {password, email} = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const token = await authenticateUserUseCase.execute({
      password,
      email,
    });

    return response.json(token);
  }
}
