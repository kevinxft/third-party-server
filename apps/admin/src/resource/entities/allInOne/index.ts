import { Word } from './word.entity';
import { WeixinUser } from './weixinUser.entity';
import { Dictionary } from './dictionary.entity';
import { Admin } from './admin.entity';

const MAP = {
  word: Word,
  weixinUser: WeixinUser,
  dictionary: Dictionary,
  admin: Admin,
};

export { Admin, Word, WeixinUser, Dictionary, MAP };
