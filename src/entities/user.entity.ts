import { hash } from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  password: string;

  @Column({ nullable: true, type: String })
  hashedRefreshToken: string | null;

  @BeforeInsert()
  async hashPassword() {
    if (!this.password) return;
    this.password = await hash(this.password, 10);
  }
}
