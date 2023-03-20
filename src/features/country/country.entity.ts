import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../user/user.entity';

@Table({ tableName: 'country' })
export class Country extends Model<Country> {
  @Column({
    type: DataType.NUMBER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @HasMany(() => User, 'countryId')
  users: User[];
}
