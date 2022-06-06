import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";

@Controller("user")
export class UserController {

	//variavel simulando o banco, ela vai ficar aqui até a aplicação ser encerrada, fora isso os valores vão continuar
	cart = {
		userId: 3,
		date: 2019 - 12 - 10,
		products: [{}]
	}


	//rota que retorna o carrinho

	@Get('cart/:userId')
	getUserCart(@Param('userId') userId: string) {

		return this.cart;
	}
	@Post('cart/:userId/:cartId')
	adicionarProdutoAoCarrinho(@Query('userId/cartId') cardId: string, userId: string, @Body() body: any) {

		//primeiro item ta vazio por causa do {}
	

		//produto recebido pelo body
		const produto:any = {
			url: body.produtoimage,
			title: body.productname,
			productId: 1,
			quantity: 5
		}

		//adicionando produto no carrinho - equivalente ao insert into 
		this.cart.products.push(produto)

		return produto
	}



}
