import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
  AfterUpdate,
} from 'typeorm';
import { UserBook } from './user-book.entity';

@Entity()
@Index(['name', 'book'], { unique: true })
export class UserWord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int', default: 0 })
  level: number;

  @Column({ type: 'int', default: 0 })
  searchTimes: number;

  @ManyToOne(() => UserBook, (userBook) => userBook.words, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  book: UserBook;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: string;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date().toString();
  }

  @AfterUpdate()
  updateLevel() {
    this.level = Math.max(this.level, 0);
  }
}
