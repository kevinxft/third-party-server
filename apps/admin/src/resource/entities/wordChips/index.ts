import { UserBook } from './user-book.entity';
import { UserWord } from './user-word.entity';
import { User } from './user.entity';

const MAP = {
  userBook: UserBook,
  userWord: UserWord,
  user: User,
};

export { User, UserBook, UserWord, MAP };
