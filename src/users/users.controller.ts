import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('create-user')
  @UseInterceptors(FileInterceptor('file'))
  createUser(
    @Body() newUser: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<User> {
    return this.userService.createUser(newUser, file);
  }
  @Get()
  getUser(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
