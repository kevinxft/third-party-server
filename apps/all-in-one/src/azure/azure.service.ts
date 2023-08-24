import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { getConfig } from '@utils';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { DictionaryService } from '../dictionary/dictionary.service';
import { initMessages, toJson } from './utils';
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
    private readonly dictionaryService: DictionaryService,
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
        dictId: 'azure',
        synos: JSON.stringify(
          res[0]?.translations.map((item) => {
            const pos = item.posTag.toLowerCase();
            return {
              pos: pos === 'noun' ? 'n' : pos,
              tran: item.displayTarget,
            };
          }),
        ),
      };
      await this.dictionaryService.saveWordFromAPI(payload);
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

  async makeSentence(words: string[]) {
    console.log(words);
    const startTime = Date.now();
    const openai = new OpenAIClient(
      AZURE.oaiEndpoint,
      new AzureKeyCredential(AZURE.oaiApiKey),
    );

    const res = await openai.getChatCompletions(
      AZURE.oaiDeploymentId,
      initMessages(words),
    );
    console.log('makeSentence: ', res);
    const sec = (Date.now() - startTime) / 1000;
    console.log(`本次耗时${sec}秒`);
    return toJson(res.choices[0].message.content);
  }
}
