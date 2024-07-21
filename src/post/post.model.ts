import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table
export class Post extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: bigint;

  @Column
  title: string;

  @Column
  content: string;

  @Column
  updatedAt?: Date;

  @Column
  createdAt?: Date;

  @ForeignKey(() => User)
  @Column
  authorId: bigint;

  @BelongsTo(() => User)
  author: User;
}
