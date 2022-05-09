/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseService } from 'src/database/api-database.service copy';
import { DatabaseModule } from 'src/database/database.module';
import { CriptoModule } from 'src/cripto/cripto.module';
import { CriptoService } from 'src/cripto/cripto.service';

@Module({
  imports: [
    CriptoModule,
    UsersModule,
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, DatabaseService, CriptoService],
  exports: [AuthService],
})
export class AuthModule {}