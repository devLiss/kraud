import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CityRepository } from '../../features/city/city.repository';

@ValidatorConstraint({ name: 'country', async: true })
@Injectable()
export class CheckCityValidator implements ValidatorConstraintInterface {
  constructor(private cityRepo: CityRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const city = await this.cityRepo.getByName(value);
    return !!city;
  }
}
