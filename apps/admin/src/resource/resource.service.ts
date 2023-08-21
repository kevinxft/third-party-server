import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MAP } from './entities';

@Injectable()
export class ResourceService {
  constructor(@Inject('MYSQL') private dataSource: DataSource) {}

  async getList(name: string, query: any) {
    const { limit = 20, page = 1 } = query;
    const total = await this.dataSource
      .createQueryBuilder()
      .from(MAP[name], name)
      .getCount();
    const data = await this.dataSource
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
