import { IUser } from './../interfaces/user.interface';
import { User } from './../users/users.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<IUser> {
    const user = await this.usersService.findOne(username);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(user.password, salt);
    const isMatch = await bcrypt.compare(pass, password);
    if (!isMatch)
      throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);

    const { password: _password, ...result } = user;
    return result;
  }

  async login(user: User): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
