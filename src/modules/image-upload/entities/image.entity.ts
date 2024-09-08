import { Table, Column, Model, DataType, CreatedAt } from 'sequelize-typescript';

@Table
export class Image extends Model<Image> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fileName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  size: number;

  @CreatedAt
  createdAt: Date;
}
