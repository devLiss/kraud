import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';
import { CityService } from './city.service';
import { BearerAuthGuard } from '../../common/guards/bearerAuth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('City')
@UseGuards(BearerAuthGuard)
@Controller('city')
export class CityController {
  constructor(private service: CityService) {}

  @ApiOperation({ summary: 'Returns all cities with pagination' })
  @ApiBearerAuth('Bearer')
  @Get()
  getAll(@Query() pagination: PaginationDto) {
    return this.service.getAll(pagination);
  }
}
