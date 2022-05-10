/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CriptoService } from 'src/cripto/cripto.service';
import { DatabaseService } from 'src/database/api-database.service copy';
import { CadastroDto, CadastroGoogleDto, LoginDto } from 'src/users/Users';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private DatabaseService: DatabaseService,
    private readonly cripto: CriptoService
  ) { }

  async validateUser(body: any): Promise<any> {
    const db = this.DatabaseService.getConnection();
    const cifra = body.body.data.senha;
    const chave = 'criptografia';
    const encode = await this.cripto.publicEncript(cifra, chave)
    console.log("Usuário logado com sucesso!")
    const [rows] = await db.raw(`select email, senha from cadastro where email ='${body.body.data.email}' and senha = '${encode}'`);
    if (rows.length > 0) {
      return 'Logado com sucesso!'

    }
    throw new UnauthorizedException;
  }

  async cadastrar(body: CadastroDto) {
    const db = this.DatabaseService.getConnection();
    const cifra = body.data.senha;
    const chave = 'criptografia';
    const encode = await this.cripto.publicEncript(cifra, chave)
    console.log('Usuário adicionado com sucesso!')
    return await db.schema.raw(`INSERT INTO cadastro (nome, email, senha, cpf, estado, cidade, rua, bairro, cep, numero_endereco) VALUES ('${body.data.nome}', '${body.data.email}', '${encode}', '${body.data.cpf}', '${body.data.estado}', '${body.data.cidade}', '${body.data.rua}', '${body.data.bairro}', '${body.data.cep}', '${body.data.numero}')`)
  }
  async CadastroGoogle(body: CadastroGoogleDto) {
    const db = this.DatabaseService.getConnection();
    console.log('Usuário adicionado com sucesso!')
    return await db.schema.raw(`INSERT INTO cadastro (nome, email, senha, cpf, estado, cidade, rua, bairro, cep, numero_endereco) VALUES ('${body.response.profileObj.name}', '${body.response.profileObj.email}', '${body.response.profileObj.googleId}', '01922231113', 'Paracatu', 'Rua José Francisco ', 'testes', 'Centro', '38600188', '76')`)
  }
}
