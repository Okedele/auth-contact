import { IAuthenticatedReq } from './../interfaces/authenticated.interface';
import { IResponse } from './../interfaces/response.interface';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  async registerUser(@Body() createUserDTO: CreateUserDto): Promise<any> {
    const user = await this.usersService.registerUser(createUserDTO);
    const { password, ...result } = user;
    return {
      status: 'success',
      message: 'User registered successfully',
      data: result,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Request() req: IAuthenticatedReq,
  ): Promise<IResponse> {
    const user = req.user;
    const token = await this.authService.login(user);
    return {
      status: 'success',
      message: 'User logged in successfully',
      data: { user, token },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Request() req: IAuthenticatedReq): Promise<IResponse> {
    return {
        status: 'success',
        message: 'User logged out successfully'
      };
  }
}
