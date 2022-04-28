import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CriptoController } from './cripto/cripto.controller';
import { CriptoModule } from './cripto/cripto.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, CriptoModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
