import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  UseGuards,
  Body,
  Patch,
  Post,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { AuthGuard } from '../auth/auth.guard';
import { ResourceGuard } from './resource.guard';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @UseGuards(AuthGuard, ResourceGuard)
  @Get('/:database/:table')
  getList(
    @Param('database') database: string,
    @Param('table') table: string,
    @Query() query,
  ) {
    return this.resourceService.getList(database, table, query);
  }

  @UseGuards(AuthGuard, ResourceGuard)
  @Get('/:database/:table/:id')
  getOne(
    @Param('database') database: string,
    @Param('table') table: string,
    @Param('id') id: string,
  ) {
    return this.resourceService.getOne(database, table, +id);
  }

  @UseGuards(AuthGuard, ResourceGuard)
  @Delete('/:database/:table/:id')
  remove(
    @Param('database') database: string,
    @Param('table') table: string,
    @Param('id') id: string,
  ) {
    return this.resourceService.remove(database, table, +id);
  }

  @UseGuards(AuthGuard, ResourceGuard)
  @Patch('/:database/:table/:id')
  update(
    @Body() body,
    @Param('database') database: string,
    @Param('table') table: string,
    @Param('id') id: string,
  ) {
    return this.resourceService.update(database, table, +id, body);
  }

  @UseGuards(AuthGuard, ResourceGuard)
  @Post('/:database/:table')
  create(
    @Body() body,
    @Param('database') database: string,
    @Param('table') table: string,
  ) {
    return this.resourceService.create(database, table, body);
  }
}
