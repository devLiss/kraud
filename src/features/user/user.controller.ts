import {
  Body,
  Controller,
  Get,
  HttpCode,
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
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';
import { AllUsersView } from '../viewModels/allUsers.view';

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
    type: AllUsersView,
    description: 'Success',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Get()
  getAll(@Query('pagination') pagination: PaginationDto) {
    return this.service.getAll(pagination);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 204,
    description: 'No content',
  })
  @ApiResponse({
    status: 400,
    description: 'If the inputModel has incorrect values',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth('JWT')
  @HttpCode(204)
  @Put()
  update(@Body() uuDto: UpdateUserDto, @User() user) {
    return this.service.update(uuDto, user.id);
  }
}
