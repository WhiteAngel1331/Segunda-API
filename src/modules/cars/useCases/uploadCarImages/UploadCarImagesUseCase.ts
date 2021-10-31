import { CarsImageRepository } from "@modules/cars/infra/typeorm/repositories/CarsImageRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_names: string[];
}

@injectable()
export class UploadCarImageUseCase {
  
  constructor(
    @inject("CarsImageRepository")
    private carsImageRepository: CarsImageRepository
  ){}

  
  async execute({car_id, images_names}: IRequest){
    images_names.forEach(async (image_name) => {
      await this.carsImageRepository.create(
        car_id,
        image_name
      )
    })
  }
}