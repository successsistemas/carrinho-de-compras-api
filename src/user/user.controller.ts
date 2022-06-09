import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import e from "express";
@Controller("user")
export class UserController {

	//variavel simulando o banco, ela vai ficar aqui até a aplicação ser encerrada, fora isso os valores vão continuar
	cart = {
		userId: 3,
		date: "2019 - 12 - 10",
		products: [{
			url: 'teste',
			title: 'testes',
			productId: 21,
			quantity: 3
		}]
	}

	@Get('cart/:userId')
	getUserCart(@Param('userId') userId: string) {

		return this.cart;

	}
	@Post('cart/:userId/:cartId')
	adicionarProdutoAoCarrinho(@Query('userId/cartId') cardId: string, userId: string, @Body() body: any) {

		//primeiro item ta vazio por causa do {}


		//produto recebido pelo body
		const produto: any = {
			url: body.produtoimage,
			title: body.productname,
			productId: body.productId,
			quantity: 5
		}



		this.cart.products.push(produto)
		return produto
	}

	@Delete('removerproduto/:userId/:idProduct')
	removerProdutoDoCarrinho(@Param() params: any) {


		//cria uma nova lista
		let novalIstaProdutos = []

		//adiciona todos os elementos do cart.products á ela
		novalIstaProdutos = this.cart.products.filter(function (produto) {

			//exceto quando essa condição for false, ou seja o id do parameteo é  == ao que vc quer remover
			const itematualIsIgualAoParametro = produto.productId !== Number.parseInt(params.idProduct)

			//agora vai remover
			return itematualIsIgualAoParametro
		})

		//lista criada

		//coloca essa nova lista com o id removido no lugar da products
		this.cart.products = novalIstaProdutos;




	}
}
