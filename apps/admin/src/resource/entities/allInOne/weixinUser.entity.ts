import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WeixinUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({ unique: true })
  unionid: string;

  @Column({ nullable: true })
  openid: string;

  @Column({ nullable: true })
  nickName: string;

  @Column({ type: 'text', nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  gender: number;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  province: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  language: string;
}
