import { Injectable } from '@nestjs/common';

@Injectable()
export class AllInOneService {
  getHello(): string {
    return 'Hello World!';
  }
}
