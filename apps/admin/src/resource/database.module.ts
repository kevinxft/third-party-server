import { Module } from '@nestjs/common';
import { getConfig } from 'apps/utils';
import { DataSource } from 'typeorm';
import {
  Lesson,
  Word,
  User,
  UserBook,
  UserWord,
  WordBook,
  Dictionary,
} from './entities';

const { MYSQL_CONFIG } = getConfig();

const MYSQL_SOURCE = new DataSource({
  ...MYSQL_CONFIG,
  synchronize: false,
  entities: [Lesson, Word, User, UserBook, UserWord, WordBook, Dictionary],
});

export const DatabaseProviders = [
  {
    provide: 'MYSQL',
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
