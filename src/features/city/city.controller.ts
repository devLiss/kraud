import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';
import { CityService } from './city.service';
import { BearerAuthGuard } from '../../common/guards/bearerAuth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AllCitiesView } from '../viewModels/allCities.view';

@ApiTags('City')
@UseGuards(BearerAuthGuard)
@Controller('city')
export class CityController {
  constructor(private service: CityService) {}

  @ApiOperation({ summary: 'Returns all cities with pagination' })
  @ApiResponse({ type: AllCitiesView, status: 200, description: 'Success' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth('Bearer')
  @Get()
  getAll(@Query() pagination: PaginationDto) {
    return this.service.getAll(pagination);
  }
}
