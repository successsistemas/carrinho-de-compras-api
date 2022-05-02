import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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
}
