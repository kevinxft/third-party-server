import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WeixinUser } from './weixinUser.entity';

@Entity()
export class UserPlatform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  platform: string;

  @ManyToOne(() => WeixinUser, (weixinUser) => weixinUser.unionid)
  union: WeixinUser;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLoginedAt: Date;
}
