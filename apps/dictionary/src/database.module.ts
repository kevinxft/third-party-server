import { Module } from '@nestjs/common';
import { getConfig } from 'apps/utils';
import { Dictionary, Word } from './entities';
import { DataSource } from 'typeorm';

const MYSQL = getConfig().DICTIONARY.MYSQL;

const MYSQL_SOURCE = new DataSource({
  ...MYSQL,
  entities: [Dictionary, Word],
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
