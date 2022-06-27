import { CarrinhoModule } from './carrinho/carrinho.module';
import { EmpresasModule } from './empresas/empresas.module';
import { EmpresasService } from './empresas/empresas.service';
import { EmpresasController } from './empresas/empresas.controller';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import configuracao from './config/configuracao';
import { CriptoController } from './cripto/cripto.controller';
import { CriptoModule } from './cripto/cripto.module';
import { DatabaseModule } from './database/database.module';
import { ProdutosModule } from './produtos/produtos.module';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';
import { CarrinhoController } from './carrinho/carrinho.controller';

@Module({
  imports: [
    CarrinhoModule,
    EmpresasModule,
   

    AuthModule, ProdutosModule, UsersModule, CriptoModule, DatabaseModule, UserModule, ConfigModule.forRoot({
      load: [configuracao],
      isGlobal: true
    })],
  controllers: [
    EmpresasController, AppController, CarrinhoController],
  providers: [
    EmpresasService, ConfigService],
})
export class AppModule { }
