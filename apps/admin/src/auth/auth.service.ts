import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ResourceService } from '../resource/resource.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private resourceService: ResourceService,
    private jwtservice: JwtService,
  ) {}

  async initAdmin() {
    return this.resourceService.initAdmin(jwtConstants.initPasswd);
  }

  async create(body) {
    return this.resourceService.createAdmin(body);
  }

  async update(id, body) {
    return this.resourceService.updateAdmin(id, body);
  }

  async remove(id: number) {
    return this.resourceService.removeAdmin(id);
  }

  async findById(id: number) {
    return this.resourceService.findAdminById(id);
  }

  private async compare(rawStr: string, hashedStr: string) {
    return bcrypt.compare(rawStr, hashedStr);
  }

  async signIn(body) {
    console.log(body);
    const { username, password } = body;
    const admin = await this.resourceService.findAdminByUserName(username);
    console.log(admin);
    if (!admin) {
      throw new HttpException('用户不能存在', HttpStatus.NOT_FOUND);
    }
    const isMatch = await this.compare(password, admin.password);
    if (!isMatch) {
      throw new UnauthorizedException('密码错误');
    }
    const payload = {
      id: admin.id,
      username: admin.username,
    };
    const token = await this.jwtservice.signAsync(payload);
    return {
      token,
    };
  }
}
