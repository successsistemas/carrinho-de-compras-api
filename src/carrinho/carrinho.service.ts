
import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Product } from 'src/types/types';

@Injectable()
export class CarrinhoService { 

    async addProductIntoCart(product: Product) {

		
		let carrinho = []
		
		const absolutepath = path.resolve('./src/user/carrinho.json')
		const carrinhObj: Buffer = readFileSync(absolutepath);
		carrinho = JSON.parse(carrinhObj.toString())

		carrinho.products.push(product);


		writeFileSync(absolutepath, JSON.stringify(carrinho, null, 5), 'utf8');
		return carrinho;
	}

}
