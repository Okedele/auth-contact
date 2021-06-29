import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ username });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async registerUser(createUserDTO: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserDTO.password, salt);
    const user = this.userRepository.create({
      name: createUserDTO.name,
      username: createUserDTO.username,
      email: createUserDTO.email,
      password: password,
    });
    const isMatch = await bcrypt.compare(createUserDTO.password, password);
    console.log(isMatch);
    return this.userRepository.save(user);
  }
}
