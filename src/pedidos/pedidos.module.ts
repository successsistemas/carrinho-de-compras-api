import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/api-database.service copy';
import { PedidosController } from './pedidos.controller';
import { PedidoService } from './pedidos.service';

@Module({
    imports: [PedidosModule],
    controllers: [PedidosController],
    providers: [PedidoService, DatabaseService],
    exports: [PedidosModule]
})
export class PedidosModule { }