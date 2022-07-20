/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { error } from 'console';
import { resolve } from 'path';
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
  @Post('verificarconta')
  verificarconta(@Body() body:any) {
    return this.authService.verificarConta(body);
  } 


  @Post('redefinirsenha')
  async RedefinirSenha(@Body() data: any, url: any, empresa: any, fornecedor: any) {
    const db = this.DatabaseService.getConnection();
    const [rows] = await db.raw(`select id FROM usuario WHERE email = '${data.emailrecuperacao}'`);
    const mailer = require("nodemailer");

    const smtpTransport = mailer.createTransport({
      host: 'mail.success.inf.br',
      port: 587,
      secure: false, //SSL/TLS
      auth: {
        user: "automatico@success.inf.br",
        pass: "gersuc1987"
      }
    })
    const emailTask = await this.mailer.sendMail({
			to: data.emailrecuperacao,
			from: 'automatico@success.inf.br',
			subject: 'Código de acesso do Portal Cotações Success',
			html: createhtml(url, empresa, fornecedor),
			text: `
      Para acessar o Portal Cotações, digite o código abaixo no campo onde foi solicitado:
      teste2
      Por questões de segurança esse código expira após 10 minutos.`,
		})
    if (rows?.[0]?.id === undefined) {
      return "Email não encontrado no sistema!"

    }
    else
      smtpTransport.sendMail(emailTask, (err: any) => {
      })
    
    return "Email enviado com sucesso!"
  }
 
  @Post('alterarsenha')
  alterarSenha(@Body() body: any) {
    return this.authService.alterarSenha(body);

  }

}