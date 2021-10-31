import {Car} from "@modules/cars/infra/typeorm/entities/Car";
import {
  ICarsRepository,
  ICreateCarDTO,
  IListAvaliableCarsDTO,
} from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[];

  constructor() {
    this.cars = [];
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id,
    });
    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async listAvaliable({
    brand,
    category_id,
    name,
  }: IListAvaliableCarsDTO): Promise<Car[]> {
    return this.cars.filter((car) => {
      if (car.avaliable) {
        if (brand && car.brand === brand) {
          return car;
        } else if (category_id && car.category_id === category_id) {
          return car;
        } else if (name && car.name === name) {
          return car;
        } else {
          return car;
        }
      } else {
        return false;
      }
    });
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}
