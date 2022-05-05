/* eslint-disable prettier/prettier */
import { Injectable, Query } from '@nestjs/common';
import { DatabaseService } from './database/api-database.service copy';
import { UsersDto } from './users/Users';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  Login(): string {
    return `Fez Login`;
  }
}
