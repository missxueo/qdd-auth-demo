import { MidwayConfig } from '@midwayjs/core';
// import { join } from 'path';

export default {
  koa: {
    port: null,
    globalPrefix: '/api',
  },

  typeorm: {
    dataSource: {
      default: {
        synchronize: true,
        // database: join(__dirname, '../../test.sqlite'),
      },
    },
  },
} as MidwayConfig;
