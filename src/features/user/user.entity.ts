import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Country } from '../country/country.entity';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.NUMBER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.DATE })
  birthDay: Date;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  passwordHash: string;

  @Column({ type: DataType.STRING })
  passwordSalt: string;

  @ForeignKey(() => Country)
  countryId: number;

  @BelongsTo(() => Country, 'countryId')
  country: Country;
}
