import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './createUser.dto';
import { CheckCityValidator } from '../../common/validators/checkCity.validator';

export class UpdateUserDto extends OmitType(CreateUserDto, ['password']) {
  @IsOptional()
  @Length(8, 15)
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  @Validate(CheckCityValidator)
  city: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  birthDay: Date;
}
