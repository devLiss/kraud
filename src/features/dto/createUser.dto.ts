import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ minLength: 3, maxLength: 10, required: true })
  @IsNotEmpty()
  @IsString()
  @Length(3, 10)
  name: string;

  @ApiProperty({ required: true, pattern: '^[w-.]+@([w-]+.)+[w-]{2,4}$' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 8, maxLength: 15, required: true })
  @Length(8, 15)
  @IsString()
  password: string;
}
