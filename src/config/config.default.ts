import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';
import { UserEntity } from '../entity/user.entity';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1659001994042_4023',
  koa: {
    port: 7001,
    globalPrefix: '/api',
  },
  registerKey: 'test-key',

  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: join(__dirname, '../../app.sqlite'),
        synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true
        logging: false,
        entities: [UserEntity],
      },
    },
  },

  jwt: {
    secret: 'default-qdd-auth-token',
    expiresIn: '2d',
  },
} as MidwayConfig;
