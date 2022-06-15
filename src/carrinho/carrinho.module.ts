import { CarrinhoController } from './carrinho.controller';
import { CarrinhoService } from './carrinho.service';

import { Module } from '@nestjs/common';

@Module({
    controllers: [CarrinhoController],
    providers: [CarrinhoService],
    exports:[CarrinhoService]

})
export class CarrinhoModule { }
