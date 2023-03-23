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
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('User')
@UseGuards(BearerAuthGuard)
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @ApiOperation({ summary: 'Returns all users with pagination' })
  @ApiParam({
    name: 'pagination',
    type: PaginationDto,
  })
  @ApiResponse({
    status: 200,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 401,
  })
  @Get()
  getAll(@Query('pagination') pagination: PaginationDto) {
    return this.service.getAll(pagination);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth()
  @Put(':id')
  update(@Body() uuDto: UpdateUserDto, @Param() id: number) {
    return this.service.update(uuDto, id);
  }
}
