import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import { Op } from 'sequelize';
import { UserType } from '../../common/types/user.type';
import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private userRepo: typeof User) {}

  async getByEmail(email: string) {
    return User.findOne({
      where: {
        email: email,
      },
    });
  }

  async create(user: UserType) {
    const createdUser = await User.create(user);
    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    };
  }

  async update(uuDto: UpdateUserDto, id: number) {
    return this.userRepo.update(uuDto, { where: { id: id } });
  }

  async getAll(pagination: PaginationDto) {
    const offset = (pagination.pageNum - 1) * pagination.pageSize;
    return User.findAndCountAll({
      limit: pagination.pageSize,
      offset: offset,
      attributes: ['id', 'name', 'birthDay', 'email', 'city'],
    });
  }

  async getUserById(id: number) {
    return User.findByPk(id);
  }
}
