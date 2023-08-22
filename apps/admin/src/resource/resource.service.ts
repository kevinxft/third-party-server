import { HttpStatus, HttpException, Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { databaseMap } from './entities';

@Injectable()
export class ResourceService {
  constructor(
    @Inject('MYSQL_ALL_IN_ONE') private allInOne: DataSource,
    @Inject('MYSQL_WORD_CHIPS') private wordChips: DataSource,
  ) {}

  async getList(database: string, name: string, query: any) {
    const MAP = databaseMap[database];
    if (!MAP) {
      throw new HttpException('数据库不存在', HttpStatus.NOT_FOUND);
    }
    const dataSource = this[database];
    const { limit = 20, page = 1 } = query;
    const total = await dataSource
      .createQueryBuilder()
      .from(MAP[name], name)
      .getCount();
    const data = await dataSource
      .createQueryBuilder()
      .from(MAP[name], name)
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();
    return {
      data,
      total,
    };
  }
}
