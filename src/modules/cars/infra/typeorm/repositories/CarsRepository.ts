import {
  ICarsRepository,
  ICreateCarDTO,
  IListAvaliableCarsDTO,
} from "@modules/cars/repositories/ICarsRepository";
import {getRepository, Repository} from "typeorm";
import {Car} from "../entities/Car";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
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

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: {license_plate},
    });

    return car;
  }

  async listAvaliable({
    brand,
    category_id,
    name,
  }: IListAvaliableCarsDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("car")
      .where("car.avaliable = true");

    if (brand) {
      carsQuery.andWhere("car.brand = :brand", {brand});
    }

    if (category_id) {
      carsQuery.andWhere("car.category_id = :category_id", {
        category_id,
      });
    }

    if (name) {
      carsQuery.andWhere("car.name = :name", {name});
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  findById(id: string): Promise<Car> {
    const car = this.repository.findOne(id);
    return car;
  }
}
