import { Injectable, Query } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/api-database.service copy';
import { UsersDto } from 'src/users/Users';

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
  async cadastrar(body: UsersDto) {
    const db = this.DatabaseService.getConnection();
    console.log('Usuário adicionado com sucesso!')
    return await db.schema.raw(`INSERT INTO cadastro (email, senha) VALUES ('${body.email}', '${body.senha}'`)

  }
}
