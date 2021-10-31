import {Car} from "@modules/cars/infra/typeorm/entities/Car";
import {ICarsRepository} from "@modules/cars/repositories/ICarsRepository";
import {AppError} from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carRepository: ICarsRepository
  ) {}

  async execute({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: IRequest): Promise<Car> {
    const carsAlreadyExists = await this.carRepository.findByLicensePlate(
      license_plate
    );

    if (carsAlreadyExists) {
      throw new AppError("Car already exists");
    }

    const car = await this.carRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    return car;
  }
}
