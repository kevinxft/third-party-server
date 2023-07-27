import { Module } from '@nestjs/common';
import { getConfig } from 'apps/utils';
import { Dictionary, Word } from './dictionary/entities';
import { DataSource } from 'typeorm';

const { MYSQL_CONFIG } = getConfig();

const MYSQL_SOURCE = new DataSource({
  ...MYSQL_CONFIG,
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
