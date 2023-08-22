import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Dictionary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  count: number;

  @Column({ nullable: true })
  bookId: string;

  @Column({ nullable: true })
  tag: string;

  @Index({ unique: true })
  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
