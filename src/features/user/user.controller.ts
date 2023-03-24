import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
import { User } from '../../common/decorators/user.decorator';

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
  @HttpCode(204)
  @Put()
  update(@Body() uuDto: UpdateUserDto, @User() user) {
    return this.service.update(uuDto, user.id);
  }
}
