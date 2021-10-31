import {RentalRepositoryInMemory} from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import {AppError} from "@shared/errors/AppError";
import {CreateRentalUseCase} from "./CreateRentalUseCase";
import dayjs from "dayjs";
import {IDateProvider} from "@shared/container/providers/DateProvider/IDateProvider";
import {DayJsDateProvider} from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";

let rentalsRepositoryInMemory: RentalRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dateProvider: IDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(24, "hour").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider
    );
  });

  it("should create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "1",
      expected_return_date: dayAdd24Hours,
      user_id: "1",
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not create a new rental if car is not available", async () => {
    await createRentalUseCase.execute({
      car_id: "1",
      expected_return_date: dayAdd24Hours,
      user_id: "1",
    });

    await expect(
      async () =>
        await createRentalUseCase.execute({
          car_id: "1",
          expected_return_date: dayAdd24Hours,
          user_id: "1",
        })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not create a new rental if user has already rented a car", async () => {
    await createRentalUseCase.execute({
      car_id: "1",
      expected_return_date: dayAdd24Hours,
      user_id: "1",
    });

    await expect(
      async () =>
        await createRentalUseCase.execute({
          car_id: "2",
          expected_return_date: dayAdd24Hours,
          user_id: "1",
        })
    ).rejects.toBeInstanceOf(AppError);
  });
});
