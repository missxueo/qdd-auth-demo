import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Provide()
export class UserModel {
  @InjectEntityModel(UserEntity)
  private readonly userRepo: Repository<UserEntity>;

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<UserEntity> {
    return await this.userRepo.findOne({
      where: {
        username: username,
        password: password,
      },
    });
  }

  async getUserByUserName(username: string): Promise<UserEntity> {
    return await this.userRepo.findOne({
      where: {
        username: username,
      },
    });
  }

  async addUser(user: Omit<UserEntity, 'id'>): Promise<number> {
    const result = await this.userRepo.insert(user);
    return result.generatedMaps[0].id;
  }

  // not implement
}
