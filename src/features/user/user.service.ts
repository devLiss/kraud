import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PaginationDto } from '../dto/pagination.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { CityRepository } from '../city/city.repository';

@Injectable()
export class UserService {
  constructor(
    private cityRepo: CityRepository,
    private userRepo: UserRepository,
  ) {}

  async getAll(pagination: PaginationDto) {
    return this.userRepo.getAll(pagination);
  }

  async update(uuDto: UpdateUserDto, id: number) {
    const user = await this.userRepo.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.userRepo.update(uuDto, id);
  }
}
