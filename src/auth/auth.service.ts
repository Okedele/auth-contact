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

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(user.password, salt);
      const isMatch = await bcrypt.compare(pass, password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return null;
  }

  async login(user: User): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
