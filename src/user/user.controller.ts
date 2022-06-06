import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";

@Controller("user")
export class UserController {

	merchant = {
		"id": 3,
		"userId": 2,
		"date": "2020-03-01T00:00:02.000Z",
		"products": [
			{
				"url": "https://t2.rg.ltmcdn.com/pt/posts/3/8/0/francesinha_a_moda_do_porto_2083_600.jpg",
				"title": "Francesinha",
				"productId": 1,
				"quantity": 2
			},
			{
				"url": "https://t2.rg.ltmcdn.com/pt/posts/3/8/0/francesinha_a_moda_do_porto_2083_600.jpg",
				"title": "Francesinha",
				"productId": 1,
				"quantity": 2
			},
			{
				"url": "https://t2.rg.ltmcdn.com/pt/posts/3/8/0/francesinha_a_moda_do_porto_2083_600.jpg",
				"title": "Francesinha",
				"productId": 1,
				"quantity": 2
			},
			{
				"url": "https://t2.rg.ltmcdn.com/pt/posts/3/8/0/francesinha_a_moda_do_porto_2083_600.jpg",
				"title": "Macarrão",
				"productId": 1,
				"quantity": 5
			},
		],
		"__v": 0
	}

	cart =       {
		userId:3,
		date:2019-12-10,
		products:[
			{
				"url": "https://t2.rg.ltmcdn.com/pt/posts/3/8/0/francesinha_a_moda_do_porto_2083_600.jpg",
				"title": "Novo Produto",
				"productId": 3,
				"quantity": 5
			},
		]
	}

	@Get('cart/:userId')
	getUserCart(@Param('userId') userId: string) {

		return this.merchant;
	}
	@Post('cart/:userId/:cartId')
	postToCard(@Query('userId/cartId')cardId: any, userId:string) {
		console.log(cardId)
		return this.cart
	}



}
