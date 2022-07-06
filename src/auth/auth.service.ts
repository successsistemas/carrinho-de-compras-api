/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CriptoService } from 'src/cripto/cripto.service';
import { DatabaseService } from 'src/database/api-database.service copy';
import { CadastroDto, CadastroGoogleDto, DadosRestantesGoogleDto, LoginDto, LoginGoogleDto } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private DatabaseService: DatabaseService,
    private readonly cripto: CriptoService,
    private jwtService: JwtService
  ) { }

  async login(body: LoginDto): Promise<any> {
    const senha = body.senha
    console.log("Usuário logado com sucesso!")
    return senha
  }

  async validateuser(body: LoginDto) {
    const chave = 'criptografia';
    const cifra = await this.login(body)
    const encode = await this.cripto.publicEncript(cifra, chave)
    const db = this.DatabaseService.getConnection();
    const [rows] = await db.raw(`select email, senha from usuario where email ='${body.email}' and senha = '${encode}'`);
    if (rows.length > 0) {
        return {access_token: this.jwtService.sign({})
        }    

    }
    throw new UnauthorizedException("Senha incorreta!");
  }
  
  async loginGoogle(body: LoginGoogleDto) {
    const db = this.DatabaseService.getConnection();
    console.log('Usuário logado com sucesso!')
    const [rows] = await db.raw(`SELECT senha FROM usuario WHERE senha = '${body.body.response.profileObj.googleId}' `)
    if (rows.length > 0) {
      return {access_token: this.jwtService.sign({})
    }    

    }
    throw new UnauthorizedException("Não foi possível fazer o login");
  } 
  
  async cadastrar(body: CadastroDto) {
    const db = this.DatabaseService.getConnection();
    const cifra = body.data.senha;
    const chave = 'criptografia';
    const encode = await this.cripto.publicEncript(cifra, chave)
    console.log('Usuário adicionado com sucesso!')
    return await db.schema.raw(`INSERT INTO usuario (nome, email, senha, cpf, estado, cidade, rua, bairro, cep, numero_endereco) VALUES ('${body.data.nome}', '${body.data.email}', '${encode}', '${body.data.cpf}', '${body.data.estado}', '${body.data.cidade}', '${body.data.rua}', '${body.data.bairro}', '${body.data.cep}', '${body.data.numero}')`)
  }

  async cadastroGoogle(body: CadastroGoogleDto) {
    const db = this.DatabaseService.getConnection();
    console.log('Usuário adicionado com sucesso!')
    const [rows] = await db.raw(`INSERT INTO usuario (nome, email, senha) VALUES ('${body.response.profileObj.name}', '${body.response.profileObj.email}', '${body.response.profileObj.googleId}')`)
    if (rows.affectedRows > 0) {
      return {access_token: this.jwtService.sign({})
    }
  }
    else
    throw new UnauthorizedException("Não foi possível fazer o cadastro");
        
  }
    

  async cadastroDadosRestantesGoogle(data: DadosRestantesGoogleDto) {
    const db = this.DatabaseService.getConnection();
    console.log('Usuário atualizado com sucesso!')
    return await db.schema.raw(`UPDATE usuario SET cpf = '${data.data.cpf}', estado = '${data.data.estado}', cidade = '${data.data.cidade}', rua = '${data.data.rua}', bairro = '${data.data.bairro}', cep = '${data.data.cep}', numero_endereco = '${data.data.numero}' WHERE senha = '${data.data.GoogleId}' `)
  }
  async nomeUser(data: any) {
    const db = this.DatabaseService.getConnection();
    console.log('Nome encontrado com sucesso!')
    return await db.schema.raw(`SELECT nome from usuario where email = '${data.data.email}' `)
  }
}