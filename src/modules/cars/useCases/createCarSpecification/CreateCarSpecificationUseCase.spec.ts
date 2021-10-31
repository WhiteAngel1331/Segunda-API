import {CarsRepositoryInMemory} from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import {SpecificationRepositoryInMemory} from "@modules/cars/repositories/in-memory/SpecficationRepositoryInMemory";
import {AppError} from "@shared/errors/AppError";
import {CreateCarSpecificationUseCase} from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  //not create if cars not exists

  it("should not create if car not exists", async () => {
    const car_id = "123";
    const specification_id = ["54321"];

    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id,
        specification_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able create a car specification", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Fiat",
      category_id: "123",
      daily_rate: 100,
      description: "description",
      fine_amount: 10,
      license_plate: "ABC-1234",
      name: "Uno",
    });

    const specification = await specificationRepositoryInMemory.create({
      name: "Airbag",
      description: "Airbag",
    });

    const specification_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications).toHaveLength(1);
  });
});
