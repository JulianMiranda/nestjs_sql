import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    const userCreate = { ...user };

    const newUser = this.userRepository.create(userCreate);
    return this.userRepository.save(newUser);
  }
  getUsers() {
    return this.userRepository.find();
  }
}
