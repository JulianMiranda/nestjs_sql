import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private awsService: AwsService,
  ) {}

  async createUser(user: CreateUserDto, file: Express.Multer.File) {
    const userCreate = { ...user };
    if (file) {
      console.log('File create user', file);

      const userImage = await this.awsService.uploadFile(
        file.buffer,
        file.originalname,
      );
      console.log('UserImage', userImage);
      userCreate.image = userImage.Location;
    }
    const newUser = this.userRepository.create(userCreate);
    return this.userRepository.save(newUser);
  }
  getUsers() {
    return this.userRepository.find();
  }
}
