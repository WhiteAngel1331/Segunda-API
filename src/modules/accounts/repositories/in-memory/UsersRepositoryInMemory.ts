import {User} from "@modules/accounts/infra/typeorm/entities/User";
import {
  ICreateUserDTO,
  IUsersRepository,
} from "@modules/accounts/repositories/IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async create({
    driver_licence,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_licence,
      email,
      name,
      password,
    });

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}
