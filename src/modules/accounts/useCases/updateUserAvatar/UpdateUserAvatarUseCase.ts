import {inject, injectable} from "tsyringe";
import {deleteFile} from "@utils/file";
import {User} from "@modules/accounts/infra/typeorm/entities/User";
import {IUsersRepository} from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({user_id, avatar}: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar;

    await this.userRepository.create(user);
  }
}
