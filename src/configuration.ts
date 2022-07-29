import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import * as jwt from '@midwayjs/jwt';
import * as typeorm from '@midwayjs/typeorm';
import { ValidateFilter } from './filter/validate.filter';

@Configuration({
  imports: [
    koa,
    validate,
    jwt,
    typeorm,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter, ValidateFilter]);
  }
}
