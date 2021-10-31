import {CarsRepositoryInMemory} from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import {AppError} from "@shared/errors/AppError";
import {CreateCarUseCase} from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should create a car", async () => {
    createCarUseCase.execute({
      name: "Fusca",
      category_id: "category",
      brand: "brand",
      daily_rate: 100,
      description: "description",
      fine_amount: 10,
      license_plate: "ABC-1234",
    });
  });

  it("should not create a car with the same license plate", async () => {
    await createCarUseCase.execute({
      name: "Fusca",
      category_id: "category",
      brand: "brand",
      daily_rate: 100,
      description: "description",
      fine_amount: 10,
      license_plate: "ABC-1234",
    });

    expect(async () => {
      await createCarUseCase.execute({
        name: "Fusca",
        category_id: "category",
        brand: "brand",
        daily_rate: 100,
        description: "description",
        fine_amount: 10,
        license_plate: "ABC-1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a Car with avaliable true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Fusca",
      category_id: "category",
      brand: "brand",
      daily_rate: 100,
      description: "description",
      fine_amount: 10,
      license_plate: "ABC-1234",
    });

    expect(car.avaliable).toBe(true);
  });
});
