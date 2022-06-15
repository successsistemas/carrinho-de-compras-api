import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import e from "express";
import { UserService } from "./user.service";
@Controller("user")
export class UserController {
	constructor(private UserService: UserService) { }

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
	getAllCartsByUserId(@Param('userId', ParseIntPipe) id: any) {
		return this.UserService.findById(id).catch((e: any) => {
			throw new NotFoundException(e.message);
		});
	}


	@Post('cart/:userId/:cartId')
	async addProductToCart(@Query('userId/cartId') query: any, @Body() body: any) {
		try {
			await this.UserService.postToCart(body);
			return { msg: "sucesso" }
		} catch (e: any) {
			return { msg: "error:" + e.message }
		}


	}

	@Delete('removerprodutos/:userId/:idProduct')
	removerProdutodoCart(@Param() params: any) {
		return this.UserService.removeItemFromCart(params)
	}
}
