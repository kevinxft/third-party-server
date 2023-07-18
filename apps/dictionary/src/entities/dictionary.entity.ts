import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Word } from './word.entity';

@Entity()
export class Dictionary {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Word, (word) => word.dictionary)
  words: Word[];

  @Column({ nullable: true })
  count: number;

  @Column({ nullable: true })
  bookId: string;

  @Column({ nullable: true })
  tag: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
