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
  @IsOptional()
  @Length(8, 15)
  @IsString()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Validate(CheckCityValidator)
  city: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  birthDay: Date;
}
