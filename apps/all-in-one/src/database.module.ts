import { Module } from '@nestjs/common';
import { getConfig } from 'apps/utils';
import { Dictionary, Word } from './dictionary/entities';
import { WeixinUser, UserPlatform } from './weixin/entities';
import { DataSource } from 'typeorm';

const { MYSQL_ALL_IN_ONE_CONFIG } = getConfig();

const MYSQL_SOURCE = new DataSource({
  ...MYSQL_ALL_IN_ONE_CONFIG,
  entities: [Dictionary, Word, WeixinUser, UserPlatform],
});

export const DatabaseProviders = [
  {
    provide: 'MYSQL_SOURCE',
    useFactory: async () => {
      return MYSQL_SOURCE.initialize();
    },
  },
];

@Module({
  providers: [...DatabaseProviders],
  exports: [...DatabaseProviders],
})
export class DatabaseModule {}
