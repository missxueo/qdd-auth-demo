import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { failed } from '../util';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context) {
    // 所有的未分类错误会到这里
    ctx.logger.error(err);
    return failed("服务内部错误", 500);
  }
}
