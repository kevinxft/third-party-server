import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { UserWord } from './user-word.entity';

@Entity()
export class UserBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => UserWord, (userWord) => userWord.book, { cascade: true })
  words: UserWord[];

  @Column()
  tag: string;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  apiKey: string;

  @Column({ default: 3 })
  learnedLevel: number;

  @Column({ type: 'int', default: 10 })
  learnLimit: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: string;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date().toISOString();
  }
}
