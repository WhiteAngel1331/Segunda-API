import {AppError} from "@shared/errors/AppError";
import {CategoriesRepositoryInMemory} from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import {CreateCategoryUseCase} from "@modules/cars/useCases/createCategory/CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should create a new category", async () => {
    await createCategoryUseCase.execute({
      name: "Category 1",
      description: "Description 1",
    });

    const category = await categoriesRepositoryInMemory.findByName(
      "Category 1"
    );

    expect(category).toHaveProperty("id");
  });

  it("should not create a new category with the same name", async () => {
    await expect(async () => {
      await createCategoryUseCase.execute({
        name: "Category 1",
        description: "Description 1",
      });
      await createCategoryUseCase.execute({
        name: "Category 1",
        description: "Description 1",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
