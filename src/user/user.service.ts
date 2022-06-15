import { Body, Injectable } from "@nestjs/common";
import { json } from "express";
import { appendFileSync, readFileSync, writeFileSync } from "fs";
import path from "path";

@Injectable()
export class UserService {

	cart = {
		userId: 3,
		date: "2019 - 12 - 10",
		products: [{}]
	}


	getAllCarts() {
		const absolutepath = path.resolve('./src/user/carrinho.json')
		const bufferJson: Buffer = readFileSync(absolutepath);
		const products = JSON.parse(bufferJson.toString());
		return products;
	}

	async findById(id: number) {
		const absolutepath = path.resolve('./src/user/carrinho.json')
		const bufferJson: Buffer = readFileSync(absolutepath);
		const carts: [] = JSON.parse(bufferJson.toString());
		const todos = carts.find((json: any) => json?.userid === id);


		if (!todos) {
			throw Error(`Produto com o ID '${id}' não encontrado.`);
		}

		return todos;
	}

	async postToCart(body: any) {
		
		const produto: any = {
			url: body.produtoimage,
			title: body.productname,
			productId: body.productId,
			price: body.productprice
		}
		
		let carrinho = []
		

		const absolutepath = path.resolve('./src/user/carrinho.json')
		const carrinhObj: Buffer = readFileSync(absolutepath);
		carrinho = JSON.parse(carrinhObj.toString())

		carrinho.products.push(produto);


		writeFileSync(absolutepath, JSON.stringify(carrinho, null, 5), 'utf8');
		return carrinho;
	}

	async removeItemFromCart(params: any) {
		let novalIstaProdutos: any = []
		let carrinho = []
		const absolutepath = path.resolve('./src/user/carrinho.json');
		const carrinhObj: Buffer = readFileSync(absolutepath);
		carrinho = JSON.parse(carrinhObj.toString());
		carrinho.products = carrinho.products.filter(function (produto: any) {
			return produto.productId !== Number.parseInt(params.idProduct);
		})

		writeFileSync(absolutepath, JSON.stringify(carrinho, null, 5), 'utf8');

		return carrinho;

	}
}
