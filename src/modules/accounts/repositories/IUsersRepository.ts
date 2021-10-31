import {User} from "@modules/accounts/infra/typeorm/entities/User";

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driver_licence: string;
  id?: string;
  avatar?: string;
}

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
