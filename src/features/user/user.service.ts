import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PaginationDto } from '../dto/pagination.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { CityRepository } from '../city/city.repository';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async getAll(pagination: PaginationDto) {
    const { count, rows } = await this.userRepo.getAll(pagination);
    return {
      pagesCount: Math.ceil(+count / pagination.pageSize),
      page: pagination.pageNum,
      pageSize: pagination.pageSize,
      total: count,
      items: rows,
    };
  }

  async update(uuDto: UpdateUserDto, id: number) {
    const user = await this.userRepo.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.userRepo.update(uuDto, id);
  }
}
