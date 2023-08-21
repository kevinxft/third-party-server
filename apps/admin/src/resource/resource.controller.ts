import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { ResourceService } from './resource.service';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get('/:name')
  getList(@Param('name') name: string, @Query() query) {
    return this.resourceService.getList(name, query);
  }

  @Delete('/:name/:id')
  remove(@Param('name') name: string, @Param('id') id: string) {
    console.log(name, id);
  }
}
