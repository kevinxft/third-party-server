import { Controller, Get } from '@nestjs/common';
import { AllInOneService } from './all-in-one.service';

@Controller()
export class AllInOneController {
  constructor(private readonly allInOneService: AllInOneService) {}

  @Get()
  getHello(): string {
    return this.allInOneService.getHello();
  }
}
