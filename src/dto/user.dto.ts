import { Rule, RuleType } from '@midwayjs/validate';

export class UserLoginDto {
  @Rule(RuleType.string().required().error(new Error('用户名不能为空')))
  username: string;

  @Rule(RuleType.string().required().error(new Error('用户密码不能为空')))
  password: string;
}
