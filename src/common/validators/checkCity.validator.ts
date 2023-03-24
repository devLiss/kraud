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
    console.log(value);
    console.log(this.cityRepo);
    const city = await this.cityRepo.getByName(value);
    return !!city;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'There is no selected city in list';
  }
}
