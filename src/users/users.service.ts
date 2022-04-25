/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersDto } from './Users';



@Injectable()
export class UsersService {
  
  private readonly usersDto = [
    {
      userId: 1,
      email: 'marcelo',
      senha: '123',
    },
    {
      userId: 2,
      email: 'maria',
      senha: 'guess',
    },
  ];

  async findOne(email: string): Promise<UsersDto | undefined> {
    return this.usersDto.find((usersDto) => usersDto.email === email);
  }
}