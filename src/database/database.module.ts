import { Global, Module } from '@nestjs/common';

const API_KEY = '12356';
const API_KEY_PROD = 'PROD12356';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'CONNECT',
      useFactory: async () => {
        return null;
      },
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
