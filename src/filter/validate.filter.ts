import { Catch } from "@midwayjs/decorator";
import { Context } from "@midwayjs/koa";
import { MidwayValidationError } from "@midwayjs/validate";
import { failed } from "../util";

@Catch(MidwayValidationError)
export class ValidateFilter {
  async catch(err: MidwayValidationError, ctx: Context) {
    ctx.body = failed(err.message);
  }
}