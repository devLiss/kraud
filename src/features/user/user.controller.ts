import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationDto } from '../dto/pagination.dto';
import { BearerAuthGuard } from '../../common/guards/bearerAuth.guard';
import { UpdateUserDto } from '../dto/updateUser.dto';

@UseGuards(BearerAuthGuard)
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  getAll(@Query() pagination: PaginationDto) {
    return this.service.getAll(pagination);
  }

  @Put('id')
  update(@Body() uuDto: UpdateUserDto, @Param() id: number) {
    return this.service.update(uuDto, id);
  }
}
