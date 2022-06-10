import { Body, Controller, Post } from '@nestjs/common';
import { Product } from 'src/types/types';
import { CarrinhoService } from './carrinho.service';

@Controller("carrinho")
export class CarrinhoController {
    constructor(private carrinhoService:CarrinhoService){}
    @Post(':carrinhoId/:userId')
   async addProductIntoCart(@Body() product: Product){
        try {
			await this.carrinhoService.addProductIntoCart(product);
			return { msg: "sucesso" }
		} catch (e: any) {
			return { msg: "error:"+e.message }
		}
    }
}
