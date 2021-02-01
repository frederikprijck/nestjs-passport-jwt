import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'nestjs-passport-jwt';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('Admin'))
  getData() {
    return this.appService.getData();
  }
}
