/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersDto } from './Users';



@Injectable()
export class UsersService {

  private readonly usersDto = [
    {
      email: 'marcelo',
      senha: '123',
    },
    {
      email: 'teste',
      senha: 'teste',
    },

  ];

  async findOne(email: string): Promise<UsersDto | undefined> {
    return this.usersDto.find((usersDto) => usersDto.email === email);
  }
}