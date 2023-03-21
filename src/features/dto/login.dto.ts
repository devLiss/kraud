import { CreateUserDto } from './createUser.dto';
import { OmitType } from '@nestjs/swagger';

export class LoginDto extends OmitType(CreateUserDto, ['name']) {}
