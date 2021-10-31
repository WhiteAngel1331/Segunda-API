import {Car} from "../infra/typeorm/entities/Car";
import {Specification} from "../infra/typeorm/entities/Specification";

export interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: Specification[];
  id?: string;
}

export interface IListAvaliableCarsDTO {
  category_id?: string;
  name?: string;
  brand?: string;
}

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  listAvaliable(data: IListAvaliableCarsDTO): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}
