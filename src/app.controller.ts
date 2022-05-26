/* eslint-disable prettier/prettier */
import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { CadastroDto, CadastroGoogleDto, DadosRestantesGoogleDto } from './users/Users';
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @UseGuards()
  @Post('auth/login')
  async login(@Request() body: any ) {
  return this.authService.validateUser(body);
  
  }
  @Post('auth/loginGoogle')
  async loginGoogle(@Request() body: any ) {
    return this.authService.LoginGoogle(body);
  }
 
  @UseGuards(JwtAuthGuard)
  @Post('auth/user')
  getProfile(@Request() req) {
    return req.user;
  }
  @Post('auth/cadastro')
  adicionar(@Body() body: CadastroDto) {
  return this.authService.cadastrar(body);
  }
  @Post('auth/cadastro-google')
  cadastroGoogle(@Body() body: CadastroGoogleDto) {
    return this.authService.CadastroGoogle(body);
     
  }
  @Post('auth/cadastro-dadosrestantes-google')
  cadastroDadosRestantesGoogle(@Body() data: DadosRestantesGoogleDto) {
   return this.authService.CadastroDadosRestantesGoogle(data);
    
  }
  
  @Post('auth/DadosUser')
  NomeUser(@Body() data: any) {
   return this.authService.NomeUser(data);
    
  }
}