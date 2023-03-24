import { Injectable } from '@nestjs/common';
import { CityRepository } from './city.repository';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class CityService {
  constructor(private repo: CityRepository) {}

  async getAll(pagination: PaginationDto) {
    const { count, rows } = await this.repo.getAll(pagination);
    return {
      pagesCount: Math.ceil(+count / pagination.pageSize),
      page: pagination.pageNum,
      pageSize: pagination.pageSize,
      total: count,
      items: rows,
    };
  }
}
