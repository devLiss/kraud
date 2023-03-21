import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../user/user.entity';

@Table({ tableName: 'city' })
export class City extends Model<City> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, primaryKey: true })
  name: string;

  @HasMany(() => User, 'city')
  users: User[];
}
