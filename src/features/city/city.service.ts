import { Injectable } from '@nestjs/common';
import { CityRepository } from './city.repository';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class CityService {
  constructor(private repo: CityRepository) {}

  getAll(pagination: PaginationDto) {
    return this.repo.getAll(pagination);
  }
}
