import {CarsRepositoryInMemory} from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import {ListAvaliableCarsUseCase} from "./listAvaliableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvaliableCarsUseCase: ListAvaliableCarsUseCase;

describe("List Avaliable Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvaliableCarsUseCase = new ListAvaliableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to show avaliable cars", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Fiat",
      category_id: "123",
      daily_rate: 100,
      description: "Carro novo",
      fine_amount: 10,
      license_plate: "ABC-1234",
      name: "Uno",
    });

    const cars = await listAvaliableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to show avaliable cars with name", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Fiat",
      category_id: "123",
      daily_rate: 100,
      description: "Carro novo",
      fine_amount: 10,
      license_plate: "ABC-1234",
      name: "Uno",
    });

    const cars = await listAvaliableCarsUseCase.execute({
      name: "Uno",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to show avaliable cars with category", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Fiat",
      category_id: "123",
      daily_rate: 100,
      description: "Carro novo",
      fine_amount: 10,
      license_plate: "ABC-1234",
      name: "Uno",
    });

    const cars = await listAvaliableCarsUseCase.execute({
      category_id: "123",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to show avaliable cars with brand", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Fiat",
      category_id: "123",
      daily_rate: 100,
      description: "Carro novo",
      fine_amount: 10,
      license_plate: "ABC-1234",
      name: "Uno",
    });

    const cars = await listAvaliableCarsUseCase.execute({
      brand: "Fiat",
    });

    expect(cars).toEqual([car]);
  });
});
