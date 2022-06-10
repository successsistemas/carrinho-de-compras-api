import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import e from "express";
import { UserService } from "./user.service";
@Controller("user")
export class UserController {
	constructor(private UserService: UserService) {}

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

	@Get('cart')
	getUserCart(@Body() body: string) {

		return this.UserService.getAllCarts();

	}

	@Get('cart/:userId')
	getAllCartsByUserId(@Param('userId', ParseIntPipe) id:any) {
		return this.UserService.findById(id).catch((e:any) => {
			throw new NotFoundException(e.message);
		  });
	}

	@Post('cart/:userId/:cartId')
	addProductToCart(@Query('userId/cartId') query : any, @Body() body: any) {
		return this.UserService.postToCart(body);
	}
	
	@Post('carts/:userId/:cartId')
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

	@Delete('removerprodutos/:userId/:idProduct') 
	removerProdutodoCart(@Param() params:any) {
		return this.UserService.removeItemFromCart(params)
	}
}
