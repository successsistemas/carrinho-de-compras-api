import { Injectable, Query } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/api-database.service copy';
import { CadastroDto, UsersDto } from 'src/users/Users';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private DatabaseService: DatabaseService
  ) {}

  async validateUser(email: any, senha: any): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.senha === senha) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, senha: user.senha };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async cadastrar(body: CadastroDto) {
    const db = this.DatabaseService.getConnection();
    console.log('Usuário adicionado com sucesso!')
    return await db.schema.raw(`INSERT INTO cadastro (nome, email, senha, cpf, estado, cidade, rua, bairro, cep, numero_endereco) VALUES ('${body.data.nome}', '${body.data.email}', '${body.data.senha}', '${body.data.cpf}', '${body.data.estado}', '${body.data.cidade}', '${body.data.rua}', '${body.data.bairro}', '${body.data.cep}', '${body.data.numero}')`)

  }
}
