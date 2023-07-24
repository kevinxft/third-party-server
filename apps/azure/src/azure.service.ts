import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { getConfig } from '@utils';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ClientProxy } from '@nestjs/microservices';

const { AZURE } = getConfig();
const dictionaryUrl = AZURE.dictionaryUrl;
const translationUrl = AZURE.translationUrl;
const [secrect, secrectValue] = AZURE.headerKey.split(':');
const [region, regionValue] = AZURE.headerRegion.split(':');
const azureHeaders = {
  [secrect]: secrectValue,
  [region]: regionValue,
  'Content-Type': 'application/json',
};

@Injectable()
export class AzureService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('DICTIONARY') private dictionaryService: ClientProxy,
  ) {}

  async translate(text: string): Promise<any> {
    const data = await this.fetch(translationUrl, [{ text }], azureHeaders);
    return data;
  }

  async dictionarize(text: string): Promise<any> {
    const data = await this.fetch(dictionaryUrl, [{ text }], azureHeaders);
    return data;
  }

  async isWord(text: string): Promise<boolean> {
    const res = await this.fetch(dictionaryUrl, [{ text }], azureHeaders);
    const flag = res.length > 0 && res[0].translations.length > 0;
    if (flag) {
      // TODO: 优化这里
      const payload = {
        name: text,
        bookId: 'azure',
        synos: JSON.stringify(
          res[0]?.translations.map((item) => {
            return {
              pos: item.posTag.toLowerCase(),
              tran: item.displayTarget,
            };
          }),
        ),
      };
      await lastValueFrom(
        this.dictionaryService.send<string>('saveFromAPI', payload),
      );
    }
    return flag;
  }

  async fetch(url: string, payload: any, headers: any): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.post(url, payload, { headers }).pipe(
        catchError((err: AxiosError) => {
          console.log('fech error', err);
          throw err;
        }),
      ),
    );
    return data;
  }
}
