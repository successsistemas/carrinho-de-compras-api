/* eslint-disable prettier/prettier */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/Users';
import { DatabaseService } from 'src/database/api-database.service copy';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, private DatabaseService: DatabaseService) {
    super();
  }
  }
