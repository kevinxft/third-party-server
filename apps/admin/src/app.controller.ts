import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  Query,
  UseInterceptors,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { firstValueFrom } from 'rxjs';
import { throttle } from 'lodash';
import { EventsGateway } from './events.gateway';

@Controller()
export class AppController {
  constructor(
    @Inject('ALL_IN_ONE') private allInOneService: ClientProxy,
    private readonly eventsGateway: EventsGateway,
  ) {}

  @Get()
  hello() {
    return 'admin server is running';
  }

  @Get('dict/search')
  async search(@Query() query: any) {
    const data = await this.allInOneService.send<string>('search', query);
    return data;
  }

  @Get('dict/list')
  async getDictionaryList() {
    return await this.allInOneService.send<string>('dict-list', '');
  }

  @Post('dict/add')
  async addDictionary(@Body() body: any) {
    const { name, dictId } = body;
    return this.allInOneService.send<string>('dict-add', {
      name,
      dictId,
    });
  }

  @Put('dict/update')
  async updateDictionary(@Body() body: any) {
    const res = await firstValueFrom(
      this.allInOneService.send<any>('dict-update', body),
    );
    if (res.code) {
      throw new HttpException(res.message, res.code);
    }
    return res;
  }

  @Post('dict/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 20000 }),
          new FileTypeValidator({ fileType: 'json' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('dictId') dictId: string,
  ) {
    console.log(dictId);
    const dict = await firstValueFrom(
      this.allInOneService.send<any>('dict-findByDictId', dictId),
    );
    if (!dict) {
      throw new HttpException('词典ID不存在', HttpStatus.NOT_FOUND);
    }

    const str = file.buffer.toString();
    const words = await firstValueFrom(
      this.allInOneService.send<any>('dict-StrToArray', str),
    );
    const broadcast = (msg: string, done = false) => {
      this.eventsGateway.emitMsg({
        progress: msg,
        done,
      });
    };
    const emitMsg = throttle(broadcast, 1000);

    let count = 0;
    const total = words.length;
    for (const word of words) {
      await firstValueFrom(
        this.allInOneService.send<string>('dict-addOneWord', {
          word,
          dictId,
        }),
      );
      emitMsg(`${((count++ / total) * 100).toFixed(2)}%`);
    }
    await firstValueFrom(
      this.allInOneService.send<string>('dict-refreshCount', dictId),
    );
    emitMsg('100%', true);
  }
}
