import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CarrinhoController } from './carrinho/carrinho.controller';
import { CarrinhoModule } from './carrinho/carrinho.module';
import configuracao from './config/configuracao';
import { CriptoModule } from './cripto/cripto.module';
import { DatabaseService } from './database/api-database.service copy';
import { DatabaseModule } from './database/database.module';
import { EmpresasController } from './empresas/empresas.controller';
import { EmpresasModule } from './empresas/empresas.module';
import { EmpresasService } from './empresas/empresas.service';
import { PedidosController } from './pedidos/pedidos.controller';
import { PedidosModule } from './pedidos/pedidos.module';
import { PedidoService } from './pedidos/pedidos.service';
import { ProdutosModule } from './produtos/produtos.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PedidosModule,
    CarrinhoModule,
    EmpresasModule,


    AuthModule,
    MailerModule.forRootAsync({
      useFactory: async () => {
        return {
          transport: {
            host: 'mail.success.inf.br',
            service: "Gmail",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'marceloaugusto10123@gmail.com',
              pass: 'yhqchwujozzejjuo', // generated ethereal password
            },
            ignoreTLS: true,
            tls: {
              // do not fail on invalid certs
              rejectUnauthorized: false
            },
          },
          preview: true,
        }
      },
    }),
    ProdutosModule, CriptoModule, DatabaseModule, UserModule, ConfigModule.forRoot({
      load: [configuracao],
      isGlobal: true
    })],

  controllers: [
    PedidosController,
    EmpresasController, AppController, CarrinhoController],
  providers: [
    PedidoService,
    EmpresasService, ConfigService, DatabaseService],
})
export class AppModule { }