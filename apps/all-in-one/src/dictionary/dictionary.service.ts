import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Dictionary, Word } from './entities';
import { getValuesFormJson, formatResponse } from './entities/word.entity';

@Injectable()
export class DictionaryService {
  constructor(@Inject('MYSQL_SOURCE') private dataSource: DataSource) {}
  async getDictList() {
    const dicts = await this.dataSource.getRepository(Dictionary).find({});
    return {
      data: dicts,
      count: dicts.length,
    };
  }

  async isWord(name: string): Promise<boolean> {
    const res = await this.dataSource
      .getRepository(Word)
      .createQueryBuilder()
      .where('name = :name', { name: name.toLowerCase() })
      .getCount();
    return res > 0;
  }

  async search(name: string, dictId?: string): Promise<any> {
    const where: { name: string; dictId?: string } = {
      name: name.trim().toLowerCase(),
    };
    if (dictId) {
      where.dictId = dictId;
    }
    const arr = await this.dataSource.getRepository(Word).find({
      where,
    });
    return {
      count: arr.length,
      data: formatResponse(arr),
    };
  }

  async addDictionary({ name, dictId, count }) {
    const dictionary = await this.dataSource.manager.findOneBy(Dictionary, {
      name,
    });
    if (dictionary) {
      return dictionary;
    }
    const newDictionary = Object.assign(new Dictionary(), {
      name,
      count,
      dictId,
    });
    return await this.dataSource.manager.save(newDictionary);
  }

  async refreshCount(dictId) {
    const count = await this.dataSource
      .getRepository(Word)
      .createQueryBuilder()
      .where('dictId = :dictId', { dictId })
      .getCount();
    return this.updateDictionary({ dictId, count });
  }

  async updateDictionary({
    name,
    dictId,
    count,
  }: {
    name?: string;
    dictId: string;
    count?: number;
  }) {
    const dictionaryDatasource = this.dataSource.getRepository(Dictionary);
    if (name) {
      const isHad = await dictionaryDatasource.findOneBy({ name });
      if (isHad) {
        return {
          message: '词典名称已经存在',
          code: HttpStatus.CONFLICT,
        };
      }
    }

    const dictionary = await dictionaryDatasource.findOneBy({ dictId });
    if (!dictionary) {
      return {
        message: '词典ID不存在',
        code: HttpStatus.NOT_FOUND,
      };
    }

    if (name) {
      dictionary.name = name;
    }
    if (Number.isInteger(count) && count >= 0) {
      dictionary.count = count;
    }
    return await dictionaryDatasource.save(dictionary);
  }

  findDictionary(dictId: string) {
    return this.dataSource.getRepository(Dictionary).findOneBy({ dictId });
  }

  async addOneWordToDict({ word, dictId }: { word: any[]; dictId: string }) {
    const newWord = Object.assign(new Word(), getValuesFormJson(word));
    newWord.dictId = dictId;
    try {
      await this.dataSource.manager.save(newWord);
      return `${newWord.name} 录入成功!`;
    } catch (error) {
      return `单词 ${newWord.name} 已经存在!`;
    }
  }

  async addWordToDict(words: any[], dictId: string) {
    for (const word of words) {
      const newWord = Object.assign(new Word(), getValuesFormJson(word));
      newWord.dictId = dictId;
      try {
        await this.dataSource.manager.save(newWord);
      } catch (error) {
        console.log(`${newWord.name}...`);
      }
    }
    return {
      message: '完成录入',
    };
  }

  async isHasDict(name: string): Promise<boolean> {
    const dict = await this.dataSource.manager.findOneBy(Dictionary, {
      name,
    });
    return !!dict;
  }

  async saveWordFromAPI(word) {
    return await this.dataSource
      .getRepository(Word)
      .createQueryBuilder()
      .insert()
      .values([word])
      .execute();
  }

  async getRandomWords(limit: number) {
    const words = await this.dataSource
      .getRepository(Word)
      .createQueryBuilder('word')
      .select(['word.name'])
      .distinctOn(['word.name'])
      .orderBy('RAND()')
      .limit(limit)
      .getMany();
    return words;
  }
}
