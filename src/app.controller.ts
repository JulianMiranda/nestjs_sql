import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get()
  getHello(): string {
    const hello = this.configService.get<string>('hello');
    return 'Hello from NestJs: ' + hello;
  }
}
