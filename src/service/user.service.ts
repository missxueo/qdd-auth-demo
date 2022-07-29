import { Config, Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserModel } from '../model/user.model';
import { hashWithHmacSha1 } from '../util/hash';

@Provide()
export class UserService {
  @Inject()
  private readonly userModel: UserModel;

  @Config('registerKey')
  private readonly appRegisterKey: string;

  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  async getUserAndPassword(
    username: string,
    rawPassword: string
  ): Promise<UserEntity> {
    const hashPwd = this.buildHashPwd(username, rawPassword);
    const user = await this.userModel.getUserByUsernameAndPassword(
      username,
      hashPwd
    );
    return user;
  }

  async registerUser(username: string, rawPassword: string) {
    const exist = await this.userModel.getUserByUserName(username);
    if(exist){
      throw new Error("user_exist");
    }
    await this.userModel.addUser({
      username,
      password: this.buildHashPwd(username, rawPassword),
    });
  }

  private buildHashPwd(username: string, rawPassword: string): string {
    const pwd = username + '|' + rawPassword + '|' + username;
    return hashWithHmacSha1(pwd, this.appRegisterKey);
  }
}
