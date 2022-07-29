
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuracao from 'src/config/configuracao';
import { CriptoModule } from 'src/cripto/cripto.module';
import { AuthModule } from 'src/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PedidosModule } from './pedidos/pedidos.module';
import { CarrinhoModule } from './carrinho/carrinho.module';
import { EmpresasModule } from './empresas/empresas.module';
import { UserModule } from './user/user.module';
import { ProdutosModule } from './produtos/produtos.module';
import { PedidosController } from './pedidos/pedidos.controller';
import { EmpresasController } from './empresas/empresas.controller';
import { AppController } from './app.controller';
import { CarrinhoController } from './carrinho/carrinho.controller';
import { PedidoService } from './pedidos/pedidos.service';
import { EmpresasService } from './empresas/empresas.service';
import { DatabaseService } from './database/api-database.service copy';


@Module({
  controllers: [
    PedidosController,
    EmpresasController, AppController, CarrinhoController],
  providers: [
    PedidoService,
    EmpresasService, ConfigService, DatabaseService],

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
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'automatico@success.inf.br',
              pass: 'gersuc1987', // generated ethereal password
            },
            ignoreTLS: true,
          },
          preview: true,
        }
      },
    }),
    ProdutosModule, CriptoModule, UserModule, DatabaseModule, ConfigModule.forRoot({
      load: [configuracao],
      isGlobal: true
    })]
    
})

export class AppModule { }