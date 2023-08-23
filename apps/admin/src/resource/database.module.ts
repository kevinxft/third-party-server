import { Module } from '@nestjs/common';
import { getConfig } from 'apps/utils';
import { DataSource } from 'typeorm';
import {
  WeixinUser,
  Lesson,
  Word,
  Dictionary,
  Admin,
} from './entities/allInOne';
import { User, UserBook, UserWord } from './entities/wordChips';

const { MYSQL_ALL_IN_ONE_CONFIG, MYSQL_WORD_CHIPS_CONFIG } = getConfig();

const MYSQL_ALL_IN_ONE = new DataSource({
  ...MYSQL_ALL_IN_ONE_CONFIG,
  synchronize: true,
  entities: [Admin, Lesson, Word, WeixinUser, Dictionary],
});

const MYSQL_WORD_CHIPS = new DataSource({
  ...MYSQL_WORD_CHIPS_CONFIG,
  synchronize: false,
  entities: [User, UserBook, UserWord],
});

export const DatabaseProviders = [
  {
    provide: 'MYSQL_ALL_IN_ONE',
    useFactory: async () => {
      return MYSQL_ALL_IN_ONE.initialize();
    },
  },
  {
    provide: 'MYSQL_WORD_CHIPS',
    useFactory: async () => {
      return MYSQL_WORD_CHIPS.initialize();
    },
  },
];

@Module({
  providers: [...DatabaseProviders],
  exports: [...DatabaseProviders],
})
export class DatabaseModule {}
