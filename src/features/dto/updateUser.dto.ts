import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './createUser.dto';
import { CheckCityValidator } from '../../common/validators/checkCity.validator';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'email',
  'password',
]) {
  @ApiProperty({ minLength: 8, maxLength: 15, required: false })
  @Length(8, 15)
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({ required: false })
  @IsString()
  @Validate(CheckCityValidator)
  @IsOptional()
  city: string;

  @ApiProperty({ required: true })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  birthDay: Date;
}
