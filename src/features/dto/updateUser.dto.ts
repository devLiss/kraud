import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @Length(3, 10)
  @IsString()
  name: string;

  @Length(8, 15)
  @IsString()
  @IsOptional()
  password: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  countryId: number;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  birthDay: Date;
}
