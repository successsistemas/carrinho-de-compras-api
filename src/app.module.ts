import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import configuracao from './config/configuracao';
import { CriptoController } from './cripto/cripto.controller';
import { CriptoModule } from './cripto/cripto.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, CriptoModule, DatabaseModule, ConfigModule.forRoot({
    load: [configuracao],
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [ ConfigService],
})
export class AppModule {}
