import { HttpStatus, HttpException, Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { databaseMap } from './entities';

const ADMIN = databaseMap['allInOne']['admin'];
@Injectable()
export class ResourceService {
  constructor(
    @Inject('MYSQL_ALL_IN_ONE') private allInOne: DataSource,
    @Inject('MYSQL_WORD_CHIPS') private wordChips: DataSource,
  ) {}

  async findAdminByUserName(username) {
    return this.allInOne.getRepository(ADMIN).findOneBy({ username });
  }

  async findAdminById(id) {
    return this.allInOne.getRepository(ADMIN).findOneBy({ id });
  }

  async updateAdmin(id, { password }) {
    const admin = await this.findAdminById(id);
    const toSave = await this.allInOne.getRepository(ADMIN).create({
      ...admin,
      password,
    });
    return this.allInOne.getRepository(ADMIN).save(toSave);
  }

  async removeAdmin(id: number) {
    return this.allInOne.getRepository(ADMIN).delete(id);
  }

  async createAdmin({ username, password }) {
    const admin = new ADMIN();
    admin.username = username;
    admin.password = password;
    return this.allInOne.getRepository(ADMIN).save(admin);
  }

  async isCanInitAdmin(): Promise<boolean> {
    const total = await this.allInOne.getRepository(ADMIN).count();
    return total === 0;
  }

  async initAdmin(initPasswd: string) {
    if (await this.isCanInitAdmin()) {
      const admin = new ADMIN();
      admin.username = 'admin';
      admin.password = initPasswd;
      return this.allInOne.getRepository(ADMIN).save(admin);
    }
    throw new HttpException(
      '初始化失败，已经有管理员账号',
      HttpStatus.BAD_REQUEST,
    );
  }

  async getList(database: string, name: string, query: any) {
    const MAP = databaseMap[database];
    if (!MAP) {
      throw new HttpException('数据库不存在', HttpStatus.NOT_FOUND);
    }
    const dataSource = this[database];
    const { pageSize = 20, page = 1 } = query;
    const total = await dataSource
      .createQueryBuilder()
      .from(MAP[name], name)
      .getCount();
    const items = await dataSource
      .createQueryBuilder()
      .from(MAP[name], name)
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .execute();
    return {
      items,
      total,
    };
  }
}
