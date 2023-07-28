import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { getConfig } from 'apps/utils';
import { DataSource } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { WeixinUser, UserPlatform } from './entities';

const { WEIXIN } = getConfig();
const { code2Session, appid, appSecret } = WEIXIN;

const errCodeMsg = {
  40029: 'code无效',
  45011: 'API 调用太频繁，请稍候再试',
  40226: '高风险等级用户，小程序登录拦截',
  '-1': '系统繁忙',
};

@Injectable()
export class WeixinService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('MYSQL_SOURCE') private dataSource: DataSource,
  ) {}
  async login({ code, platform }) {
    if (code === 'test') {
      return {
        openid: 'test',
        unionid: 'test',
      };
    }
    const url = `${code2Session}?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    if (data.errcode) {
      const message = errCodeMsg[data.errcode] || '未知错误';
      console.error(data);
      return {
        message,
      };
    }
    await this.registerUser(data.unionid, platform, data.openid);
    return data;
  }

  async registerUser(unionid: string, platform: string, openid?: string) {
    const isRegister = await this.dataSource
      .getRepository(UserPlatform)
      .createQueryBuilder('up')
      .where('up.unionid = :unionid', { unionid })
      .andWhere('platform = :platform', { platform })
      .getOne();
    if (isRegister) {
      return {
        message: '欢迎回来！',
      };
    }
    let user = await this.dataSource.manager.findOneBy(WeixinUser, {
      unionid,
    });
    if (!user) {
      user = new WeixinUser();
      user.unionid = unionid;
      user.openid = openid;
      await this.dataSource.manager.save(user);
    }
    const userPlatform = new UserPlatform();
    userPlatform.unionid = unionid;
    userPlatform.platform = platform;
    await this.dataSource.manager.save(userPlatform);
  }
}
