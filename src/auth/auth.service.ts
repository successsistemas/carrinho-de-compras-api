import { Injectable, Query, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/api-database.service copy';
import { CadastroDto, LoginDto, UsersDto } from 'src/users/Users';

@Injectable()
export class AuthService {
  constructor(

    private jwtService: JwtService,
    private DatabaseService: DatabaseService
  ) {}



  async validateUser(body: LoginDto): Promise<any> {
    const db = this.DatabaseService.getConnection();
    console.log("Usuário logado com sucesso!")
    const [rows] = await db.raw(`select email, senha from cadastro where email ='${body.body.data.email}' and senha = '${body.body.data.senha}'`);
    if (rows.length > 0) {

      return rows[0];
    }
    
    throw new UnauthorizedException;
}
  
  async cadastrar(body: CadastroDto) {
    const db = this.DatabaseService.getConnection();
    console.log('Usuário adicionado com sucesso!')
    return await db.schema.raw(`INSERT INTO cadastro (nome, email, senha, cpf, estado, cidade, rua, bairro, cep, numero_endereco) VALUES ('${body.data.nome}', '${body.data.email}', '${body.data.senha}', '${body.data.cpf}', '${body.data.estado}', '${body.data.cidade}', '${body.data.rua}', '${body.data.bairro}', '${body.data.cep}', '${body.data.numero}')`)
    
  }
}
