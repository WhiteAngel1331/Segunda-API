import {hash} from "bcrypt";
import {inject, injectable} from "tsyringe";
import {AppError} from "@shared/errors/AppError";
import {
  ICreateUserDTO,
  IUsersRepository,
} from "@modules/accounts/repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    driver_licence,
    email,
    name,
    password,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 10);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    await this.usersRepository.create({
      driver_licence,
      email,
      name,
      password: passwordHash,
      avatar,
      id,
    });
  }
}
