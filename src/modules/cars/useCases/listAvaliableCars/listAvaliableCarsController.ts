import {IListAvaliableCarsDTO} from "@modules/cars/repositories/ICarsRepository";
import {Request, Response} from "express";
import {container} from "tsyringe";
import {ListAvaliableCarsUseCase} from "./listAvaliableCarsUseCase";

export class ListAvaliableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {brand, category_id, name} = request.query as IListAvaliableCarsDTO;

    const listAvaliableCarsUseCase = container.resolve(
      ListAvaliableCarsUseCase
    );

    const cars = await listAvaliableCarsUseCase.execute({
      brand,
      category_id,
      name,
    });

    return response.json(cars);
  }
}
