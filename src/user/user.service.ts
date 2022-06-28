import { Body, Injectable } from "@nestjs/common";
import { json } from "express";
import { appendFileSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { DatabaseService } from "src/database/api-database.service copy";

@Injectable()
export class UserService {
	constructor(private DatabaseService: DatabaseService) {}

	cart = {
		userId: 3,
		date: "2019 - 12 - 10",
		products: [{}]
	}


	async getAllCarts() {
		const db = this.DatabaseService.getConnection();
		const [rows] = await db.raw(`SELECT produto.id, nome, image, descricao, preco FROM carrinho INNER JOIN produto_carrinho ON carrinho.usuario_id = 1 INNER JOIN produto ON produto.id = produto_carrinho.id ORDER BY preco`);
		return rows;
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
		const db = this.DatabaseService.getConnection();
		console.log(params)
		const [rows] = await db.raw(`DELETE FROM produto_carrinho WHERE produto_carrinho.id = ${params.idProduct}`);
		return rows;
	}
		

}
