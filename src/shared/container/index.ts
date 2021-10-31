import {container} from "tsyringe";

import {UsersRepository} from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import {IUsersRepository} from "@modules/accounts/repositories/IUsersRepository";
import {ICategoriesRepository} from "@modules/cars/repositories/ICategoriesRepository";
import {CategoriesRepository} from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import {SpecificationsRepository} from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import {ISpecificationsRepository} from "@modules/cars/repositories/ISpecificationsRepository";
import {ICarsRepository} from "@modules/cars/repositories/ICarsRepository";
import {CarsRepository} from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import {ICarsImageRepository} from "@modules/cars/repositories/ICarsImageRepository";
import {CarsImageRepository} from "@modules/cars/infra/typeorm/repositories/CarsImageRepository";
import {IRentalsRepository} from "@modules/rentals/repositories/IRentalsRepository";
import {RentalsRepository} from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import {IDateProvider} from "./providers/DateProvider/IDateProvider";
import {DayJsDateProvider} from "./providers/DateProvider/implementations/DayJsDateProvider";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImageRepository>(
  "CarsImageRepository",
  CarsImageRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
);