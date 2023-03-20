import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';

export class UserRepository {
  constructor(@InjectModel(User) private userRepo: typeof User) {}

  async create() {}
  async update() {}
  async getAll() {}
}
