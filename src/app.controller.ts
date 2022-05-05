/* eslint-disable prettier/prettier */
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { CadastroDto, UsersDto } from './users/Users';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/user')
  getProfile(@Request() req) {
    return req.user;
  }
  @Post('auth/cadastro')
  adicionar(@Body() body: CadastroDto) {
      this.authService.cadastrar(body);
      return body.data
  }

}