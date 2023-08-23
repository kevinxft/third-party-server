import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/initAdmin')
  initAdmin() {
    return this.authService.initAdmin();
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body) {
    console.log(body);
    return this.authService.signIn(body);
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  create(@Body() body) {
    return this.authService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findById(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.authService.update(+id, body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
