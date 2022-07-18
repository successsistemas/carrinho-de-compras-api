/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { CadastroDto, CadastroGoogleDto, DadosRestantesGoogleDto, LoginDto } from './types/types';
@Controller()
export class AppController {
  constructor(private authService: AuthService) { }
  @UseGuards()
  @Post('auth/login')
  async login(@Body() body: LoginDto) {
    return this.authService.validateuser(body);

  }
  @Post('auth/loginGoogle')
  async loginGoogle(@Request() body: any) {
    return this.authService.loginGoogle(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/user')
  getProfile(@Request() req: any) {
    return req.user;
  }
  @Post('auth/cadastro')
  adicionar(@Body() body: CadastroDto) {
    return this.authService.cadastrar(body);
  }
  @Post('auth/cadastro-google')
  cadastroGoogle(@Body() body: CadastroGoogleDto) {
    return this.authService.cadastroGoogle(body);

  }
  @Post('auth/cadastro-dadosrestantes-google')
  cadastroDadosRestantesGoogle(@Body() data: DadosRestantesGoogleDto) {
    return this.authService.cadastroDadosRestantesGoogle(data);

  }

  @Post('auth/DadosUser')
  NomeUser(@Body() data: any) {
    return this.authService.nomeUser(data);

  }
}