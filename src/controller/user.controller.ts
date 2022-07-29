import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { UserLoginDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';
import { JwtService } from '@midwayjs/jwt';
import { failed, succeed } from '../util';
import { Validate } from '@midwayjs/validate';

@Controller('/user')
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly jwtService: JwtService;

  @Post('/login')
  @Validate()
  async login(@Body() dto: UserLoginDto) {
    const userInfo = await this.userService.getUserAndPassword(
      dto.username,
      dto.password
    );
    if (!userInfo) {
      return failed('账号或密码不正确');
    }
    const token = await this.jwtService.sign({
      userName: userInfo.username,
      // more info
    });
    return succeed({ token: token }, '登录成功');
  }
}
