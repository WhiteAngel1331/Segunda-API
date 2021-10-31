import {UsersRepositoryInMemory} from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import {ICreateUserDTO} from "@modules/accounts/repositories/IUsersRepository";
import {CreateUserUseCase} from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import {AuthenticateUserUseCase} from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";
import {AppError} from "@shared/errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate a user", async () => {
    const user: ICreateUserDTO = {
      name: "Test",
      email: "user@test.com",
      password: "123456",
      driver_licence: "123456789",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", () => {
    expect(
      authenticateUserUseCase.execute({
        email: "fake@test.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate a user with invalid credentials", async () => {
    const user: ICreateUserDTO = {
      name: "Test",
      email: "user@test.com",
      password: "123456",
      driver_licence: "123456789",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong-password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
