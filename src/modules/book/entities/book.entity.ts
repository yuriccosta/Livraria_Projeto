import { Status } from 'src/common/enum/status.enum';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'book', orderBy: { id: 'ASC' } })
export class Book {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'user_id', nullable: false })
  userId: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'nameDB',
    nullable: true,
    select: false,
  })
  nameDB: string;

  @Column({ type: 'varchar', length: 255, name: 'name', nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, name: 'author', nullable: false })
  author: string;

  @Column({ type: 'double', name: 'price', nullable: false })
  price: number;

  @Column({ type: 'int', name: 'amount', nullable: false })
  amount: number;

  @Column({ type: 'varchar', length: 255, name: 'status', nullable: true })
  status: Status;

  @Column({ type: 'int', name: 'pages', nullable: false })
  pages: number;

  @Column({ type: 'varchar', length: 255, name: 'category', nullable: false })
  category: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'publishingCompany',
    nullable: false,
  })
  publishingCompany: string;

  @Column({ type: 'datetime', name: 'publication', nullable: false })
  publication: Date;

  @Column({ type: 'text', name: 'description', nullable: false })
  description: string;

  @Column({ type: 'text', name: 'url', nullable: false })
  url: string;

  @ManyToOne(() => User, (user) => user.books, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
