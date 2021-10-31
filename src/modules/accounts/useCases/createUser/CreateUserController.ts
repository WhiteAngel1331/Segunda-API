import {Request, Response} from "express";
import {container} from "tsyringe";
import {CreateUserUseCase} from "@modules/accounts/useCases/createUser/CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {driver_licence, email, name, password} = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      driver_licence,
      email,
      name,
      password,
    });

    return response.status(201).send();
  }
}
