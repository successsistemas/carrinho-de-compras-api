/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { DatabaseService } from './database/api-database.service copy';
import { createhtml } from './HtmlEmail';
import { CadastroDto, CadastroGoogleDto, DadosRestantesGoogleDto, LoginDto } from './types/types';
@Controller()
export class AppController {

  constructor(private authService: AuthService,
    private DatabaseService: DatabaseService,
    private mailer: MailerService
  ) { }


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
  @Post('auth/verificarconta')
  verificarconta(@Body() body: any) {
    return this.authService.verificarConta(body);
  }


  @Post('auth/enviaremail')
  async EnviarEmail(@Body() data: any, url:any, empresa:any, fornecedor: any) {
    return this.authService.enviarEmail(data);

  }

  @Post('alterarsenha')
  alterarSenha(@Body() body: any) {
    return this.authService.alterarSenha(body);

  }

}