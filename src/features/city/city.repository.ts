import { City } from './city.entity';
import { InjectModel } from '@nestjs/sequelize';
import { PaginationDto } from '../dto/pagination.dto';

export class CityRepository {
  constructor(@InjectModel(City) private countryRepository: typeof City) {}

  async getByName(name: string) {
    console.log('NAME ', name);
    return City.findOne({ where: { name: name } });
  }
  async getAll(pagination: PaginationDto) {
    const offset = (pagination.pageNum - 1) * pagination.pageSize;
    return City.findAll({
      limit: pagination.pageSize,
      offset: offset,
    });
  }
}
