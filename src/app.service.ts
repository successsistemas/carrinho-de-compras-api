<<<<<<< HEAD
=======
/* eslint-disable prettier/prettier */
>>>>>>> 005ad23ebff3e2adf41e19d6c8719f11a11ee7ac
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
