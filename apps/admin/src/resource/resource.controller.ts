import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @UseGuards(AuthGuard)
  @Get('/:database/:name')
  getList(
    @Param('database') database: string,
    @Param('name') name: string,
    @Query() query,
  ) {
    return this.resourceService.getList(database, name, query);
  }

  @UseGuards(AuthGuard)
  @Delete('/:database/:name/:id')
  remove(
    @Param('database') database: string,
    @Param('name') name: string,
    @Param('id') id: string,
  ) {
    console.log(database, name, id);
  }
}
