import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  UseGuards,
  Patch,
  Req,
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
  @Delete('/:database/:name/:id')
  remove(
    @Param('database') database: string,
    @Param('table') table: string,
    @Param('id') id: string,
  ) {
    return this.resourceService.remove(database, table, +id);
  }

  @UseGuards(AuthGuard, ResourceGuard)
  @Patch('/:database/:name/:id')
  update(
    @Req() body,
    @Param('database') database: string,
    @Param('table') table: string,
    @Param('id') id: string,
  ) {
    return this.resourceService.update(database, table, +id, body);
  }

  @UseGuards(AuthGuard, ResourceGuard)
  @Patch('/:database/:name/')
  create(
    @Req() body,
    @Param('database') database: string,
    @Param('table') table: string,
  ) {
    return this.resourceService.create(database, table, body);
  }
}
