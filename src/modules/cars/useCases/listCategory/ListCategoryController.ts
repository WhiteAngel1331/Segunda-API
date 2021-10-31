import {Request, Response} from "express";
import {container} from "tsyringe";
import {ListCategoryUseCase} from "@modules/cars/useCases/listCategory/ListCategoryUseCase";

class ListCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoryUseCase);
    const all = await listCategoriesUseCase.execute();
    return response.json(all);
  }
}

export {ListCategoryController};
