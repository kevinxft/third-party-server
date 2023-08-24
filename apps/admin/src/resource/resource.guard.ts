import {
  ExecutionContext,
  Injectable,
  CanActivate,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { databaseMap } from './entities';

@Injectable()
export class ResourceGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const { database, table } = req.params;
    if (!databaseMap[database]) {
      throw new HttpException('数据库不存在', HttpStatus.NOT_FOUND);
    }
    if (!databaseMap[database][table]) {
      throw new HttpException('数据表不存在', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}
