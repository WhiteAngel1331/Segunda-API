import {Category} from "@modules/cars/infra/typeorm/entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find((category) => category.name === name);
  }
  async list(): Promise<Category[]> {
    return this.categories;
  }
  async create({name, description}: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    category.name = name;
    category.description = description;
    this.categories.push(category);
  }
}
