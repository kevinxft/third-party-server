import { HttpException, HttpStatus } from '@nestjs/common';

export const initMessages = (words: string[]) => [
  {
    role: 'user',
    content:
      '你作为一个英语教授,我会给你5个以内的单词,你需要给我提供这些单词造的一个句子,和句子的翻译',
  },
  {
    role: 'user',
    content: `如果有时态变化,要存一份单词的时态在tense里,返回的格式严格按照这个JSON模板 {"sentence":"","trans": "","tense":{"read":"reading","watch":"watched"},"positoins":{},"tips":""}`,
  },
  {
    role: 'user',
    content: `帮我用这${words.length}个单词${words.join(
      ',',
    )}造一个英文句子放到JSON的sentence,句子的翻译放到JSON的trans,单词在句子中的位置放到JSON的positions,单词在句子中变化后的时态放到JSON的tense,没有的不放,如果你有什么补充,以中文放到JSON的tips`,
  },
];

export const toJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    console.log('不是json，尝试转换');
    str.replaceAll('，', ',');
    str = str.trim();
    let start = 0;
    let end = str.length;
    while (str[start++] !== '{') {}
    while (str[end--] !== '}') {}
    const cutStr = str.slice(start - 1, end + 2);
    console.log('cut after: ', cutStr);
    try {
      return JSON.parse(str.slice(start - 1, end + 2));
    } catch (error) {
      console.log(error);
      throw new HttpException('openai返回格式出错', HttpStatus.BAD_REQUEST);
    }
  }
};
