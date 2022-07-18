import { Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post } from "@nestjs/common";
import { UserService } from "./user.service";
@Controller("user")
export class UserController {
	constructor(private UserService: UserService) { }

	@Get('cart/:userId')
	getUserCart(@Param('userId', ParseIntPipe) idUsuario: number) {
		return this.UserService.getAllProducts(idUsuario);
	}

	@Post('cart/:userId/:idProduct')
	async addProductToCart(@Param('idProduct', ParseIntPipe) id: any) {
		return this.UserService.postToCart(id).catch((e: any) => {
			throw new NotFoundException("Este produto já foi adicionado ao carrinho!");
		});
	}

	@Delete('removerproduto/:userId/:idProduct')
	async removerProdutodoCart(@Param() params: any) {
		try {
			await this.UserService.removeItemFromCart(params)
			return { msg: "sucesso" }
		} catch (e: any) {
			return { msg: "error:" + e.message }
		}
	}
	@Delete('clearcart/:userId')
	async clearCart(@Param() params: any) {
		try {
			await this.UserService.clearCart(params)
			return { msg: "sucesso" }
		} catch (e: any) {
			return { msg: "error:" + e.message }

		}
	}
}
