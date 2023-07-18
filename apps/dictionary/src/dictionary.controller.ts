import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { clearFrench } from './utils';

@Controller()
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get()
  getHello() {
    return this.dictionaryService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1000 }),
          new FileTypeValidator({ fileType: 'json' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    const str = clearFrench(file.buffer.toString());
    const arr = JSON.parse(str);
    this.dictionaryService.addDictionaryAndWords(body.name, arr);
  }
}
