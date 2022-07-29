/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CriptoService } from 'src/cripto/cripto.service';
import { DatabaseService } from 'src/database/api-database.service copy';
import { createhtml } from 'src/HtmlEmail';
import { CadastroDto, CadastroGoogleDto, DadosRestantesGoogleDto, LoginDto, LoginGoogleDto } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private DatabaseService: DatabaseService,
    private readonly cripto: CriptoService,
    private jwtService: JwtService,
    private readonly mailer: MailerService,
  ) { }

  async login(body: LoginDto): Promise<any> {
    const senha = body.senha
    return senha
    // Retorna a senha que o usuário digitou para ser usada na variável cifra que irá criptografar essa senha futuramente

  }

  async validateuser(body: LoginDto) {

    // A constante cifra irá criptografar a senha recebida por ela e a query verifica se no banco de dados existe um email igual ao email digitado pelo usuário, assim como a senha criptografada

    const chave = 'criptografia';
    const cifra = await this.login(body)
    const encode = await this.cripto.publicEncript(cifra, chave)
    const db = this.DatabaseService.getConnection();
    const [rows] = await db.raw(`select email, senha from usuario where email ='${body.email}' and senha = '${encode}'`);
    if (rows.length > 0) {

      // Se existir um campo correspondente com o email e senha digitados pelo usuario ele irá gerar um bearer token para o usuário efetuar o login 

      return {
        access_token: this.jwtService.sign({})
      }

    }
    // Se não existir ele retorna um Unauthorized e não permite o login do usuário
    throw new UnauthorizedException("Senha incorreta!");
  }

  async loginGoogle(body: LoginGoogleDto) {
    const db = this.DatabaseService.getConnection();

    // Quando o usuário faz login com o Google, ele verifica se o GoogleId existe no campo senha desse usuário no banco de dados

    const [rows] = await db.raw(`SELECT senha FROM usuario WHERE senha = '${body.body.response.profileObj.googleId}' `)
    if (rows.length > 0) {
      return {
        access_token: this.jwtService.sign({})
      }

    }
    throw new UnauthorizedException("Não foi possível fazer o login");
  }

  async cadastrar(body: CadastroDto) {
    const db = this.DatabaseService.getConnection();
    const cifra = body.data.senha;
    const chave = 'criptografia';
    const encode = await this.cripto.publicEncript(cifra, chave)
    return await db.schema.raw(`INSERT INTO usuario (nome, data_nascimento, cpfcnpj, email, inscricao_estadual, senha, telefone, estado, cidade, rua, bairro, cep, numero_endereco, conta_google) VALUES ('${body.data.nome}', '${body.data.datanasc}', '${body.data.cpfcnpj}', '${body.data.email}', '${body.data.inscricaoestadual}', '${encode}', '${body.data.telefone}', '${body.data.estado}', '${body.data.cidade}', '${body.data.rua}', '${body.data.bairro}', '${body.data.cep}', '${body.data.numero}', '0')`)
  }

  async cadastroGoogle(body: CadastroGoogleDto) {
    const db = this.DatabaseService.getConnection();
    console.log("Usuário cadastrado com sucesso!")
    const [rows] = await db.raw(`INSERT INTO usuario (nome, email, senha, conta_google) VALUES ('${body.response.profileObj.name}', '${body.response.profileObj.email}', '${body.response.profileObj.googleId}', '1')`)
    if (rows.affectedRows > 0) {
      return {
        access_token: this.jwtService.sign({})
      }
    }
    else
      throw new UnauthorizedException("Não foi possível fazer o cadastro");

  }


  async cadastroDadosRestantesGoogle(data: DadosRestantesGoogleDto) {

    // Nesse endpoint ele finaliza o cadastro de uma conta que foi cadastrada usando o Google, settando os dados restantes que serão recebidos da rota cadastro-google

    const db = this.DatabaseService.getConnection();
    return await db.schema.raw(`UPDATE usuario SET inscricao_estadual = '${data.data.inscricaoestadual}', telefone = '${data.data.telefone}', cpfcnpj = '${data.data.cpfcnpj}', data_nascimento = '${data.data.datanascimento}', cpfcnpj = '${data.data.cpfcnpj}', estado = '${data.data.estado}', cidade = '${data.data.cidade}', rua = '${data.data.rua}', bairro = '${data.data.bairro}', cep = '${data.data.cep}', numero_endereco = '${data.data.numero}' WHERE senha = '${data.data.GoogleId}' `)
  }
  async nomeUser(data: any) {

    // Recupera o nome do usuário logado passando o email que foi recebido no body para que esse nome seja salvo no LocalStorage

    const db = this.DatabaseService.getConnection();
    return await db.schema.raw(`SELECT nome from usuario where email = '${data.data.email}' `)
  }

  async verificarConta(body: any) {

    // Verifica se o email que o usuário digitou para recuperação de senha é de uma conta registrada pelo Google

    const db = this.DatabaseService.getConnection();
    const [rows] = await db.raw(`SELECT conta_google FROM usuario WHERE email = '${body.emailrecuperacao}' `)
    if (rows?.[0]?.conta_google === 1) {
      // Caso esse email seja de uma conta registrada pela api do Google ele retorna uma mensagem de erro e não permite o envio do email
      throw new UnauthorizedException("Não será possível alterar a senha desse email");
    }
    else {
      return body
    }
  }


  async enviarEmail(data: any) {

    
    const emailTask = this.mailer.sendMail({
      to: data.emailrecuperacao,
      from: 'automatico@success.inf.br',
      subject: 'Alteração de senha Carrinho de Compras Success',
      html: createhtml('', null, ''),

    }).catch((error:any) => {
      throw new UnauthorizedException("Não é possível enviar o link para um email incompleto")  
    })
    

    return emailTask
  }

  async alterarSenha(data: any) {

    // Aqui ele altera a senha do usuário no banco de dados passando a senha recebida como parâmetro para a nova senha do usuário

    const db = this.DatabaseService.getConnection();
    const chave = 'criptografia';
    const cifra = await (data.password)
    const encode = await this.cripto.publicEncript(cifra, chave)
    return await db.schema.raw(`UPDATE usuario set senha = '${encode}' where email = '${data.emailuser}' `)
  }
}