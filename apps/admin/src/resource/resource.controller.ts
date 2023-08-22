import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { ResourceService } from './resource.service';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get('/:database/:name')
  getList(
    @Param('database') database: string,
    @Param('name') name: string,
    @Query() query,
  ) {
    return this.resourceService.getList(database, name, query);
  }

  @Delete('/:database/:name/:id')
  remove(
    @Param('database') database: string,
    @Param('name') name: string,
    @Param('id') id: string,
  ) {
    console.log(database, name, id);
  }
}
