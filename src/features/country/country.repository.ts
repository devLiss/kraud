import { Country } from './country.entity';
import { InjectModel } from '@nestjs/sequelize';

export class CountryRepository {
  constructor(
    @InjectModel(Country) private countryRepository: typeof Country,
  ) {}
}
