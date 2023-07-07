import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { getConfig } from '@utils';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

const { TRANSLATION } = getConfig();
const azure = TRANSLATION.services.azure;
const translationUrl = azure.translationUrl;
const dictionaryUrl = azure.dictionaryUrl;
const [secrect, secrectValue] = azure.headerKey.split(':');
const [region, regionValue] = azure.headerRegion.split(':');
const azureHeaders = {
  [secrect]: secrectValue,
  [region]: regionValue,
  'Content-Type': 'application/json',
};

@Injectable()
export class TranslationService {
  constructor(private readonly httpService: HttpService) {}

  async translate(text): Promise<any> {
    const data = await this.fetch(translationUrl, [{ text }], azureHeaders);
    return data;
  }

  async dictionarize(text: string): Promise<any> {
    const data = await this.fetch(dictionaryUrl, [{ text }], azureHeaders);
    return data;
  }

  async fetch(url, payload, headers): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.post(url, payload, { headers }).pipe(
        catchError((err: AxiosError) => {
          console.log('fech error');
          throw err;
        }),
      ),
    );
    return data;
  }
}
