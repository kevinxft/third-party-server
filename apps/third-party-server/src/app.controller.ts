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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { TranslateBodyDto } from '../../common/dto/translateBody.dto';
import { Observable, firstValueFrom } from 'rxjs';
import { throttle } from 'lodash';
import { EventsGateway } from './events.gateway';

@Controller()
export class AppController {
  constructor(
    @Inject('ALL_IN_ONE') private allInOneService: ClientProxy,
    private readonly eventsGateway: EventsGateway,
  ) {}

  @Get('test')
  test() {
    return this.allInOneService.send<string>('isWord', 'fisher');
  }

  @Post('translate')
  translate(@Body() body: TranslateBodyDto): Observable<string> {
    return this.allInOneService.send<string>('translate', body);
  }

  @Get('dict/search')
  async search(@Query() query: any) {
    const data = await this.allInOneService.send<string>('search', query);
    return data;
  }

  @Get('dict/list')
  async getDictionaryList() {
    return await this.allInOneService.send<string>('list', '');
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
    @Body('socketId') socketId: string,
  ) {
    const name = file.originalname.replace('.json', '');
    const str = file.buffer.toString();
    const words = await firstValueFrom(
      this.allInOneService.send<any>('toArray', str),
    );
    // TODO: 这里需要优化
    const bookId = words[0]?.bookId || name;
    const dict = await firstValueFrom(
      this.allInOneService.send<string>('addDict', {
        name,
        bookId,
        count: words.length,
      }),
    );

    console.log(socketId);

    const broadcast = (msg: string) => {
      this.eventsGateway.emitMsg(msg);
    };
    const emitMsg = throttle(broadcast, 1000);

    let count = 0;
    const total = words.length;
    for (const word of words) {
      await firstValueFrom(
        this.allInOneService.send<string>('addOneWord', {
          word,
          dict,
        }),
      );
      emitMsg(`${((count++ / total) * 100).toFixed(2)}%`);
    }
  }
}
