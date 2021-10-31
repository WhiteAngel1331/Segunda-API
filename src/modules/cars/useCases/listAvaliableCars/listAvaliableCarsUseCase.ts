import {Car} from "@modules/cars/infra/typeorm/entities/Car";
import {
  ICarsRepository,
  IListAvaliableCarsDTO,
} from "@modules/cars/repositories/ICarsRepository";
import {inject, injectable} from "tsyringe";

@injectable()
export class ListAvaliableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    brand,
    category_id,
    name,
  }: IListAvaliableCarsDTO): Promise<Car[]> {
    return await this.carsRepository.listAvaliable({brand, category_id, name});
  }
}
