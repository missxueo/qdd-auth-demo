import { Controller, Get } from '@midwayjs/decorator';

@Controller('/', { ignoreGlobalPrefix: true })
export class HomeController {
  @Get('/')
  async home(): Promise<string> {
    return 'Hello World!';
  }
}
